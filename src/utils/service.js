// eslint-disable-next-line no-unused-vars
import { ajax } from "@/util/index"

export let getFLowList = (data) => {
    let url = "/FlowSchemes/getFlowList"
    var config = {
        method: "post",
        data,
        url,
    }
    return ajax(config)
}

/**
 * 通用跨域接口 外部接口中转
 * @param {} options
 */
export let GetXingCheReZhiByTruckDoc = (data) => {
    let url = "/auth/FunctionUrlMidto"
    var config = {
        method: "post",
        data,
        url,
    }
    return ajax(config)
}

// ========================= 目标管理 Start =========================
/**
 * 目标管理-运行情况
 * @param {} options
 */
export let LoadMubiaoYunxingList = (data) => {
    let url = "/MuBiao/LoadMubiaoYunxingList"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

// ========================= 目标管理 End =========================

// 通用列表(导出)
export let exportExcel = (params) => {
    let url = "/excel/exportExcel"
    var config = {
        method: "post",
        url,
        data: params,
        responseType: "blob",
    }
    return ajax(config)
}

/**
 * 列表
 * @param {} options
 */
export let loadClearList = (data) => {
    // if (process.env.NODE_ENV === 'development') {
    //   debugger
    //   return Promise.resolve()
    // }
    let url = "/CommonFunction/loadList"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 通用查询_不用翻译 ---- 列表返回下拉id
 * @param {} options
 */
export let loadListInfo = (data) => {
    let url = "/CommonFunction/loadListInfo"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 单个保存(通用)
 * @param {} options
 */
export let saveRukuData = (data) => {
    let url = "/CommonFunction/AddSaveEventFromInfoList"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 批量保存 结构
 *  {
 *    "tableName": "string",
 *    "id": "string",
 *    "datajsons": [
 *      {
 *        "property1": {},
 *        "property2": {}
 *      }
 *    ]
 *  }
 */
export let batchSaveData = (data) => {
    let url = "/CommonFunction/AddSaveEventFromInfoListPT"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 通用编辑/详情
 * @param {} options
 */
export let EditQueryData = (data) => {
    let url = "/CommonFunction/LoadDetailNew"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 启用✅
 * @param {} options
 */
export let universalEnable = (data) => {
    let url = "CommonFunction/enable"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}
/**
 * 禁用⛔️
 * @param {} options
 */
export let universalDelete = (data) => {
    let url = "/CommonFunction/delete"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 *  下拉选项
 * @param {} options
 */
export let getSelectList = (data) => {
    let url = "/CommonFunction/SelectListPs"
    var config = {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url,
        data,
    }
    return ajax(config)
}

/**
 * 通用会议列表
 * @param {} options
 */
export let loadClearListMeeting = (data) => {
    let url = "/WorkOrderQuery/Load"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

// 联动
export function GetJoinDicTypeList(params = {}) {
    return ajax({
        url: "/CommonFunction/GetJoinDicTypeList",
        method: "post",
        params,
    })
}

/**
 * 通用发布通知
 * @param {} options
 */
export let releasingNotices = (data) => {
    let url = "/CommonFunction/SendworkOrderNotice"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}
/**
 * 会议发布通知
 * @param {} options
 */
export let releasingNoticesPC = (data) => {
    let url = "/CommonFunction/SendworkOrderNoticePC"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 通用发布通知
 * @param {} options
 */
export let luokuan = (data) => {
    let url = "/CommonFunction/luokuan"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}

/**
 * 待阅通知是否显示确认按钮
 * @param {} options
 */
export let NoticeHaveQr = (params) => {
    let paramsAll = {
        id: params,
    }
    let url = "/HuiYi/NoticeHaveQr"
    var config = {
        method: "post",
        url,
        params: paramsAll,
    }
    return ajax(config)
}

/**
 * 待阅通知点击确认按钮（确认消息）
 * @param {} options
 */
export let QueRenTo = (params) => {
    let paramsAll = {
        id: params,
    }
    let url = "/WorkOrderQuery/QueRenTo"
    var config = {
        method: "post",
        url,
        params: paramsAll,
    }
    return ajax(config)
}

/**
 * 下载模板
 * @param {String} fileName  文件名称
 */
export let excel_download = (params) => {
    let paramsAll = {
        fileName: params,
    }
    let url = "/excel/download"
    var config = {
        method: "get",
        url,
        params: paramsAll,
        responseType: "blob",
    }
    return ajax(config)
}

/**
 * 应急管控_导入
 * @param {*} type  文件类型
 * @param {file} file  文件流
 */
export let fengxianguankong_importFengxianData = (params) => {
    let url = "/ZhuangbeiGuanli/importFengxianData"
    var config = {
        method: "post",
        url,
        params,
    }
    return ajax(config)
}

/**
 * PC 我的工作（待办事项）
 * @param {} options
 */
export let LoadWorkOrderList = (data) => {
    let url = "/WorkOrderQuery/LoadWorkOrderList"
    var config = {
        method: "post",
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        url,
        data,
    }
    return ajax(config)
}

/**
 * 完成作业票信息
 */
export let wanchengZuoye = (data) => {
    let url = "/ZuoyeManger/wanchengZuoye"
    var config = {
        method: "post",
        url,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    return ajax(config)
}

/**
 * 安全费用明细(详情)
 */
export let getAnquanfeiyongDetail = (data) => {
    let url = "/ZhuangbeiGuanli/getAnquanfeiyongDetail"
    var config = {
        method: "post",
        url,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    return ajax(config)
}

// 获取角色
export let getUser = (userId) => {
    let url = "/system/user/" + userId
    var config = {
        method: "get",
        url,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    return ajax(config)
}

// 获取车队
export let getChedui = () => {
    let url = "/ZhuangbeiGuanli/SelPubByTypeList"
    var config = {
        method: "post",
        url,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    return ajax(config)
}
// 会议作废
export let meetingcancel = (id) => {
    let url = "/meeting/cancel/" + id
    var config = {
        method: "post",
        url,
    }
    return ajax(config)
}
// 会议延期
export let meetingverb = (data) => {
    let url = "/meeting/verb"
    var config = {
        method: "post",
        url,
        data,
    }
    return ajax(config)
}
