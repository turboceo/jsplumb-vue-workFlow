/**
 * SQL插件
 * @date 2023-10-10
 * @author turbo
 */

// // 使用用法
// let queryList = [
//     // 文本输入框
//     $sql.input("name", "turbo"),
//     // 下拉单选
//     $sql.select("name", "xxxxx"),
//     // 下拉多选
//     $sql.mutliSelect("name", ["xxxxx", "yyyy"]),
//     // 数字 & 日期类型
//     $sql.range("d1", [0, 15000]),
//     $sql.range("d2", [null, 15000]),
//     $sql.range("d3", [1, null]),
//     $sql.range("d3", [null, null]),
//     $sql.range("d4", ["2023-10-10", "2023-10-12"]),
// ];

// console.log("log#0 ==>", $sql.toSQL(queryList));
// console.log("log#1 ==>", $sql.toSQL([]));

let isNull = (obj) => obj === null
let joinEmpty = (arr) => arr.join("")

/**
 * 添加前缀
 * @param {String} itemName 表单项名称
 * @returns
 */
let addPrefix = (itemName) => {
  return "a." + itemName
  // return itemName;
}
/**
 * 添加前缀（特殊）
 * @param {String} itemName 表单项名称
 * @returns
 */
let addPrefix_jcx = (itemName) => {
  return "jcx." + itemName
  // return itemName;
}

// 模糊查询相关
let wrapLike = (itemName, itemModel) => {
  let key = addPrefix(itemName)
  return [key, " like ", wrapFunc("%" + itemModel + "%")].join("")
}

// 模糊查询相关（特殊）
let wrapLike_jcx = (itemName, itemModel) => {
  let key = addPrefix_jcx(itemName)
  return [key, " like ", wrapFunc("%" + itemModel + "%")].join("")
}

// SQL一些功能方法
let wrapFunc = (str, shouldInsertQuotationMarks = true) => {
  // 两边的字符串
  let sideString = shouldInsertQuotationMarks ? "'" : ""
  return [sideString, str, sideString].join("")
}

// 范围查询相关
let wrapRange = (itemName, itemModel) => {
  let [model0, model1] = itemModel

  let key = addPrefix(itemName)

  let leftSQL = isNull(model0)
    ? ""
    : joinEmpty([wrapFunc(model0), ` <= ${key}`])
  let rightSQL = isNull(model1)
    ? ""
    : joinEmpty([`${key} <= `, wrapFunc(model1)])

  // NOTE: 查询条件两边都有值的时候需要使用and子句
  if (!!leftSQL && !!rightSQL) {
    return [leftSQL, " and ", rightSQL].join("")
  }
  return leftSQL || rightSQL
}

// Namespace
let $sql = {}
// 文本类型
$sql.input = wrapLike
// 文本类型（特殊）
$sql.inputJCX = wrapLike_jcx
// 单选
$sql.select = (itemName, itemModel, equal = true) => {
  let key = addPrefix(itemName)
  let operater = equal ? "=" : "!="
  let s = [key, operater, wrapFunc(itemModel)].join("")
  return s
}

// 多选
$sql.mutliSelect = (itemName, itemModel) => {
  let key = addPrefix(itemName)
  let s = [
    "[",
    key,
    "] in (",
    itemModel.map(($m) => wrapFunc($m, true)),
    ")",
  ].join("")
  return s
}

// 范围
$sql.range = wrapRange

$sql.toSQL = (arr) => {
  if (arr.length === 0) {
    arr.push("1=1")
  }

  arr.push("a.IsDelete=0")
  // 过滤空字符串
  return arr.filter(Boolean).join(" and ")
}

$sql.toSQL_del = (arr) => {
  if (arr.length === 0) {
    arr.push("1=1")
  }

  arr.push("a.IsDelete=1")
  // 过滤空字符串
  return arr.filter(Boolean).join(" and ")
}

//首字母大写
$sql.firsttoUpperCase = (arr) => {
  arr.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const newKey = key.slice(0, 1).toUpperCase() + key.slice(1)
      item[newKey] = item[key]
      delete item[key]
    })
  })
}

export {
  $sql
}

export default {
  // 插件安装入库
  install(Vue) {
    Vue.prototype.$sql = $sql
  },
}
