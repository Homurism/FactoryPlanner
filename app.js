"use strict";

const zero_rate_epsilon = 1e-9;
const display_rate_precision = 1000;

const recipe_by_id = {};
const recipes_by_output_item = {};
const all_item_name_list = [];
const produced_item_name_list = [];

const manual_production_entries = [];
let manual_selected_recipe_id = "";
let manual_highlighted_dropdown_index = -1;

const balance_target_entries = [];
let balance_selected_target_item_name = "";
let balance_highlighted_dropdown_index = -1;

function to_fixed_rate(value) {
  return `${(Math.round(value * display_rate_precision) / display_rate_precision).toFixed(3)}`;
}

function read_non_negative_number(input_id) {
  const input_value = Number(document.getElementById(input_id).value);
  return Number.isFinite(input_value) && input_value >= 0 ? input_value : NaN;
}

function normalize_search_text(raw_text) {
  return String(raw_text || "").trim().toLowerCase();
}

function parse_recipe_id_number(recipe_id) {
  const matched = String(recipe_id || "").match(/(\d+)/);
  return matched ? Number(matched[1]) : Number.MAX_SAFE_INTEGER;
}

function compare_recipe_id_asc(recipe_a, recipe_b) {
  const num_a = parse_recipe_id_number(recipe_a.recipe_id);
  const num_b = parse_recipe_id_number(recipe_b.recipe_id);
  if (num_a !== num_b) {
    return num_a - num_b;
  }
  return String(recipe_a.recipe_id).localeCompare(String(recipe_b.recipe_id), "zh-CN");
}

function get_recipe_by_id(recipe_id) {
  return recipe_by_id[recipe_id] || null;
}

function initialize_recipe_indexes() {
  const all_item_set = new Set();
  const produced_item_set = new Set();

  window.recipe_database.forEach((recipe_item) => {
    recipe_by_id[recipe_item.recipe_id] = recipe_item;
    Object.keys(recipe_item.inputs).forEach((item_name) => all_item_set.add(item_name));
    Object.keys(recipe_item.outputs).forEach((item_name) => {
      all_item_set.add(item_name);
      produced_item_set.add(item_name);
      if (!recipes_by_output_item[item_name]) {
        recipes_by_output_item[item_name] = [];
      }
      recipes_by_output_item[item_name].push(recipe_item);
    });
  });

  Object.keys(recipes_by_output_item).forEach((item_name) => {
    recipes_by_output_item[item_name].sort(compare_recipe_id_asc);
  });

  all_item_name_list.push(...Array.from(all_item_set).sort((a, b) => a.localeCompare(b, "zh-CN")));
  produced_item_name_list.push(...Array.from(produced_item_set).sort((a, b) => a.localeCompare(b, "zh-CN")));
}

function compute_flow_from_recipe_rate_map(recipe_rate_map) {
  const output_rates = {};
  const consumed_rates = {};
  const remaining_rates = {};
  all_item_name_list.forEach((item_name) => {
    output_rates[item_name] = 0;
    consumed_rates[item_name] = 0;
    remaining_rates[item_name] = 0;
  });

  Object.entries(recipe_rate_map).forEach(([recipe_id, recipe_rate]) => {
    if (recipe_rate <= zero_rate_epsilon) {
      return;
    }
    const recipe_item = get_recipe_by_id(recipe_id);
    if (!recipe_item) {
      return;
    }
    Object.entries(recipe_item.outputs).forEach(([item_name, output_amount]) => {
      output_rates[item_name] += output_amount * recipe_rate;
    });
    Object.entries(recipe_item.inputs).forEach(([item_name, input_amount]) => {
      consumed_rates[item_name] += input_amount * recipe_rate;
    });
  });

  all_item_name_list.forEach((item_name) => {
    remaining_rates[item_name] = output_rates[item_name] - consumed_rates[item_name];
  });
  return { output_rates, consumed_rates, remaining_rates };
}

function clear_table_body(table_body_id) {
  const table_body_element = document.getElementById(table_body_id);
  if (table_body_element) {
    table_body_element.innerHTML = "";
  }
}

function render_tab(tab_id) {
  document.querySelectorAll(".tab_panel").forEach((panel_element) => {
    panel_element.classList.toggle("tab_panel_active", panel_element.id === tab_id);
  });
  document.querySelectorAll(".tab_btn").forEach((button_element) => {
    button_element.classList.toggle("tab_btn_active", button_element.dataset.tab === tab_id);
  });
}

function initialize_tab_switching() {
  document.querySelectorAll(".tab_btn").forEach((button_element) => {
    button_element.addEventListener("click", () => render_tab(button_element.dataset.tab));
  });
}

function get_manual_filtered_recipe_list() {
  const normalized_query = normalize_search_text(document.getElementById("manual_recipe_query").value);
  const match_mode = document.getElementById("manual_recipe_match_mode").value;
  if (!normalized_query) {
    return window.recipe_database.slice();
  }
  return window.recipe_database.filter((recipe_item) => {
    const input_text = Object.keys(recipe_item.inputs).join(" ").toLowerCase();
    const output_text = Object.keys(recipe_item.outputs).join(" ").toLowerCase();
    if (match_mode === "inputs_only") {
      return input_text.includes(normalized_query);
    }
    if (match_mode === "outputs_only") {
      return output_text.includes(normalized_query);
    }
    return input_text.includes(normalized_query) || output_text.includes(normalized_query);
  });
}

function render_manual_recipe_dropdown_list() {
  const dropdown_list_element = document.getElementById("manual_recipe_dropdown_list");
  dropdown_list_element.innerHTML = "";
  manual_highlighted_dropdown_index = -1;
  const filtered_list = get_manual_filtered_recipe_list();
  if (filtered_list.length === 0) {
    const empty_item = document.createElement("li");
    empty_item.className = "dropdown_item_empty";
    empty_item.textContent = "无匹配配方";
    dropdown_list_element.appendChild(empty_item);
    return;
  }
  filtered_list.forEach((recipe_item) => {
    const item_element = document.createElement("li");
    item_element.className = "dropdown_item";
    item_element.textContent = recipe_item.recipe_name;
    item_element.dataset.recipeId = recipe_item.recipe_id;
    item_element.addEventListener("click", () => {
      document.getElementById("manual_recipe_query").value = recipe_item.recipe_name;
      manual_selected_recipe_id = recipe_item.recipe_id;
      close_manual_recipe_dropdown();
    });
    dropdown_list_element.appendChild(item_element);
  });
}

function open_manual_recipe_dropdown() {
  render_manual_recipe_dropdown_list();
  document.getElementById("manual_recipe_dropdown_list").hidden = false;
}

function close_manual_recipe_dropdown() {
  document.getElementById("manual_recipe_dropdown_list").hidden = true;
  manual_highlighted_dropdown_index = -1;
}

function toggle_manual_recipe_dropdown() {
  const dropdown_list_element = document.getElementById("manual_recipe_dropdown_list");
  if (dropdown_list_element.hidden) {
    open_manual_recipe_dropdown();
  } else {
    close_manual_recipe_dropdown();
  }
}

function get_manual_dropdown_item_elements() {
  return Array.from(document.querySelectorAll("#manual_recipe_dropdown_list .dropdown_item"));
}

function set_manual_highlighted_dropdown_index(next_index) {
  const dropdown_items = get_manual_dropdown_item_elements();
  dropdown_items.forEach((item_element) => item_element.classList.remove("dropdown_item_active"));
  if (dropdown_items.length === 0) {
    manual_highlighted_dropdown_index = -1;
    return;
  }
  const normalized_index = ((next_index % dropdown_items.length) + dropdown_items.length) % dropdown_items.length;
  manual_highlighted_dropdown_index = normalized_index;
  dropdown_items[normalized_index].classList.add("dropdown_item_active");
}

function select_manual_highlighted_dropdown_item() {
  const dropdown_items = get_manual_dropdown_item_elements();
  if (dropdown_items.length === 0) {
    return;
  }
  const selected_item_element = dropdown_items[manual_highlighted_dropdown_index >= 0 ? manual_highlighted_dropdown_index : 0];
  const recipe_id = selected_item_element.dataset.recipeId;
  const recipe_item = get_recipe_by_id(recipe_id);
  if (!recipe_item) {
    return;
  }
  document.getElementById("manual_recipe_query").value = recipe_item.recipe_name;
  manual_selected_recipe_id = recipe_item.recipe_id;
  close_manual_recipe_dropdown();
}

function resolve_manual_selected_recipe_id() {
  if (manual_selected_recipe_id && get_recipe_by_id(manual_selected_recipe_id)) {
    return manual_selected_recipe_id;
  }
  const query_text = document.getElementById("manual_recipe_query").value.trim();
  const exact_name_match = window.recipe_database.find((recipe_item) => recipe_item.recipe_name === query_text);
  if (exact_name_match) {
    manual_selected_recipe_id = exact_name_match.recipe_id;
    return exact_name_match.recipe_id;
  }
  return "";
}

function render_manual_entry_list() {
  const entry_list_element = document.getElementById("manual_entry_list");
  entry_list_element.innerHTML = "";
  manual_production_entries.forEach((entry_item, entry_index) => {
    const recipe_item = get_recipe_by_id(entry_item.recipe_id);
    const row_element = document.createElement("li");
    row_element.className = "entry_item";
    row_element.innerHTML = `<span>${recipe_item ? recipe_item.recipe_name : entry_item.recipe_id}：${to_fixed_rate(entry_item.recipe_rate_per_min)}</span>`;
    const delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.className = "danger_btn";
    delete_button.textContent = "删除";
    delete_button.addEventListener("click", () => {
      manual_production_entries.splice(entry_index, 1);
      render_manual_entry_list();
    });
    row_element.appendChild(delete_button);
    entry_list_element.appendChild(row_element);
  });
}

function manual_add_entry() {
  const selected_recipe_id = resolve_manual_selected_recipe_id();
  const recipe_rate_per_min = read_non_negative_number("manual_recipe_rate_per_min");
  const summary_element = document.getElementById("manual_result_summary");
  if (!selected_recipe_id) {
    summary_element.textContent = "请先从下拉菜单选择配方。";
    return;
  }
  if (Number.isNaN(recipe_rate_per_min)) {
    summary_element.textContent = "请输入有效的非负配方速率。";
    return;
  }
  manual_production_entries.push({ recipe_id: selected_recipe_id, recipe_rate_per_min });
  render_manual_entry_list();
  summary_element.textContent = "已添加一条数据。";
}

function manual_run_calculation() {
  const summary_element = document.getElementById("manual_result_summary");
  clear_table_body("manual_result_table_body");
  if (manual_production_entries.length === 0) {
    summary_element.textContent = "请先添加至少一条配方速率数据。";
    return;
  }

  const recipe_rate_map = {};
  const consumed_detail_map = {};
  all_item_name_list.forEach((item_name) => {
    consumed_detail_map[item_name] = [];
  });
  manual_production_entries.forEach((entry_item) => {
    recipe_rate_map[entry_item.recipe_id] = (recipe_rate_map[entry_item.recipe_id] || 0) + entry_item.recipe_rate_per_min;
    const recipe_item = get_recipe_by_id(entry_item.recipe_id);
    if (!recipe_item) {
      return;
    }
    Object.entries(recipe_item.inputs).forEach(([item_name, input_amount]) => {
      consumed_detail_map[item_name].push({
        recipe_name: recipe_item.recipe_name,
        consumed_rate: input_amount * entry_item.recipe_rate_per_min
      });
    });
  });

  const flow_result = compute_flow_from_recipe_rate_map(recipe_rate_map);
  const table_body = document.getElementById("manual_result_table_body");
  let has_visible_row = false;

  all_item_name_list.forEach((item_name) => {
    const output_rate = flow_result.output_rates[item_name] || 0;
    const consumed_rate = flow_result.consumed_rates[item_name] || 0;
    const remaining_rate = flow_result.remaining_rates[item_name] || 0;
    if (
      Math.abs(output_rate) <= zero_rate_epsilon &&
      Math.abs(consumed_rate) <= zero_rate_epsilon &&
      Math.abs(remaining_rate) <= zero_rate_epsilon
    ) {
      return;
    }
    has_visible_row = true;
    const row_element = document.createElement("tr");
    row_element.innerHTML = `
      <td>${item_name}</td>
      <td>${to_fixed_rate(output_rate)}</td>
      <td>${to_fixed_rate(consumed_rate)}</td>
      <td class="${remaining_rate < 0 ? "negative_rate" : ""}">${to_fixed_rate(remaining_rate)}</td>
      <td><button type="button" class="detail_btn">查看</button></td>
    `;
    table_body.appendChild(row_element);
    const detail_row = document.createElement("tr");
    detail_row.className = "detail_row";
    detail_row.style.display = "none";
    const detail_cell = document.createElement("td");
    detail_cell.colSpan = 5;
    const detail_list = consumed_detail_map[item_name] || [];
    detail_cell.textContent = detail_list.length === 0
      ? "未被任何已添加配方消耗。"
      : detail_list.map((detail_item) => `${detail_item.recipe_name}: ${to_fixed_rate(detail_item.consumed_rate)}`).join("；");
    detail_row.appendChild(detail_cell);
    table_body.appendChild(detail_row);
    const detail_button = row_element.querySelector("button");
    detail_button.addEventListener("click", () => {
      const is_hidden = detail_row.style.display === "none";
      detail_row.style.display = is_hidden ? "table-row" : "none";
      detail_button.textContent = is_hidden ? "收起" : "查看";
    });
  });

  if (!has_visible_row) {
    const empty_row = document.createElement("tr");
    empty_row.innerHTML = "<td colspan=\"5\">无非零数据可显示。</td>";
    table_body.appendChild(empty_row);
  }
  summary_element.textContent = "计算完成。";
}

function get_balance_filtered_target_item_list() {
  const normalized_query = normalize_search_text(document.getElementById("balance_target_query").value);
  if (!normalized_query) {
    return produced_item_name_list.slice();
  }
  return produced_item_name_list.filter((item_name) => item_name.toLowerCase().includes(normalized_query));
}

function render_balance_target_dropdown_list() {
  const dropdown_list_element = document.getElementById("balance_target_dropdown_list");
  dropdown_list_element.innerHTML = "";
  balance_highlighted_dropdown_index = -1;
  const filtered_item_list = get_balance_filtered_target_item_list();
  if (filtered_item_list.length === 0) {
    const empty_item = document.createElement("li");
    empty_item.className = "dropdown_item_empty";
    empty_item.textContent = "无匹配目标产物";
    dropdown_list_element.appendChild(empty_item);
    return;
  }
  filtered_item_list.forEach((item_name) => {
    const item_element = document.createElement("li");
    item_element.className = "dropdown_item";
    item_element.textContent = item_name;
    item_element.dataset.itemName = item_name;
    item_element.addEventListener("click", () => {
      document.getElementById("balance_target_query").value = item_name;
      balance_selected_target_item_name = item_name;
      close_balance_target_dropdown();
    });
    dropdown_list_element.appendChild(item_element);
  });
}

function open_balance_target_dropdown() {
  render_balance_target_dropdown_list();
  document.getElementById("balance_target_dropdown_list").hidden = false;
}

function close_balance_target_dropdown() {
  document.getElementById("balance_target_dropdown_list").hidden = true;
  balance_highlighted_dropdown_index = -1;
}

function toggle_balance_target_dropdown() {
  const dropdown_list_element = document.getElementById("balance_target_dropdown_list");
  if (dropdown_list_element.hidden) {
    open_balance_target_dropdown();
  } else {
    close_balance_target_dropdown();
  }
}

function get_balance_dropdown_item_elements() {
  return Array.from(document.querySelectorAll("#balance_target_dropdown_list .dropdown_item"));
}

function set_balance_highlighted_dropdown_index(next_index) {
  const dropdown_items = get_balance_dropdown_item_elements();
  dropdown_items.forEach((item_element) => item_element.classList.remove("dropdown_item_active"));
  if (dropdown_items.length === 0) {
    balance_highlighted_dropdown_index = -1;
    return;
  }
  const normalized_index = ((next_index % dropdown_items.length) + dropdown_items.length) % dropdown_items.length;
  balance_highlighted_dropdown_index = normalized_index;
  dropdown_items[normalized_index].classList.add("dropdown_item_active");
}

function select_balance_highlighted_dropdown_item() {
  const dropdown_items = get_balance_dropdown_item_elements();
  if (dropdown_items.length === 0) {
    return;
  }
  const selected_item_element = dropdown_items[balance_highlighted_dropdown_index >= 0 ? balance_highlighted_dropdown_index : 0];
  const item_name = selected_item_element.dataset.itemName;
  document.getElementById("balance_target_query").value = item_name;
  balance_selected_target_item_name = item_name;
  close_balance_target_dropdown();
}

function resolve_balance_selected_target_item_name() {
  if (balance_selected_target_item_name) {
    return balance_selected_target_item_name;
  }
  const query_text = document.getElementById("balance_target_query").value.trim();
  return produced_item_name_list.find((item_name) => item_name === query_text) || "";
}

function render_balance_target_entry_list() {
  const entry_list_element = document.getElementById("balance_target_entry_list");
  entry_list_element.innerHTML = "";
  balance_target_entries.forEach((entry_item, entry_index) => {
    const row_element = document.createElement("li");
    row_element.className = "entry_item";
    row_element.innerHTML = `<span>${entry_item.item_name}：${to_fixed_rate(entry_item.target_rate_per_min)}</span>`;
    const delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.className = "danger_btn";
    delete_button.textContent = "删除";
    delete_button.addEventListener("click", () => {
      balance_target_entries.splice(entry_index, 1);
      render_balance_target_entry_list();
    });
    row_element.appendChild(delete_button);
    entry_list_element.appendChild(row_element);
  });
}

function build_balance_required_map() {
  const required_map = {};
  all_item_name_list.forEach((item_name) => { required_map[item_name] = 0; });
  balance_target_entries.forEach((entry_item) => {
    required_map[entry_item.item_name] = (required_map[entry_item.item_name] || 0) + entry_item.target_rate_per_min;
  });
  return required_map;
}

function get_primary_producer_recipe_id(item_name) {
  const producer_list = recipes_by_output_item[item_name] || [];
  return producer_list.length > 0 ? producer_list[0].recipe_id : "";
}

function build_balance_deficit_list(remaining_rates, required_map) {
  const deficit_list = [];
  all_item_name_list.forEach((item_name) => {
    const required_rate = Math.max(required_map[item_name] || 0, 0);
    const deficit = required_rate - (remaining_rates[item_name] || 0);
    if (deficit > zero_rate_epsilon) {
      deficit_list.push({ item_name, deficit });
    }
  });
  deficit_list.sort((a, b) => b.deficit - a.deficit);
  return deficit_list;
}

function build_balanced_recipe_rate_map(required_map) {
  const recipe_rate_map = {};
  const unresolved_item_map = {};

  for (let iter = 0; iter < 20000; iter += 1) {
    const flow_result = compute_flow_from_recipe_rate_map(recipe_rate_map);
    const deficit_list = build_balance_deficit_list(flow_result.remaining_rates, required_map);
    if (deficit_list.length === 0) {
      return { recipe_rate_map, unresolved_item_map };
    }

    let fixed_one_deficit = false;
    for (const deficit_item of deficit_list) {
      const producer_recipe_id = get_primary_producer_recipe_id(deficit_item.item_name);
      if (!producer_recipe_id) {
        unresolved_item_map[deficit_item.item_name] = "无可用产出配方";
        continue;
      }
      const producer_recipe = get_recipe_by_id(producer_recipe_id);
      const output_amount = producer_recipe && producer_recipe.outputs[deficit_item.item_name];
      if (!output_amount || output_amount <= 0) {
        unresolved_item_map[deficit_item.item_name] = "产出数量异常";
        continue;
      }
      recipe_rate_map[producer_recipe_id] = (recipe_rate_map[producer_recipe_id] || 0) + deficit_item.deficit / output_amount;
      fixed_one_deficit = true;
      break;
    }
    if (!fixed_one_deficit) {
      return { recipe_rate_map, unresolved_item_map };
    }
  }
  return { recipe_rate_map, unresolved_item_map: { "__loop__": "迭代上限，可能存在循环依赖" } };
}

function balance_constraints_satisfied(recipe_rate_map, required_map) {
  const flow_result = compute_flow_from_recipe_rate_map(recipe_rate_map);
  for (const item_name of all_item_name_list) {
    const required_rate = Math.max(required_map[item_name] || 0, 0);
    if ((flow_result.remaining_rates[item_name] || 0) + zero_rate_epsilon < required_rate) {
      return false;
    }
  }
  return true;
}

function optimize_recipe_rate_map(recipe_rate_map, required_map) {
  const optimized_map = { ...recipe_rate_map };
  const recipe_id_list = Object.keys(optimized_map).filter((recipe_id) => optimized_map[recipe_id] > zero_rate_epsilon);
  for (let pass = 0; pass < 3; pass += 1) {
    let changed = false;
    for (const recipe_id of recipe_id_list) {
      const current_rate = optimized_map[recipe_id] || 0;
      if (current_rate <= zero_rate_epsilon) {
        continue;
      }
      const zero_test_map = { ...optimized_map, [recipe_id]: 0 };
      if (balance_constraints_satisfied(zero_test_map, required_map)) {
        optimized_map[recipe_id] = 0;
        changed = true;
        continue;
      }
      let low = 0;
      let high = current_rate;
      for (let iter = 0; iter < 36; iter += 1) {
        const mid = (low + high) / 2;
        const mid_test_map = { ...optimized_map, [recipe_id]: mid };
        if (balance_constraints_satisfied(mid_test_map, required_map)) {
          high = mid;
        } else {
          low = mid;
        }
      }
      if (Math.abs((optimized_map[recipe_id] || 0) - high) > 1e-7) {
        changed = true;
      }
      optimized_map[recipe_id] = high <= zero_rate_epsilon ? 0 : high;
    }
    if (!changed) {
      break;
    }
  }
  return optimized_map;
}

function build_balance_summary_item_name_list(recipe_rate_map) {
  const item_name_set = new Set();

  // 展示当前方案中作为原料出现的物品。
  Object.entries(recipe_rate_map).forEach(([recipe_id, recipe_rate]) => {
    if (recipe_rate <= zero_rate_epsilon) {
      return;
    }
    const recipe_item = get_recipe_by_id(recipe_id);
    if (!recipe_item) {
      return;
    }
    Object.keys(recipe_item.inputs).forEach((item_name) => item_name_set.add(item_name));
  });

  // 目标物品无论是否作为原料，都应展示。
  balance_target_entries.forEach((entry_item) => {
    item_name_set.add(entry_item.item_name);
  });

  return Array.from(item_name_set).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function render_balance_extra_table(required_map, flow_result) {
  const table_body = document.getElementById("balance_extra_table_body");
  table_body.innerHTML = "";

  const extra_rows = [];
  all_item_name_list.forEach((item_name) => {
    const required_rate = Math.max(required_map[item_name] || 0, 0);
    const remaining_rate = flow_result.remaining_rates[item_name] || 0;
    const extra_rate = remaining_rate - required_rate;
    const rounded_extra_rate = Math.round(extra_rate * display_rate_precision) / display_rate_precision;
    const rounded_remaining_rate = Math.round(remaining_rate * display_rate_precision) / display_rate_precision;
    if (rounded_extra_rate > 0 && rounded_remaining_rate > 0) {
      extra_rows.push({ item_name, extra_rate });
    }
  });

  if (extra_rows.length === 0) {
    table_body.innerHTML = "<tr><td colspan=\"2\">无多余产物</td></tr>";
    return;
  }

  extra_rows.forEach((row_item) => {
    const row_element = document.createElement("tr");
    row_element.innerHTML = `<td>${row_item.item_name}</td><td>${to_fixed_rate(row_item.extra_rate)}</td>`;
    table_body.appendChild(row_element);
  });
}

function render_balance_result_table(recipe_rate_map, flow_result) {
  const table_body = document.getElementById("balance_result_table_body");
  table_body.innerHTML = "";
  const input_item_name_list = build_balance_summary_item_name_list(recipe_rate_map);
  if (input_item_name_list.length === 0) {
    table_body.innerHTML = "<tr><td colspan=\"4\">无需求或配方速率数据可显示。</td></tr>";
    return;
  }

  input_item_name_list.forEach((item_name) => {
    const output_rate = flow_result.output_rates[item_name] || 0;
    const producer_list = recipes_by_output_item[item_name] || [];

    const row_element = document.createElement("tr");

    const item_cell = document.createElement("td");
    item_cell.textContent = item_name;

    const demand_cell = document.createElement("td");
    demand_cell.textContent = to_fixed_rate(output_rate);

    const producer_cell = document.createElement("td");
    const producer_rate_cell = document.createElement("td");

    if (producer_list.length === 0) {
      producer_cell.textContent = "-";
      producer_rate_cell.textContent = "-";
    } else {
      const primary_recipe_id = get_primary_producer_recipe_id(item_name);
      const primary_recipe = get_recipe_by_id(primary_recipe_id);
      producer_cell.textContent = primary_recipe ? primary_recipe.recipe_name : "-";
      producer_rate_cell.textContent = to_fixed_rate(recipe_rate_map[primary_recipe_id] || 0);
    }

    row_element.appendChild(item_cell);
    row_element.appendChild(demand_cell);
    row_element.appendChild(producer_cell);
    row_element.appendChild(producer_rate_cell);
    table_body.appendChild(row_element);
  });
}

function run_balance_calculation() {
  const summary_element = document.getElementById("balance_result_summary");
  clear_table_body("balance_extra_table_body");
  clear_table_body("balance_result_table_body");
  if (balance_target_entries.length === 0) {
    summary_element.textContent = "请先添加至少一个目标产物。";
    return;
  }

  const required_map = build_balance_required_map();
  const initial_result = build_balanced_recipe_rate_map(required_map);
  const optimized_recipe_rate_map = optimize_recipe_rate_map(initial_result.recipe_rate_map, required_map);
  const flow_result = compute_flow_from_recipe_rate_map(optimized_recipe_rate_map);
  const final_deficit_list = build_balance_deficit_list(flow_result.remaining_rates, required_map);
  render_balance_extra_table(required_map, flow_result);
  render_balance_result_table(optimized_recipe_rate_map, flow_result);

  const unresolved_item_names = Object.keys(initial_result.unresolved_item_map);
  if (unresolved_item_names.length > 0) {
    summary_element.textContent = `存在无法补齐的物品：${unresolved_item_names.join("、")}`;
    return;
  }
  if (final_deficit_list.length > 0) {
    summary_element.textContent = `仍有目标未满足：${final_deficit_list.map((item) => item.item_name).join("、")}`;
    return;
  }
  summary_element.textContent = "配平计算完成。";
}

function balance_add_target_entry() {
  const selected_item_name = resolve_balance_selected_target_item_name();
  const target_rate_per_min = read_non_negative_number("balance_target_rate_per_min");
  const summary_element = document.getElementById("balance_result_summary");
  if (!selected_item_name) {
    summary_element.textContent = "请先从下拉菜单选择目标产物。";
    return;
  }
  if (Number.isNaN(target_rate_per_min)) {
    summary_element.textContent = "请输入有效的非负目标速率。";
    return;
  }
  balance_target_entries.push({ item_name: selected_item_name, target_rate_per_min });
  render_balance_target_entry_list();
  summary_element.textContent = "已添加目标产物。";
}

function initialize_manual_events() {
  document.getElementById("manual_add_entry_btn").addEventListener("click", manual_add_entry);
  document.getElementById("manual_calc_btn").addEventListener("click", manual_run_calculation);
  document.getElementById("manual_recipe_dropdown_btn").addEventListener("click", toggle_manual_recipe_dropdown);
  document.getElementById("manual_recipe_query").addEventListener("click", (event_object) => event_object.target.select());
  document.getElementById("manual_recipe_query").addEventListener("input", () => {
    manual_selected_recipe_id = "";
    if (!document.getElementById("manual_recipe_dropdown_list").hidden) {
      render_manual_recipe_dropdown_list();
    }
  });
  document.getElementById("manual_recipe_match_mode").addEventListener("change", () => {
    manual_selected_recipe_id = "";
    if (!document.getElementById("manual_recipe_dropdown_list").hidden) {
      render_manual_recipe_dropdown_list();
    }
  });
  document.getElementById("manual_recipe_query").addEventListener("keydown", (event_object) => {
    const dropdown_is_hidden = document.getElementById("manual_recipe_dropdown_list").hidden;
    if (event_object.key === "ArrowDown") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_manual_recipe_dropdown(); }
      set_manual_highlighted_dropdown_index(manual_highlighted_dropdown_index + 1);
      return;
    }
    if (event_object.key === "ArrowUp") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_manual_recipe_dropdown(); }
      set_manual_highlighted_dropdown_index(manual_highlighted_dropdown_index - 1);
      return;
    }
    if (event_object.key === "Enter") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_manual_recipe_dropdown(); return; }
      if (manual_highlighted_dropdown_index >= 0) { select_manual_highlighted_dropdown_item(); return; }
      close_manual_recipe_dropdown();
      return;
    }
    if (event_object.key === "Escape" && !dropdown_is_hidden) {
      event_object.preventDefault();
      close_manual_recipe_dropdown();
    }
  });
}

function initialize_balance_events() {
  document.getElementById("balance_add_target_btn").addEventListener("click", balance_add_target_entry);
  document.getElementById("balance_calc_btn").addEventListener("click", run_balance_calculation);
  document.getElementById("balance_target_dropdown_btn").addEventListener("click", toggle_balance_target_dropdown);
  document.getElementById("balance_target_query").addEventListener("click", (event_object) => event_object.target.select());
  document.getElementById("balance_target_query").addEventListener("input", () => {
    balance_selected_target_item_name = "";
    if (!document.getElementById("balance_target_dropdown_list").hidden) {
      render_balance_target_dropdown_list();
    }
  });
  document.getElementById("balance_target_query").addEventListener("keydown", (event_object) => {
    const dropdown_is_hidden = document.getElementById("balance_target_dropdown_list").hidden;
    if (event_object.key === "ArrowDown") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_balance_target_dropdown(); }
      set_balance_highlighted_dropdown_index(balance_highlighted_dropdown_index + 1);
      return;
    }
    if (event_object.key === "ArrowUp") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_balance_target_dropdown(); }
      set_balance_highlighted_dropdown_index(balance_highlighted_dropdown_index - 1);
      return;
    }
    if (event_object.key === "Enter") {
      event_object.preventDefault();
      if (dropdown_is_hidden) { open_balance_target_dropdown(); return; }
      if (balance_highlighted_dropdown_index >= 0) { select_balance_highlighted_dropdown_item(); return; }
      close_balance_target_dropdown();
      return;
    }
    if (event_object.key === "Escape" && !dropdown_is_hidden) {
      event_object.preventDefault();
      close_balance_target_dropdown();
    }
  });
}

function initialize_global_events() {
  document.addEventListener("click", (event_object) => {
    const manual_box = document.getElementById("manual_recipe_combo_box");
    if (manual_box && !manual_box.contains(event_object.target)) { close_manual_recipe_dropdown(); }
    const balance_box = document.getElementById("balance_target_combo_box");
    if (balance_box && !balance_box.contains(event_object.target)) { close_balance_target_dropdown(); }
  });
}

function initialize_page() {
  if (!Array.isArray(window.recipe_database) || window.recipe_database.length === 0) {
    document.body.innerHTML = "配方数据库为空，请在 recipe_database.js 中配置。";
    return;
  }
  initialize_recipe_indexes();
  initialize_tab_switching();
  render_manual_entry_list();
  render_balance_target_entry_list();
  initialize_manual_events();
  initialize_balance_events();
  initialize_global_events();
}

initialize_page();
