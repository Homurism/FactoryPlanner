"use strict";

/**
 * 配方数据库（由开发者维护）。
 * 说明：
 * 1. 每条配方必须有 recipe_id、recipe_name、inputs、outputs。
 * 2. inputs/outputs 的 key 是物品名，value 是“每分钟执行 1 次配方时”的数量。
 * 3. 只需修改本文件即可新增/调整配方。
 * 4. 若需要外部供给物品，可配置一个无输入配方（inputs: {}）。
 */
const recipe_database = [
  {
    recipe_id: "mine_iron_ore",
    recipe_name: "铁矿输入",
    inputs: {},
    outputs: { 铁矿: 1 }
  },
  {
    recipe_id: "iron_ore_to_ingot",
    recipe_name: "1铁矿 -> 1铁锭",
    inputs: { 铁矿: 1 },
    outputs: { 铁锭: 1 }
  },
  {
    recipe_id: "iron_ingot_to_plate",
    recipe_name: "1铁锭 -> 2铁板",
    inputs: { 铁锭: 1 },
    outputs: { 铁板: 2 }
  },
  {
    recipe_id: "gear_recipe",
    recipe_name: "1铁板 + 2铁锭 -> 2铁齿轮",
    inputs: { 铁板: 1, 铁锭: 2 },
    outputs: { 铁齿轮: 2 }
  },
  {
    recipe_id: "shell_recipe",
    recipe_name: "2铁板 -> 3铁外壳",
    inputs: { 铁板: 2 },
    outputs: { 铁外壳: 3 }
  }
];

window.recipe_database = recipe_database;
