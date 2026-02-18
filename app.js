"use strict";

const production_entries = [];
let selected_recipe_id = "";
let highlighted_dropdown_index = -1;
const zero_rate_epsilon = 1e-9;

function to_fixed_rate(value) {
  return `${(Math.round(value * 1000) / 1000).toFixed(3)}/min`;
}

function read_non_negative_number(input_id) {
  const input_value = Number(document.getElementById(input_id).value);
  return Number.isFinite(input_value) && input_value >= 0 ? input_value : NaN;
}

function get_recipe_by_id(recipe_id) {
  return window.recipe_database.find((recipe_item) => recipe_item.recipe_id === recipe_id) || null;
}

function find_recipe_by_query_text(recipe_query_text) {
  const trimmed_text = String(recipe_query_text || "").trim();
  if (!trimmed_text) {
    return null;
  }

  const exact_name_match = window.recipe_database.find((recipe_item) => recipe_item.recipe_name === trimmed_text);
  if (exact_name_match) {
    return exact_name_match;
  }

  return null;
}

function get_all_related_items(entry_list) {
  const item_set = new Set();
  window.recipe_database.forEach((recipe_item) => {
    Object.keys(recipe_item.inputs).forEach((item_name) => item_set.add(item_name));
    Object.keys(recipe_item.outputs).forEach((item_name) => item_set.add(item_name));
  });
  entry_list.forEach((entry_item) => {
    const recipe_item = get_recipe_by_id(entry_item.recipe_id);
    if (!recipe_item) {
      return;
    }
    Object.keys(recipe_item.inputs).forEach((item_name) => item_set.add(item_name));
    Object.keys(recipe_item.outputs).forEach((item_name) => item_set.add(item_name));
  });
  return Array.from(item_set);
}

function validate_recipe_outputs_unique() {
  const producer_map = {};
  for (const recipe_item of window.recipe_database) {
    for (const output_item_name of Object.keys(recipe_item.outputs)) {
      if (!producer_map[output_item_name]) {
        producer_map[output_item_name] = [];
      }
      producer_map[output_item_name].push(recipe_item.recipe_name);
    }
  }

  const conflict_items = Object.keys(producer_map).filter((item_name) => producer_map[item_name].length > 1);
  if (conflict_items.length === 0) {
    return "";
  }

  return conflict_items
    .map((item_name) => `${item_name} 由多个配方产出: ${producer_map[item_name].join("、")}`)
    .join("；");
}

function calculate_net_outputs(entry_list) {
  const apparent_output_rates = {};
  const consumed_input_rates = {};
  const consumed_details_by_item = {};
  const related_items = get_all_related_items(entry_list);

  related_items.forEach((item_name) => {
    apparent_output_rates[item_name] = 0;
    consumed_input_rates[item_name] = 0;
    consumed_details_by_item[item_name] = [];
  });

  entry_list.forEach((entry_item) => {
    const recipe_item = get_recipe_by_id(entry_item.recipe_id);
    if (!recipe_item) {
      return;
    }

    const recipe_rate_per_min = entry_item.recipe_rate_per_min;

    // 表观产出：按配方输出累计。
    Object.entries(recipe_item.outputs).forEach(([item_name, output_amount]) => {
      apparent_output_rates[item_name] = (apparent_output_rates[item_name] || 0) + output_amount * recipe_rate_per_min;
    });

    // 原料消耗：按配方输入累计。
    Object.entries(recipe_item.inputs).forEach(([item_name, input_amount]) => {
      const consumed_rate = input_amount * recipe_rate_per_min;
      consumed_input_rates[item_name] = (consumed_input_rates[item_name] || 0) + consumed_rate;
      consumed_details_by_item[item_name].push({
        recipe_id: recipe_item.recipe_id,
        recipe_name: recipe_item.recipe_name,
        consumed_rate
      });
    });
  });

  const net_output_rates = {};
  related_items.forEach((item_name) => {
    net_output_rates[item_name] = (apparent_output_rates[item_name] || 0) - (consumed_input_rates[item_name] || 0);
  });

  return {
    related_items,
    apparent_output_rates,
    consumed_input_rates,
    net_output_rates,
    consumed_details_by_item
  };
}

function normalize_search_text(raw_text) {
  return String(raw_text || "").trim().toLowerCase();
}

function matches_search_scope(recipe_item, normalized_query, match_mode) {
  const input_text = Object.keys(recipe_item.inputs).join(" ").toLowerCase();
  const output_text = Object.keys(recipe_item.outputs).join(" ").toLowerCase();

  if (match_mode === "inputs_only") {
    return input_text.includes(normalized_query);
  }
  if (match_mode === "outputs_only") {
    return output_text.includes(normalized_query);
  }
  return input_text.includes(normalized_query) || output_text.includes(normalized_query);
}

function get_filtered_recipe_list() {
  const recipe_query_element = document.getElementById("recipe_query");
  const recipe_match_mode_element = document.getElementById("recipe_match_mode");
  const normalized_query = normalize_search_text(recipe_query_element.value);
  const match_mode = recipe_match_mode_element.value;

  if (!normalized_query) {
    return window.recipe_database.slice();
  }

  return window.recipe_database.filter((recipe_item) => matches_search_scope(recipe_item, normalized_query, match_mode));
}

function render_recipe_dropdown_list() {
  const recipe_dropdown_list_element = document.getElementById("recipe_dropdown_list");
  recipe_dropdown_list_element.innerHTML = "";
  highlighted_dropdown_index = -1;
  const filtered_recipe_list = get_filtered_recipe_list();

  if (filtered_recipe_list.length === 0) {
    const empty_item = document.createElement("li");
    empty_item.className = "dropdown_item_empty";
    empty_item.textContent = "无匹配配方";
    recipe_dropdown_list_element.appendChild(empty_item);
    return;
  }

  filtered_recipe_list.forEach((recipe_item) => {
    const item_element = document.createElement("li");
    item_element.className = "dropdown_item";
    item_element.textContent = recipe_item.recipe_name;
    item_element.dataset.recipeId = recipe_item.recipe_id;
    item_element.addEventListener("click", () => {
      document.getElementById("recipe_query").value = recipe_item.recipe_name;
      selected_recipe_id = recipe_item.recipe_id;
      close_recipe_dropdown();
    });
    recipe_dropdown_list_element.appendChild(item_element);
  });
}

function open_recipe_dropdown() {
  render_recipe_dropdown_list();
  document.getElementById("recipe_dropdown_list").hidden = false;
}

function close_recipe_dropdown() {
  document.getElementById("recipe_dropdown_list").hidden = true;
  highlighted_dropdown_index = -1;
}

function toggle_recipe_dropdown() {
  const recipe_dropdown_list_element = document.getElementById("recipe_dropdown_list");
  if (recipe_dropdown_list_element.hidden) {
    open_recipe_dropdown();
    return;
  }
  close_recipe_dropdown();
}

function get_dropdown_item_elements() {
  return Array.from(document.querySelectorAll("#recipe_dropdown_list .dropdown_item"));
}

function set_highlighted_dropdown_index(next_index) {
  const dropdown_items = get_dropdown_item_elements();
  dropdown_items.forEach((item_element) => item_element.classList.remove("dropdown_item_active"));

  if (dropdown_items.length === 0) {
    highlighted_dropdown_index = -1;
    return;
  }

  const normalized_index = ((next_index % dropdown_items.length) + dropdown_items.length) % dropdown_items.length;
  highlighted_dropdown_index = normalized_index;
  dropdown_items[normalized_index].classList.add("dropdown_item_active");
}

function select_highlighted_dropdown_item() {
  const dropdown_items = get_dropdown_item_elements();
  if (dropdown_items.length === 0) {
    return;
  }

  const index_to_select = highlighted_dropdown_index >= 0 ? highlighted_dropdown_index : 0;
  const selected_item_element = dropdown_items[index_to_select];
  const recipe_id = selected_item_element.dataset.recipeId;
  const recipe_item = get_recipe_by_id(recipe_id);
  if (!recipe_item) {
    return;
  }

  document.getElementById("recipe_query").value = recipe_item.recipe_name;
  selected_recipe_id = recipe_item.recipe_id;
  close_recipe_dropdown();
}

function resolve_selected_recipe_id() {
  if (selected_recipe_id && get_recipe_by_id(selected_recipe_id)) {
    return selected_recipe_id;
  }

  const recipe_query_element = document.getElementById("recipe_query");
  const recipe_query_text = recipe_query_element.value.trim();
  const direct_match_recipe = find_recipe_by_query_text(recipe_query_text);
  if (direct_match_recipe) {
    selected_recipe_id = direct_match_recipe.recipe_id;
    return direct_match_recipe.recipe_id;
  }
  return "";
}

function create_consumed_detail_text(detail_list) {
  if (detail_list.length === 0) {
    return "未被任何已添加配方消耗。";
  }
  return detail_list
    .map((detail_item) => `${detail_item.recipe_name}: ${to_fixed_rate(detail_item.consumed_rate)}`)
    .join("；");
}

function clear_result_table() {
  document.getElementById("result_table_body").innerHTML = "";
}

function render_result_table(calculate_result) {
  const result_table_body = document.getElementById("result_table_body");
  result_table_body.innerHTML = "";

  let has_visible_row = false;

  calculate_result.related_items.forEach((item_name, row_index) => {
    const apparent_rate = calculate_result.apparent_output_rates[item_name];
    const consumed_rate = calculate_result.consumed_input_rates[item_name];
    const net_rate = calculate_result.net_output_rates[item_name];

    // 三项都为 0 时不显示该物品。
    if (
      Math.abs(apparent_rate) <= zero_rate_epsilon &&
      Math.abs(consumed_rate) <= zero_rate_epsilon &&
      Math.abs(net_rate) <= zero_rate_epsilon
    ) {
      return;
    }
    has_visible_row = true;

    const row_element = document.createElement("tr");

    const item_cell = document.createElement("td");
    item_cell.textContent = item_name;

    const output_cell = document.createElement("td");
    output_cell.textContent = to_fixed_rate(apparent_rate);

    const consumed_cell = document.createElement("td");
    consumed_cell.textContent = to_fixed_rate(consumed_rate);

    const net_cell = document.createElement("td");
    net_cell.textContent = to_fixed_rate(net_rate);
    if (net_rate < 0) {
      net_cell.className = "negative_rate";
    }

    const action_cell = document.createElement("td");
    const detail_button = document.createElement("button");
    detail_button.type = "button";
    detail_button.className = "detail_btn";
    detail_button.textContent = "查看";
    action_cell.appendChild(detail_button);

    row_element.appendChild(item_cell);
    row_element.appendChild(output_cell);
    row_element.appendChild(consumed_cell);
    row_element.appendChild(net_cell);
    row_element.appendChild(action_cell);
    result_table_body.appendChild(row_element);

    const detail_row = document.createElement("tr");
    detail_row.className = "detail_row";
    detail_row.id = `detail_row_${row_index}`;
    detail_row.style.display = "none";

    const detail_cell = document.createElement("td");
    detail_cell.colSpan = 5;
    detail_cell.textContent = create_consumed_detail_text(calculate_result.consumed_details_by_item[item_name]);
    detail_row.appendChild(detail_cell);
    result_table_body.appendChild(detail_row);

    detail_button.addEventListener("click", () => {
      const is_hidden = detail_row.style.display === "none";
      detail_row.style.display = is_hidden ? "table-row" : "none";
      detail_button.textContent = is_hidden ? "收起" : "查看";
    });
  });

  if (!has_visible_row) {
    const empty_row = document.createElement("tr");
    const empty_cell = document.createElement("td");
    empty_cell.colSpan = 5;
    empty_cell.textContent = "无非零数据可显示。";
    empty_row.appendChild(empty_cell);
    result_table_body.appendChild(empty_row);
  }
}

function render_entry_list() {
  const entry_list_element = document.getElementById("entry_list");
  entry_list_element.innerHTML = "";

  production_entries.forEach((entry_item, entry_index) => {
    const recipe_item = get_recipe_by_id(entry_item.recipe_id);
    const entry_row = document.createElement("li");
    entry_row.className = "entry_item";

    const entry_text = document.createElement("span");
    entry_text.textContent = `${recipe_item ? recipe_item.recipe_name : entry_item.recipe_id}：${to_fixed_rate(entry_item.recipe_rate_per_min)}`;

    const delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.className = "danger_btn";
    delete_button.textContent = "删除";
    delete_button.addEventListener("click", () => {
      production_entries.splice(entry_index, 1);
      render_entry_list();
    });

    entry_row.appendChild(entry_text);
    entry_row.appendChild(delete_button);
    entry_list_element.appendChild(entry_row);
  });
}

function add_entry() {
  const selected_recipe_id = resolve_selected_recipe_id();
  const recipe_rate_per_min = read_non_negative_number("recipe_rate_per_min");
  const result_summary_element = document.getElementById("result_summary");

  if (!selected_recipe_id) {
    result_summary_element.textContent = "请先从下拉菜单选择配方。";
    return;
  }

  if (Number.isNaN(recipe_rate_per_min)) {
    result_summary_element.textContent = "请输入有效的非负配方速率。";
    return;
  }

  production_entries.push({
    recipe_id: selected_recipe_id,
    recipe_rate_per_min
  });

  render_entry_list();
  result_summary_element.textContent = "已添加一条数据。";
}

function run_calculation() {
  const result_summary_element = document.getElementById("result_summary");
  clear_result_table();

  if (production_entries.length === 0) {
    result_summary_element.textContent = "请先添加至少一条配方速率数据。";
    return;
  }

  const uniqueness_conflict_message = validate_recipe_outputs_unique();
  if (uniqueness_conflict_message) {
    result_summary_element.textContent = `配方库不满足“每种物品最多一个产出配方”：${uniqueness_conflict_message}`;
    return;
  }

  const calculate_result = calculate_net_outputs(production_entries);
  result_summary_element.textContent = "计算完成。";
  render_result_table(calculate_result);
}

function initialize_page() {
  if (!Array.isArray(window.recipe_database) || window.recipe_database.length === 0) {
    document.getElementById("result_summary").textContent = "配方数据库为空，请在 recipe_database.js 中配置。";
    return;
  }

  render_entry_list();

  document.getElementById("add_entry_btn").addEventListener("click", add_entry);
  document.getElementById("calc_btn").addEventListener("click", run_calculation);
  document.getElementById("recipe_dropdown_btn").addEventListener("click", () => {
    toggle_recipe_dropdown();
  });
  document.getElementById("recipe_query").addEventListener("click", (event_object) => {
    event_object.target.select();
  });
  document.getElementById("recipe_query").addEventListener("input", () => {
    selected_recipe_id = "";
    if (!document.getElementById("recipe_dropdown_list").hidden) {
      render_recipe_dropdown_list();
    }
  });
  document.getElementById("recipe_query").addEventListener("keydown", (event_object) => {
    const dropdown_is_hidden = document.getElementById("recipe_dropdown_list").hidden;

    if (event_object.key === "ArrowDown") {
      event_object.preventDefault();
      if (dropdown_is_hidden) {
        open_recipe_dropdown();
      }
      set_highlighted_dropdown_index(highlighted_dropdown_index + 1);
      return;
    }

    if (event_object.key === "ArrowUp") {
      event_object.preventDefault();
      if (dropdown_is_hidden) {
        open_recipe_dropdown();
      }
      set_highlighted_dropdown_index(highlighted_dropdown_index - 1);
      return;
    }

    if (event_object.key === "Enter") {
      if (!dropdown_is_hidden) {
        event_object.preventDefault();
        select_highlighted_dropdown_item();
      }
      return;
    }

    if (event_object.key === "Escape") {
      if (!dropdown_is_hidden) {
        event_object.preventDefault();
        close_recipe_dropdown();
      }
    }
  });
  document.getElementById("recipe_match_mode").addEventListener("change", () => {
    selected_recipe_id = "";
    if (!document.getElementById("recipe_dropdown_list").hidden) {
      render_recipe_dropdown_list();
    }
  });
  document.addEventListener("click", (event_object) => {
    const recipe_combo_box_element = document.getElementById("recipe_combo_box");
    if (!recipe_combo_box_element.contains(event_object.target)) {
      close_recipe_dropdown();
    }
  });
}

initialize_page();
