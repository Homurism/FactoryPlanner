"use strict";

/**
 * 配方数据库（由 recipes.txt 自动覆盖生成）。
 * 如需更新配方，请修改 recipes.txt 后重新执行生成流程。
 */
const recipe_database = [
  {
    recipe_id: "recipe_0001",
    recipe_name: "->1铁矿石",
    inputs: {
    },
    outputs: {
      "铁矿石": 1
    }
  },
  {
    recipe_id: "recipe_0002",
    recipe_name: "->1铜矿石",
    inputs: {
    },
    outputs: {
      "铜矿石": 1
    }
  },
  {
    recipe_id: "recipe_0003",
    recipe_name: "->1煤",
    inputs: {
    },
    outputs: {
      "煤": 1
    }
  },
  {
    recipe_id: "recipe_0004",
    recipe_name: "->1石灰岩",
    inputs: {
    },
    outputs: {
      "石灰岩": 1
    }
  },
  {
    recipe_id: "recipe_0005",
    recipe_name: "->1锡矿石",
    inputs: {
    },
    outputs: {
      "锡矿石": 1
    }
  },
  {
    recipe_id: "recipe_0006",
    recipe_name: "->1沙子",
    inputs: {
    },
    outputs: {
      "沙子": 1
    }
  },
  {
    recipe_id: "recipe_0007",
    recipe_name: "->1树脂",
    inputs: {
    },
    outputs: {
      "树脂": 1
    }
  },
  {
    recipe_id: "recipe_0008",
    recipe_name: "->1水",
    inputs: {
    },
    outputs: {
      "水": 1
    }
  },
  {
    recipe_id: "recipe_0009",
    recipe_name: "->1原油",
    inputs: {
    },
    outputs: {
      "原油": 1
    }
  },
  {
    recipe_id: "recipe_0010",
    recipe_name: "1铁矿石->1铁锭",
    inputs: {
      "铁矿石": 1
    },
    outputs: {
      "铁锭": 1
    }
  },
  {
    recipe_id: "recipe_0011",
    recipe_name: "1铜矿石->1铜锭",
    inputs: {
      "铜矿石": 1
    },
    outputs: {
      "铜锭": 1
    }
  },
  {
    recipe_id: "recipe_0012",
    recipe_name: "1煤->1焦炭",
    inputs: {
      "煤": 1
    },
    outputs: {
      "焦炭": 1
    }
  },
  {
    recipe_id: "recipe_0013",
    recipe_name: "1锡矿石->1锡锭",
    inputs: {
      "锡矿石": 1
    },
    outputs: {
      "锡锭": 1
    }
  },
  {
    recipe_id: "recipe_0014",
    recipe_name: "1锡锭+1铜锭->2青铜锭",
    inputs: {
      "锡锭": 1,
      "铜锭": 1
    },
    outputs: {
      "青铜锭": 2
    }
  },
  {
    recipe_id: "recipe_0015",
    recipe_name: "2铁锭+1焦炭->2钢锭",
    inputs: {
      "铁锭": 2,
      "焦炭": 1
    },
    outputs: {
      "钢锭": 2
    }
  },
  {
    recipe_id: "recipe_0016",
    recipe_name: "2石灰岩->1砖",
    inputs: {
      "石灰岩": 2
    },
    outputs: {
      "砖": 1
    }
  },
  {
    recipe_id: "recipe_0017",
    recipe_name: "3沙子->1玻璃棒",
    inputs: {
      "沙子": 3
    },
    outputs: {
      "玻璃棒": 1
    }
  },
  {
    recipe_id: "recipe_0018",
    recipe_name: "1沙子+2焦炭->2硅",
    inputs: {
      "沙子": 1,
      "焦炭": 2
    },
    outputs: {
      "硅": 2
    }
  },
  {
    recipe_id: "recipe_0019",
    recipe_name: "2粘土+1煤粉->2陶瓷",
    inputs: {
      "粘土": 2,
      "煤粉": 1
    },
    outputs: {
      "陶瓷": 2
    }
  },
  {
    recipe_id: "recipe_0020",
    recipe_name: "3焦炭->1钻石",
    inputs: {
      "焦炭": 3
    },
    outputs: {
      "钻石": 1
    }
  },
  {
    recipe_id: "recipe_0021",
    recipe_name: "2铁锭->1铁棒",
    inputs: {
      "铁锭": 2
    },
    outputs: {
      "铁棒": 1
    }
  },
  {
    recipe_id: "recipe_0022",
    recipe_name: "2铜锭->1铜棒",
    inputs: {
      "铜锭": 2
    },
    outputs: {
      "铜棒": 1
    }
  },
  {
    recipe_id: "recipe_0023",
    recipe_name: "2铁板->3铁外壳",
    inputs: {
      "铁板": 2
    },
    outputs: {
      "铁外壳": 3
    }
  },
  {
    recipe_id: "recipe_0024",
    recipe_name: "2铜板->3铜外壳",
    inputs: {
      "铜板": 2
    },
    outputs: {
      "铜外壳": 3
    }
  },
  {
    recipe_id: "recipe_0025",
    recipe_name: "1铁板+2铁锭->3铁齿轮",
    inputs: {
      "铁板": 1,
      "铁锭": 2
    },
    outputs: {
      "铁齿轮": 3
    }
  },
  {
    recipe_id: "recipe_0026",
    recipe_name: "1铜棒+2锡锭->2铜线",
    inputs: {
      "铜棒": 1,
      "锡锭": 2
    },
    outputs: {
      "铜线": 2
    }
  },
  {
    recipe_id: "recipe_0027",
    recipe_name: "2钢锭->1钢棒",
    inputs: {
      "钢锭": 2
    },
    outputs: {
      "钢棒": 1
    }
  },
  {
    recipe_id: "recipe_0028",
    recipe_name: "2钢板->3钢外壳",
    inputs: {
      "钢板": 2
    },
    outputs: {
      "钢外壳": 3
    }
  },
  {
    recipe_id: "recipe_0029",
    recipe_name: "2青铜锭->1青铜棒",
    inputs: {
      "青铜锭": 2
    },
    outputs: {
      "青铜棒": 1
    }
  },
  {
    recipe_id: "recipe_0030",
    recipe_name: "2青铜板->3青铜外壳",
    inputs: {
      "青铜板": 2
    },
    outputs: {
      "青铜外壳": 3
    }
  },
  {
    recipe_id: "recipe_0031",
    recipe_name: "2铜线+1铜薄板->2线圈",
    inputs: {
      "铜线": 2,
      "铜薄板": 1
    },
    outputs: {
      "线圈": 2
    }
  },
  {
    recipe_id: "recipe_0032",
    recipe_name: "2钢棒->1螺栓+3弹片",
    inputs: {
      "钢棒": 2
    },
    outputs: {
      "螺栓": 1,
      "弹片": 3
    }
  },
  {
    recipe_id: "recipe_0033",
    recipe_name: "1青铜棒+1铁棒->2管道",
    inputs: {
      "青铜棒": 1,
      "铁棒": 1
    },
    outputs: {
      "管道": 2
    }
  },
  {
    recipe_id: "recipe_0034",
    recipe_name: "2钢棒+1铁齿轮->2轴",
    inputs: {
      "钢棒": 2,
      "铁齿轮": 1
    },
    outputs: {
      "轴": 2
    }
  },
  {
    recipe_id: "recipe_0035",
    recipe_name: "1青铜棒+3火药->1弹匣",
    inputs: {
      "青铜棒": 1,
      "火药": 3
    },
    outputs: {
      "弹匣": 1
    }
  },
  {
    recipe_id: "recipe_0036",
    recipe_name: "1弹片+1钢薄板+3硅->1军用匕首",
    inputs: {
      "弹片": 1,
      "钢薄板": 1,
      "硅": 3
    },
    outputs: {
      "军用匕首": 1
    }
  },
  {
    recipe_id: "recipe_0037",
    recipe_name: "2玻璃板+2钢板+1轴->1防弹盾牌",
    inputs: {
      "玻璃板": 2,
      "钢板": 2,
      "轴": 1
    },
    outputs: {
      "防弹盾牌": 1
    }
  },
  {
    recipe_id: "recipe_0038",
    recipe_name: "2管道+10弹片+1铁外壳->1轴承",
    inputs: {
      "管道": 2,
      "弹片": 10,
      "铁外壳": 1
    },
    outputs: {
      "轴承": 1
    }
  },
  {
    recipe_id: "recipe_0039",
    recipe_name: "2玻璃棒->1瓶子",
    inputs: {
      "玻璃棒": 2
    },
    outputs: {
      "瓶子": 1
    }
  },
  {
    recipe_id: "recipe_0040",
    recipe_name: "1食品罐头+1汤->1罐装蘑菇",
    inputs: {
      "食品罐头": 1,
      "汤": 1
    },
    outputs: {
      "罐装蘑菇": 1
    }
  },
  {
    recipe_id: "recipe_0041",
    recipe_name: "1弹簧+1轴承+1钢棒->1游标卡尺",
    inputs: {
      "弹簧": 1,
      "轴承": 1,
      "钢棒": 1
    },
    outputs: {
      "游标卡尺": 1
    }
  },
  {
    recipe_id: "recipe_0042",
    recipe_name: "1铜薄板+1塑料薄板->1食品罐头",
    inputs: {
      "铜薄板": 1,
      "塑料薄板": 1
    },
    outputs: {
      "食品罐头": 1
    }
  },
  {
    recipe_id: "recipe_0043",
    recipe_name: "1钻石+1二极管+1线圈->1激光瞄准器",
    inputs: {
      "钻石": 1,
      "二极管": 1,
      "线圈": 1
    },
    outputs: {
      "激光瞄准器": 1
    }
  },
  {
    recipe_id: "recipe_0044",
    recipe_name: "1注射器+1绷带+1无菌手套->1医疗包",
    inputs: {
      "注射器": 1,
      "绷带": 1,
      "无菌手套": 1
    },
    outputs: {
      "医疗包": 1
    }
  },
  {
    recipe_id: "recipe_0045",
    recipe_name: "1激光瞄准器+2管道->1夜视仪",
    inputs: {
      "激光瞄准器": 1,
      "管道": 2
    },
    outputs: {
      "夜视仪": 1
    }
  },
  {
    recipe_id: "recipe_0046",
    recipe_name: "3弹片+1钢薄板+1青铜棒->1手术刀",
    inputs: {
      "弹片": 3,
      "钢薄板": 1,
      "青铜棒": 1
    },
    outputs: {
      "手术刀": 1
    }
  },
  {
    recipe_id: "recipe_0047",
    recipe_name: "6铜线+2塑料薄板->1弹簧",
    inputs: {
      "铜线": 6,
      "塑料薄板": 2
    },
    outputs: {
      "弹簧": 1
    }
  },
  {
    recipe_id: "recipe_0048",
    recipe_name: "2玻璃棒+1管道->1注射器",
    inputs: {
      "玻璃棒": 2,
      "管道": 1
    },
    outputs: {
      "注射器": 1
    }
  },
  {
    recipe_id: "recipe_0049",
    recipe_name: "1军用匕首+4铜线->1陷阱套件",
    inputs: {
      "军用匕首": 1,
      "铜线": 4
    },
    outputs: {
      "陷阱套件": 1
    }
  },
  {
    recipe_id: "recipe_0050",
    recipe_name: "2浆果+1瓶子->1果汁",
    inputs: {
      "浆果": 2,
      "瓶子": 1
    },
    outputs: {
      "果汁": 1
    }
  },
  {
    recipe_id: "recipe_0051",
    recipe_name: "1铁棒+3锡锭->1小型维修套件",
    inputs: {
      "铁棒": 1,
      "锡锭": 3
    },
    outputs: {
      "小型维修套件": 1
    }
  },
  {
    recipe_id: "recipe_0052",
    recipe_name: "3石灰岩->4鹅卵石",
    inputs: {
      "石灰岩": 3
    },
    outputs: {
      "鹅卵石": 4
    }
  },
  {
    recipe_id: "recipe_0053",
    recipe_name: "3石灰岩->4水泥",
    inputs: {
      "石灰岩": 3
    },
    outputs: {
      "水泥": 4
    }
  },
  {
    recipe_id: "recipe_0054",
    recipe_name: "3小麦->1面粉",
    inputs: {
      "小麦": 3
    },
    outputs: {
      "面粉": 1
    }
  },
  {
    recipe_id: "recipe_0055",
    recipe_name: "2青铜锭->4青铜板",
    inputs: {
      "青铜锭": 2
    },
    outputs: {
      "青铜板": 4
    }
  },
  {
    recipe_id: "recipe_0056",
    recipe_name: "2青铜锭->8青铜薄板",
    inputs: {
      "青铜锭": 2
    },
    outputs: {
      "青铜薄板": 8
    }
  },
  {
    recipe_id: "recipe_0057",
    recipe_name: "2煤->8煤粉",
    inputs: {
      "煤": 2
    },
    outputs: {
      "煤粉": 8
    }
  },
  {
    recipe_id: "recipe_0058",
    recipe_name: "2煤->4石墨",
    inputs: {
      "煤": 2
    },
    outputs: {
      "石墨": 4
    }
  },
  {
    recipe_id: "recipe_0059",
    recipe_name: "2铜锭->4铜板",
    inputs: {
      "铜锭": 2
    },
    outputs: {
      "铜板": 4
    }
  },
  {
    recipe_id: "recipe_0060",
    recipe_name: "2铜锭->8铜薄板",
    inputs: {
      "铜锭": 2
    },
    outputs: {
      "铜薄板": 8
    }
  },
  {
    recipe_id: "recipe_0061",
    recipe_name: "2玻璃棒->4玻璃板",
    inputs: {
      "玻璃棒": 2
    },
    outputs: {
      "玻璃板": 4
    }
  },
  {
    recipe_id: "recipe_0062",
    recipe_name: "2玻璃棒->4石英",
    inputs: {
      "玻璃棒": 2
    },
    outputs: {
      "石英": 4
    }
  },
  {
    recipe_id: "recipe_0063",
    recipe_name: "2铁锭->4铁板",
    inputs: {
      "铁锭": 2
    },
    outputs: {
      "铁板": 4
    }
  },
  {
    recipe_id: "recipe_0064",
    recipe_name: "2铁锭->8铁薄板",
    inputs: {
      "铁锭": 2
    },
    outputs: {
      "铁薄板": 8
    }
  },
  {
    recipe_id: "recipe_0065",
    recipe_name: "2塑料颗粒+2树脂->4塑料板",
    inputs: {
      "塑料颗粒": 2,
      "树脂": 2
    },
    outputs: {
      "塑料板": 4
    }
  },
  {
    recipe_id: "recipe_0066",
    recipe_name: "2塑料颗粒+2树脂->8塑料薄板",
    inputs: {
      "塑料颗粒": 2,
      "树脂": 2
    },
    outputs: {
      "塑料薄板": 8
    }
  },
  {
    recipe_id: "recipe_0067",
    recipe_name: "2钢锭->4钢板",
    inputs: {
      "钢锭": 2
    },
    outputs: {
      "钢板": 4
    }
  },
  {
    recipe_id: "recipe_0068",
    recipe_name: "2钢锭->8钢薄板",
    inputs: {
      "钢锭": 2
    },
    outputs: {
      "钢薄板": 8
    }
  },
  {
    recipe_id: "recipe_0069",
    recipe_name: "1石灰岩->1盐堆",
    inputs: {
      "石灰岩": 1
    },
    outputs: {
      "盐堆": 1
    }
  },
  {
    recipe_id: "recipe_0070",
    recipe_name: "1原油+1树脂->1汽油",
    inputs: {
      "原油": 1,
      "树脂": 1
    },
    outputs: {
      "汽油": 1
    }
  },
  {
    recipe_id: "recipe_0071",
    recipe_name: "1棉花植物->3棉籽+1棉花",
    inputs: {
      "棉花植物": 1
    },
    outputs: {
      "棉籽": 3,
      "棉花": 1
    }
  },
  {
    recipe_id: "recipe_0072",
    recipe_name: "2棉籽->1植物油+2纤维",
    inputs: {
      "棉籽": 2
    },
    outputs: {
      "植物油": 1,
      "纤维": 2
    }
  },
  {
    recipe_id: "recipe_0073",
    recipe_name: "1药草->3浆果+4药草叶",
    inputs: {
      "药草": 1
    },
    outputs: {
      "浆果": 3,
      "药草叶": 4
    }
  },
  {
    recipe_id: "recipe_0074",
    recipe_name: "1小麦植物->3小麦+2稻草",
    inputs: {
      "小麦植物": 1
    },
    outputs: {
      "小麦": 3,
      "稻草": 2
    }
  },
  {
    recipe_id: "recipe_0075",
    recipe_name: "1沙子+1水->1粘土",
    inputs: {
      "沙子": 1,
      "水": 1
    },
    outputs: {
      "粘土": 1
    }
  },
  {
    recipe_id: "recipe_0076",
    recipe_name: "1树脂+1原油->1塑料颗粒",
    inputs: {
      "树脂": 1,
      "原油": 1
    },
    outputs: {
      "塑料颗粒": 1
    }
  },
  {
    recipe_id: "recipe_0077",
    recipe_name: "1原油+3电解液->2碳酸盐",
    inputs: {
      "原油": 1,
      "电解液": 3
    },
    outputs: {
      "碳酸盐": 2
    }
  },
  {
    recipe_id: "recipe_0078",
    recipe_name: "3水+1盐堆->1电解液",
    inputs: {
      "水": 3,
      "盐堆": 1
    },
    outputs: {
      "电解液": 1
    }
  },
  {
    recipe_id: "recipe_0079",
    recipe_name: "2水泥+1水+3鹅卵石->2混凝土",
    inputs: {
      "水泥": 2,
      "水": 1,
      "鹅卵石": 3
    },
    outputs: {
      "混凝土": 2
    }
  },
  {
    recipe_id: "recipe_0080",
    recipe_name: "16树脂+1碳酸盐+2汽油->1胶水",
    inputs: {
      "树脂": 16,
      "碳酸盐": 1,
      "汽油": 2
    },
    outputs: {
      "胶水": 1
    }
  },
  {
    recipe_id: "recipe_0081",
    recipe_name: "1氯+16煤粉->4火药",
    inputs: {
      "氯": 1,
      "煤粉": 16
    },
    outputs: {
      "火药": 4
    }
  },
  {
    recipe_id: "recipe_0082",
    recipe_name: "5火药+4肥料->1TNT炸药",
    inputs: {
      "火药": 5,
      "肥料": 4
    },
    outputs: {
      "TNT炸药": 1
    }
  },
  {
    recipe_id: "recipe_0083",
    recipe_name: "3面粉+6水+1盐堆->4面团",
    inputs: {
      "面粉": 3,
      "水": 6,
      "盐堆": 1
    },
    outputs: {
      "面团": 4
    }
  },
  {
    recipe_id: "recipe_0084",
    recipe_name: "2碳酸盐+5水->1苏打",
    inputs: {
      "碳酸盐": 2,
      "水": 5
    },
    outputs: {
      "苏打": 1
    }
  },
  {
    recipe_id: "recipe_0085",
    recipe_name: "1醋+1天然香精->解毒剂",
    inputs: {
      "醋": 1,
      "天然香精": 1
    },
    outputs: {
      "解毒剂": 1
    }
  },
  {
    recipe_id: "recipe_0086",
    recipe_name: "20砖+6钢梁+5防弹盾牌->1便携掩体",
    inputs: {
      "砖": 20,
      "钢梁": 6,
      "防弹盾牌": 5
    },
    outputs: {
      "便携掩体": 1
    }
  },
  {
    recipe_id: "recipe_0087",
    recipe_name: "5砖+2混凝土+1窗框->1庇护所",
    inputs: {
      "砖": 5,
      "混凝土": 2,
      "窗框": 1
    },
    outputs: {
      "庇护所": 1
    }
  },
  {
    recipe_id: "recipe_0088",
    recipe_name: "3钢锭+1混凝土->2钢梁",
    inputs: {
      "钢锭": 3,
      "混凝土": 1
    },
    outputs: {
      "钢梁": 2
    }
  },
  {
    recipe_id: "recipe_0089",
    recipe_name: "12钢梁+6螺栓+1夜视仪->1瞭望塔",
    inputs: {
      "钢梁": 12,
      "螺栓": 6,
      "夜视仪": 1
    },
    outputs: {
      "瞭望塔": 1
    }
  },
  {
    recipe_id: "recipe_0090",
    recipe_name: "2玻璃板+5硅->2窗框",
    inputs: {
      "玻璃板": 2,
      "硅": 5
    },
    outputs: {
      "窗框": 2
    }
  },
  {
    recipe_id: "recipe_0091",
    recipe_name: "4碳酸盐+3粘土+1树脂->5粉末试剂+1污泥",
    inputs: {
      "碳酸盐": 4,
      "粘土": 3,
      "树脂": 1
    },
    outputs: {
      "粉末试剂": 5,
      "污泥": 1
    }
  },
  {
    recipe_id: "recipe_0092",
    recipe_name: "1鹅卵石+1原油+1碳酸盐->1氯+1肥料+1污泥",
    inputs: {
      "鹅卵石": 1,
      "原油": 1,
      "碳酸盐": 1
    },
    outputs: {
      "氯": 1,
      "肥料": 1,
      "污泥": 1
    }
  },
  {
    recipe_id: "recipe_0093",
    recipe_name: "1天然香精+3粉末试剂+5药草叶->1抗生素药丸+1污泥",
    inputs: {
      "天然香精": 1,
      "粉末试剂": 3,
      "药草叶": 5
    },
    outputs: {
      "抗生素药丸": 1,
      "污泥": 1
    }
  },
  {
    recipe_id: "recipe_0094",
    recipe_name: "1氯+12水+1粉末试剂->2液体试剂+2污泥",
    inputs: {
      "氯": 1,
      "水": 12,
      "粉末试剂": 1
    },
    outputs: {
      "液体试剂": 2,
      "污泥": 2
    }
  },
  {
    recipe_id: "recipe_0095",
    recipe_name: "1蘑菇+1酸+1粉末试剂->1止痛药+1污泥",
    inputs: {
      "蘑菇": 1,
      "酸": 1,
      "粉末试剂": 1
    },
    outputs: {
      "止痛药": 1,
      "污泥": 1
    }
  },
  {
    recipe_id: "recipe_0096",
    recipe_name: "1棉籽+20水+1肥料->1棉花植物",
    inputs: {
      "棉籽": 1,
      "水": 20,
      "肥料": 1
    },
    outputs: {
      "棉花植物": 1
    }
  },
  {
    recipe_id: "recipe_0097",
    recipe_name: "1浆果+2肥料+30水->1药草",
    inputs: {
      "浆果": 1,
      "肥料": 2,
      "水": 30
    },
    outputs: {
      "药草": 1
    }
  },
  {
    recipe_id: "recipe_0098",
    recipe_name: "1小麦+25水+3肥料->1小麦植物",
    inputs: {
      "小麦": 1,
      "水": 25,
      "肥料": 3
    },
    outputs: {
      "小麦植物": 1
    }
  },
  {
    recipe_id: "recipe_0099",
    recipe_name: "10电解液+1线圈+5塑料薄板->2电容器",
    inputs: {
      "电解液": 10,
      "线圈": 1,
      "塑料薄板": 5
    },
    outputs: {
      "电容器": 2
    }
  },
  {
    recipe_id: "recipe_0100",
    recipe_name: "1透镜+4线圈+1铜薄板->1二极管",
    inputs: {
      "透镜": 1,
      "线圈": 4,
      "铜薄板": 1
    },
    outputs: {
      "二极管": 1
    }
  },
  {
    recipe_id: "recipe_0101",
    recipe_name: "1轴+3线圈+2钢外壳->2电磁铁",
    inputs: {
      "轴": 1,
      "线圈": 3,
      "钢外壳": 2
    },
    outputs: {
      "电磁铁": 2
    }
  },
  {
    recipe_id: "recipe_0102",
    recipe_name: "1电磁铁+4轴+1钢外壳->1引擎",
    inputs: {
      "电磁铁": 1,
      "轴": 4,
      "钢外壳": 1
    },
    outputs: {
      "引擎": 1
    }
  },
  {
    recipe_id: "recipe_0103",
    recipe_name: "3线圈+1青铜薄板+2塑料板->2保险丝",
    inputs: {
      "线圈": 3,
      "青铜薄板": 1,
      "塑料板": 2
    },
    outputs: {
      "保险丝": 2
    }
  },
  {
    recipe_id: "recipe_0104",
    recipe_name: "3铁齿轮+1轴承+1青铜外壳->1变速箱",
    inputs: {
      "铁齿轮": 3,
      "轴承": 1,
      "青铜外壳": 1
    },
    outputs: {
      "变速箱": 1
    }
  },
  {
    recipe_id: "recipe_0105",
    recipe_name: "1变速箱+1轴承+1电磁铁->1陀螺仪",
    inputs: {
      "变速箱": 1,
      "轴承": 1,
      "电磁铁": 1
    },
    outputs: {
      "陀螺仪": 1
    }
  },
  {
    recipe_id: "recipe_0106",
    recipe_name: "2管道+1硅晶圆+1钢外壳->1散热片",
    inputs: {
      "管道": 2,
      "硅晶圆": 1,
      "钢外壳": 1
    },
    outputs: {
      "散热片": 1
    }
  },
  {
    recipe_id: "recipe_0107",
    recipe_name: "5玻璃棒+1钻石+2石英->3透镜",
    inputs: {
      "玻璃棒": 5,
      "钻石": 1,
      "石英": 2
    },
    outputs: {
      "透镜": 3
    }
  },
  {
    recipe_id: "recipe_0108",
    recipe_name: "3管道+4透镜+1铁齿轮->1单筒望远镜",
    inputs: {
      "管道": 3,
      "透镜": 4,
      "铁齿轮": 1
    },
    outputs: {
      "单筒望远镜": 1
    }
  },
  {
    recipe_id: "recipe_0109",
    recipe_name: "1电容器+1电池->1振荡器",
    inputs: {
      "电容器": 1,
      "电池": 1
    },
    outputs: {
      "振荡器": 1
    }
  },
  {
    recipe_id: "recipe_0110",
    recipe_name: "2青铜外壳+3电解液+2石墨->1电池",
    inputs: {
      "青铜外壳": 2,
      "电解液": 3,
      "石墨": 2
    },
    outputs: {
      "电池": 1
    }
  },
  {
    recipe_id: "recipe_0111",
    recipe_name: "4钢薄板+1钢棒+4螺栓->1螺旋桨",
    inputs: {
      "钢薄板": 4,
      "钢棒": 1,
      "螺栓": 4
    },
    outputs: {
      "螺旋桨": 1
    }
  },
  {
    recipe_id: "recipe_0112",
    recipe_name: "2线圈+3陶瓷+2塑料颗粒->1电阻器",
    inputs: {
      "线圈": 2,
      "陶瓷": 3,
      "塑料颗粒": 2
    },
    outputs: {
      "电阻器": 1
    }
  },
  {
    recipe_id: "recipe_0113",
    recipe_name: "1透镜+1保险丝+3螺栓->1传感器",
    inputs: {
      "透镜": 1,
      "保险丝": 1,
      "螺栓": 3
    },
    outputs: {
      "传感器": 1
    }
  },
  {
    recipe_id: "recipe_0114",
    recipe_name: "12硅+3青铜薄板+30树脂->2硅晶圆",
    inputs: {
      "硅": 12,
      "青铜薄板": 3,
      "树脂": 30
    },
    outputs: {
      "硅晶圆": 2
    }
  },
  {
    recipe_id: "recipe_0115",
    recipe_name: "1传感器+3散热片+1电阻器->1温度传感器",
    inputs: {
      "传感器": 1,
      "散热片": 3,
      "电阻器": 1
    },
    outputs: {
      "温度传感器": 1
    }
  },
  {
    recipe_id: "recipe_0116",
    recipe_name: "3管道+1轴->1中型维修套件",
    inputs: {
      "管道": 3,
      "轴": 1
    },
    outputs: {
      "中型维修套件": 1
    }
  },
  {
    recipe_id: "recipe_0117",
    recipe_name: "1氯+2电解液+1液体试剂->1酸",
    inputs: {
      "氯": 1,
      "电解液": 2,
      "液体试剂": 1
    },
    outputs: {
      "酸": 1
    }
  },
  {
    recipe_id: "recipe_0118",
    recipe_name: "1液体试剂+5植物油->1天然香精",
    inputs: {
      "液体试剂": 1,
      "植物油": 5
    },
    outputs: {
      "天然香精": 1
    }
  },
  {
    recipe_id: "recipe_0119",
    recipe_name: "8粉末试剂+1啤酒+1面团->1益生菌药丸",
    inputs: {
      "粉末试剂": 8,
      "啤酒": 1,
      "面团": 1
    },
    outputs: {
      "益生菌药丸": 1
    }
  },
  {
    recipe_id: "recipe_0120",
    recipe_name: "5稻草->1羊毛",
    inputs: {
      "稻草": 5
    },
    outputs: {
      "羊毛": 1
    }
  },
  {
    recipe_id: "recipe_0121",
    recipe_name: "16树脂->1蘑菇",
    inputs: {
      "树脂": 16
    },
    outputs: {
      "蘑菇": 1
    }
  },
  {
    recipe_id: "recipe_0122",
    recipe_name: "1羊毛针织+10钢板->1防弹背心",
    inputs: {
      "羊毛针织": 1,
      "钢板": 10
    },
    outputs: {
      "防弹背心": 1
    }
  },
  {
    recipe_id: "recipe_0123",
    recipe_name: "1羊毛针织+20煤粉->1伪装网",
    inputs: {
      "羊毛针织": 1,
      "煤粉": 20
    },
    outputs: {
      "伪装网": 1
    }
  },
  {
    recipe_id: "recipe_0124",
    recipe_name: "2棉纱->1棉织品",
    inputs: {
      "棉纱": 2
    },
    outputs: {
      "棉织品": 1
    }
  },
  {
    recipe_id: "recipe_0125",
    recipe_name: "3棉花+1氯->1棉纱",
    inputs: {
      "棉花": 3,
      "氯": 1
    },
    outputs: {
      "棉纱": 1
    }
  },
  {
    recipe_id: "recipe_0126",
    recipe_name: "2稻草纱线->1稻草织物",
    inputs: {
      "稻草纱线": 2
    },
    outputs: {
      "稻草织物": 1
    }
  },
  {
    recipe_id: "recipe_0127",
    recipe_name: "3稻草+1氯->1稻草纱线",
    inputs: {
      "稻草": 3,
      "氯": 1
    },
    outputs: {
      "稻草纱线": 1
    }
  },
  {
    recipe_id: "recipe_0128",
    recipe_name: "1羊毛针织+16硅->1战术背心",
    inputs: {
      "羊毛针织": 1,
      "硅": 16
    },
    outputs: {
      "战术背心": 1
    }
  },
  {
    recipe_id: "recipe_0129",
    recipe_name: "2羊毛纱线->1羊毛针织",
    inputs: {
      "羊毛纱线": 2
    },
    outputs: {
      "羊毛针织": 1
    }
  },
  {
    recipe_id: "recipe_0130",
    recipe_name: "2羊毛+1氯->1羊毛纱线",
    inputs: {
      "羊毛": 2,
      "氯": 1
    },
    outputs: {
      "羊毛纱线": 1
    }
  },
  {
    recipe_id: "recipe_0131",
    recipe_name: "2浆果+6水->1酒精",
    inputs: {
      "浆果": 2,
      "水": 6
    },
    outputs: {
      "酒精": 1
    }
  },
  {
    recipe_id: "recipe_0132",
    recipe_name: "3小麦+2苏打+1瓶子->1啤酒",
    inputs: {
      "小麦": 3,
      "苏打": 2,
      "瓶子": 1
    },
    outputs: {
      "啤酒": 1
    }
  },
  {
    recipe_id: "recipe_0133",
    recipe_name: "3液体试剂+1浆果->2利口酒香精",
    inputs: {
      "液体试剂": 3,
      "浆果": 1
    },
    outputs: {
      "利口酒香精": 2
    }
  },
  {
    recipe_id: "recipe_0134",
    recipe_name: "2果汁+1酒精+1瓶子->1藤蔓",
    inputs: {
      "果汁": 2,
      "酒精": 1,
      "瓶子": 1
    },
    outputs: {
      "藤蔓": 1
    }
  },
  {
    recipe_id: "recipe_0135",
    recipe_name: "1果汁+1酸+1瓶子->1醋",
    inputs: {
      "果汁": 1,
      "酸": 1,
      "瓶子": 1
    },
    outputs: {
      "醋": 1
    }
  },
  {
    recipe_id: "recipe_0136",
    recipe_name: "1面团->1面包",
    inputs: {
      "面团": 1
    },
    outputs: {
      "面包": 1
    }
  },
  {
    recipe_id: "recipe_0137",
    recipe_name: "1面团+1浆果->1蛋糕",
    inputs: {
      "面团": 1,
      "浆果": 1
    },
    outputs: {
      "蛋糕": 1
    }
  },
  {
    recipe_id: "recipe_0138",
    recipe_name: "1面团+3水+1蘑菇+1盐堆->1汤",
    inputs: {
      "面团": 1,
      "水": 3,
      "蘑菇": 1,
      "盐堆": 1
    },
    outputs: {
      "汤": 1
    }
  },
  {
    recipe_id: "recipe_0139",
    recipe_name: "2防弹盾牌+3步枪+2冲锋枪->1高射炮",
    inputs: {
      "防弹盾牌": 2,
      "步枪": 3,
      "冲锋枪": 2
    },
    outputs: {
      "高射炮": 1
    }
  },
  {
    recipe_id: "recipe_0140",
    recipe_name: "1发条箱+1轨道炮+4激光瞄准器->1自动炮塔",
    inputs: {
      "发条箱": 1,
      "轨道炮": 1,
      "激光瞄准器": 4
    },
    outputs: {
      "自动炮塔": 1
    }
  },
  {
    recipe_id: "recipe_0141",
    recipe_name: "10铁齿轮+1冲锋枪+8弹匣->1加特林机枪",
    inputs: {
      "铁齿轮": 10,
      "冲锋枪": 1,
      "弹匣": 8
    },
    outputs: {
      "加特林机枪": 1
    }
  },
  {
    recipe_id: "recipe_0142",
    recipe_name: "1TNT炸药+6弹片+1铁外壳->1手榴弹",
    inputs: {
      "TNT炸药": 1,
      "弹片": 6,
      "铁外壳": 1
    },
    outputs: {
      "手榴弹": 1
    }
  },
  {
    recipe_id: "recipe_0143",
    recipe_name: "1迫击炮+3激光瞄准器->1跟踪导弹",
    inputs: {
      "迫击炮": 1,
      "激光瞄准器": 3
    },
    outputs: {
      "跟踪导弹": 1
    }
  },
  {
    recipe_id: "recipe_0144",
    recipe_name: "1TNT炸药+2钢板+1青铜外壳->1地雷",
    inputs: {
      "TNT炸药": 1,
      "钢板": 2,
      "青铜外壳": 1
    },
    outputs: {
      "地雷": 1
    }
  },
  {
    recipe_id: "recipe_0145",
    recipe_name: "2管道+3铁外壳+3手榴弹->1迫击炮",
    inputs: {
      "管道": 2,
      "铁外壳": 3,
      "手榴弹": 3
    },
    outputs: {
      "迫击炮": 1
    }
  },
  {
    recipe_id: "recipe_0146",
    recipe_name: "1跟踪导弹+3电击枪->1脉冲炸弹",
    inputs: {
      "跟踪导弹": 1,
      "电击枪": 3
    },
    outputs: {
      "脉冲炸弹": 1
    }
  },
  {
    recipe_id: "recipe_0147",
    recipe_name: "1加特林机枪+6电磁铁+4电池->1轨道炮",
    inputs: {
      "加特林机枪": 1,
      "电磁铁": 6,
      "电池": 4
    },
    outputs: {
      "轨道炮": 1
    }
  },
  {
    recipe_id: "recipe_0148",
    recipe_name: "1管道+1透镜+1弹匣->1步枪",
    inputs: {
      "管道": 1,
      "透镜": 1,
      "弹匣": 1
    },
    outputs: {
      "步枪": 1
    }
  },
  {
    recipe_id: "recipe_0149",
    recipe_name: "2管道+1钢外壳+16弹匣->1冲锋枪",
    inputs: {
      "管道": 2,
      "钢外壳": 1,
      "弹匣": 16
    },
    outputs: {
      "冲锋枪": 1
    }
  },
  {
    recipe_id: "recipe_0150",
    recipe_name: "1棉织品+1止痛药->1绷带",
    inputs: {
      "棉织品": 1,
      "止痛药": 1
    },
    outputs: {
      "绷带": 1
    }
  },
  {
    recipe_id: "recipe_0151",
    recipe_name: "1棉织品+1稻草纱线->1手套",
    inputs: {
      "棉织品": 1,
      "稻草纱线": 1
    },
    outputs: {
      "手套": 1
    }
  },
  {
    recipe_id: "recipe_0152",
    recipe_name: "1棉织品+1稻草织物->1帽子",
    inputs: {
      "棉织品": 1,
      "稻草织物": 1
    },
    outputs: {
      "帽子": 1
    }
  },
  {
    recipe_id: "recipe_0153",
    recipe_name: "1棉织品+14氯->1白大褂",
    inputs: {
      "棉织品": 1,
      "氯": 14
    },
    outputs: {
      "白大褂": 1
    }
  },
  {
    recipe_id: "recipe_0154",
    recipe_name: "1稻草织物+1帽子+5药草叶->1医用口罩",
    inputs: {
      "稻草织物": 1,
      "帽子": 1,
      "药草叶": 5
    },
    outputs: {
      "医用口罩": 1
    }
  },
  {
    recipe_id: "recipe_0155",
    recipe_name: "1防弹背心+2战术背心->1军装",
    inputs: {
      "防弹背心": 1,
      "战术背心": 2
    },
    outputs: {
      "军装": 1
    }
  },
  {
    recipe_id: "recipe_0156",
    recipe_name: "1白大褂+2伪装网->1童子军服饰",
    inputs: {
      "白大褂": 1,
      "伪装网": 2
    },
    outputs: {
      "童子军服饰": 1
    }
  },
  {
    recipe_id: "recipe_0157",
    recipe_name: "1手套+1抗生素药丸->1无菌手套",
    inputs: {
      "手套": 1,
      "抗生素药丸": 1
    },
    outputs: {
      "无菌手套": 1
    }
  },
  {
    recipe_id: "recipe_0158",
    recipe_name: "1战术背心+1白大褂+1手套->1工人制服",
    inputs: {
      "战术背心": 1,
      "白大褂": 1,
      "手套": 1
    },
    outputs: {
      "工人制服": 1
    }
  },
  {
    recipe_id: "recipe_0159",
    recipe_name: "4钢棒+4螺栓->1底盘",
    inputs: {
      "钢棒": 4,
      "螺栓": 4
    },
    outputs: {
      "底盘": 1
    }
  },
  {
    recipe_id: "recipe_0160",
    recipe_name: "2变速箱+1支撑架+1游标卡尺->1发条箱",
    inputs: {
      "变速箱": 2,
      "支撑架": 1,
      "游标卡尺": 1
    },
    outputs: {
      "发条箱": 1
    }
  },
  {
    recipe_id: "recipe_0161",
    recipe_name: "2侦察无人机+1大型维修套件+4钢板->1无人机站",
    inputs: {
      "侦察无人机": 2,
      "大型维修套件": 1,
      "钢板": 4
    },
    outputs: {
      "无人机站": 1
    }
  },
  {
    recipe_id: "recipe_0162",
    recipe_name: "1机动装置+1电击枪+1导航仪->1外骨骼套装",
    inputs: {
      "机动装置": 1,
      "电击枪": 1,
      "导航仪": 1
    },
    outputs: {
      "外骨骼套装": 1
    }
  },
  {
    recipe_id: "recipe_0163",
    recipe_name: "1发条箱+40铜线+1陀螺仪->1机动装置",
    inputs: {
      "发条箱": 1,
      "铜线": 40,
      "陀螺仪": 1
    },
    outputs: {
      "机动装置": 1
    }
  },
  {
    recipe_id: "recipe_0164",
    recipe_name: "1无人机站+1轨道炮+6底盘->1军用无人机",
    inputs: {
      "无人机站": 1,
      "轨道炮": 1,
      "底盘": 6
    },
    outputs: {
      "军用无人机": 1
    }
  },
  {
    recipe_id: "recipe_0165",
    recipe_name: "1游标卡尺+1单筒望远镜+1减震器->1大型维修套件",
    inputs: {
      "游标卡尺": 1,
      "单筒望远镜": 1,
      "减震器": 1
    },
    outputs: {
      "大型维修套件": 1
    }
  },
  {
    recipe_id: "recipe_0166",
    recipe_name: "4螺旋桨+1引擎+1陀螺仪->1侦察无人机",
    inputs: {
      "螺旋桨": 4,
      "引擎": 1,
      "陀螺仪": 1
    },
    outputs: {
      "侦察无人机": 1
    }
  },
  {
    recipe_id: "recipe_0167",
    recipe_name: "3弹簧+1钢棒->1减震器",
    inputs: {
      "弹簧": 3,
      "钢棒": 1
    },
    outputs: {
      "减震器": 1
    }
  },
  {
    recipe_id: "recipe_0168",
    recipe_name: "2减震器+1变速箱->2支撑架",
    inputs: {
      "减震器": 2,
      "变速箱": 1
    },
    outputs: {
      "支撑架": 2
    }
  },
  {
    recipe_id: "recipe_0169",
    recipe_name: "3无线电+2雷达+1显示器->1警报装置",
    inputs: {
      "无线电": 3,
      "雷达": 2,
      "显示器": 1
    },
    outputs: {
      "警报装置": 1
    }
  },
  {
    recipe_id: "recipe_0170",
    recipe_name: "1电容器+2青铜薄板+5塑料薄板->1电路板",
    inputs: {
      "电容器": 1,
      "青铜薄板": 2,
      "塑料薄板": 5
    },
    outputs: {
      "电路板": 1
    }
  },
  {
    recipe_id: "recipe_0171",
    recipe_name: "2二极管+1电路板->1显示器",
    inputs: {
      "二极管": 2,
      "电路板": 1
    },
    outputs: {
      "显示器": 1
    }
  },
  {
    recipe_id: "recipe_0172",
    recipe_name: "1处理器+2电路板+1无线电->2导航仪",
    inputs: {
      "处理器": 1,
      "电路板": 2,
      "无线电": 1
    },
    outputs: {
      "导航仪": 2
    }
  },
  {
    recipe_id: "recipe_0173",
    recipe_name: "1温度传感器+1电路板+1硅晶圆->1处理器",
    inputs: {
      "温度传感器": 1,
      "电路板": 1,
      "硅晶圆": 1
    },
    outputs: {
      "处理器": 1
    }
  },
  {
    recipe_id: "recipe_0174",
    recipe_name: "1处理器+1振荡器+1显示器->2雷达",
    inputs: {
      "处理器": 1,
      "振荡器": 1,
      "显示器": 1
    },
    outputs: {
      "雷达": 2
    }
  },
  {
    recipe_id: "recipe_0175",
    recipe_name: "1振荡器+1二极管+1电路板->1无线电",
    inputs: {
      "振荡器": 1,
      "二极管": 1,
      "电路板": 1
    },
    outputs: {
      "无线电": 1
    }
  },
  {
    recipe_id: "recipe_0176",
    recipe_name: "1发条箱+8支撑架+1雷达->1机械臂",
    inputs: {
      "发条箱": 1,
      "支撑架": 8,
      "雷达": 1
    },
    outputs: {
      "机械臂": 1
    }
  },
  {
    recipe_id: "recipe_0177",
    recipe_name: "2电阻器+3电池+2塑料薄板->1电击枪",
    inputs: {
      "电阻器": 2,
      "电池": 3,
      "塑料薄板": 2
    },
    outputs: {
      "电击枪": 1
    }
  }
];

window.recipe_database = recipe_database;

