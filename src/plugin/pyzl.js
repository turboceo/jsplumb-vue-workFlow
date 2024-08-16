import get from "lodash/get"
import set from "lodash/set"
import dayjs from "dayjs"

import { getSelectList } from "@/utils/service"

/**
 * 解析类JSON字符串
 * @param {Object} item 要读取的对象
 * @param {String} prop 要读取的字段
 * @author turbo
 * @date 2023-08-31 11:51
 */
/* eslint-disable no-empty */
let parseJsonLikeStr = (item, prop) => {
  let val = get(item, prop, null)
  if (!val) return []
  // 默认值
  let ret = []
  try {
    ret = JSON.parse(val.replace(/\r\n/g, ""))
  } catch (e) { }
  return ret
}

/**
 * 批量处理类JSON字符串
 * @param {Object} item 要读取的对象
 * @param {String} propList 要读取的字段列表
 * @author turbo
 * @date 2023-08-31 12:00
 */
let batchParseJsonLikeStr = (item, propList) => {
  propList.forEach((prop) => {
    item[prop] = parseJsonLikeStr(item, prop)
  })
}

/**
 * 返回时间_年 字符串
 */
let formatYear = (val, defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).year().toString()
}

/**
 * 返回时间_日期（年-月 单个月）
 */
let formatSingleMonth = (val, dateFormat = "YYYY-M", defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).format(dateFormat)
}

/**
 * 返回时间_日期（年-月）
 */
let formatYears = (val, dateFormat = "YYYY-MM", defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).format(dateFormat)
}

/**
 * 返回时间_时:分
 */
let formatTime = (val, dateFormat = "HH：mm", defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).format(dateFormat)
}
/**
 * 返回时间_时:分:秒
 */
let formatTimemiao = (val, dateFormat = "HH：mm:ss", defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).format(dateFormat)
}

/**
 * 返回时间_日期
 */
let formatDate = (val, dateFormat = "YYYY-MM-DD", defaultVal = null) => {
  if (!val) return defaultVal
  return dayjs(val).format(dateFormat)
}

/**
 * 返回时间_日期（时:分）
 */
let formatDatetime = (val) => {
  return formatDate(val, "YYYY-MM-DD HH:mm")
}

/**
 * 返回时间_日期（时:分:秒）
 */
let formatDatetimes = (val) => {
  return formatDate(val, "YYYY-MM-DD HH:mm:ss")
}

/**
 * 批量获取下拉并处理
 * @param {Array} listOptions 下拉配置列表
 * @param {String} queryOptions 下拉选项对象
 * @param {boolean} true 非必填
 */
let getOptions = function (listOptions, queryOptions = "QueryOptions") {
  let isBool = typeof queryOptions === "boolean"
  let obj = isBool ? this : this[queryOptions]

  // Utils
  let joinComma = (arr) => arr.join(",")
  let optionAdapter = (item) => item.dicTypeID
  let dicTypeIDs = joinComma(listOptions.map(optionAdapter))
  return getSelectList({ dicTypeIDs })
    .then((res) => {
      let dataset = res.data.data || {}
      listOptions.forEach((option) => {
        let val = dataset[option.dicTypeID] || []
        let { adapter, key } = option
        // 是否存在适配器
        let hasAdapter = !!adapter

        let $$val = hasAdapter
          ? val.map(adapter) // 适配数据
          : val

        // Fix: 部份接口返回NAME这样的属性
        let NamePropAdapter = (item) => {
          let obj = {
            ID: item.ID,
            Name: item.Name || item.NAME,
          }
          Object.assign(obj, item)
          return obj
        }
        // 再次适配
        let ret = $$val.map(NamePropAdapter)

        set(obj, key, ret)
      })
    })
    .catch((e) => { })
}

export default {
  install(Vue) {
    Object.assign(Vue.prototype, {
      // 页签操作
      $getOptions: getOptions,
      $parseJsonLikeStr: parseJsonLikeStr,
      $batchParseJsonLikeStr: batchParseJsonLikeStr,
      $formatYear: formatYear,
      $formatSingleMonth: formatSingleMonth,
      $formatYears: formatYears,
      $formatTime: formatTime,
      $formatTimemiao: formatTimemiao,
      $formatDate: formatDate,
      $formatDatetime: formatDatetime,
      $formatDatetimes: formatDatetimes,
    })
  },
}
