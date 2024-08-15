
export let getUserList = () => {
    return Promise.resolve([
        {
            label: "钟生",
            value: "00001111",
        },
        {
            label: "李生",
            value: "00002222",
        },
    ]);
}

export let getRoleList = () => {
    return Promise.resolve([
        {
            label: "总经理",
            value: "99991111",
        },
        {
            label: "运营部长",
            value: "99992222",
        },
    ]);
}

export let getBumenList = () => {
    return Promise.resolve([
        {
            label: "行政部",
            value: "111",
        },
        {
            label: "销售部",
            value: "222",
        },
        {
            label: "研发部",
            value: "333",
        },
    ])
}

export let getCompanyCodeList = () => {
    return Promise.resolve([
        {
            label: "品易智联",
            value: "company-111",
        },
        {
            label: "测试公司",
            value: "company-222",
        }
    ])
}

export let getCustomList = () => {
    return Promise.resolve([
        {
            label: "消费金额",
            value: "c-01",
        },
        {
            label: "发票额",
            value: "c-02",
        }
    ])
}

let mockFlowDetial = { "title": "流程名称", "nodeList": [{ "id": "2kazl88r91i000", "type": "start", "name": "开始", "top": "480px", "left": "440px", "setInfoList": [{ "whereStr": [{ "flag": "", "T_FieldName": "", "T_Operation": "", "T_Val": "" }], "type": "selectByUser", "user": "", "role": "" }] }, { "id": "1zxnkdc88kps00", "type": "node", "name": "审批节点", "top": "420px", "left": "700px", "setInfoList": [{ "whereStr": [{ "flag": "CompanyCode", "T_FieldName": "CompanyCode", "T_Operation": "=", "T_Val": "zuzhi=company-111&bumen=111" }, { "flag": "CompanyCode", "T_FieldName": "CompanyCode", "T_Operation": "=", "T_Val": "zuzhi=company-222" }, { "flag": "C01", "T_FieldName": "C01", "T_Operation": ">", "T_Val": "200" }], "type": "selectByUser", "user": "00001111,00002222", "role": "" }] }, { "id": "3e4wpcltvxs000", "type": "node", "name": "审批节点", "top": "260px", "left": "1040px", "setInfoList": [{ "whereStr": [{ "flag": "CompanyCode", "T_FieldName": "CompanyCode", "T_Operation": "=", "T_Val": "zuzhi=company-222&bumen=222" }], "type": "selectByUser", "user": "00002222", "role": "" }] }, { "id": "6dwouun6y1000", "type": "end", "name": "结束", "top": "520px", "left": "1380px", "setInfoList": [{ "whereStr": [{ "flag": "", "T_FieldName": "", "T_Operation": "", "T_Val": "" }], "type": "selectByUser", "user": "", "role": "" }] }], "lineList": [{ "from": "2kazl88r91i000", "to": "1zxnkdc88kps00", "label": "连线名称", "id": "28rddrvjffi80", "Remark": "" }, { "from": "1zxnkdc88kps00", "to": "3e4wpcltvxs000", "label": "连线名称", "id": "3d07np3gfw8000", "Remark": "" }, { "from": "3e4wpcltvxs000", "to": "6dwouun6y1000", "label": "连线名称", "id": "idxngft0ahs00", "Remark": "" }] }

/**
 * 获取流程明细
 * @param {String} flowId 流程Id
 * @returns 
 */
export let getFlowDetial = (flowId) => {
    console.log('Flow Id: ', flowId)
    return Promise.resolve(mockFlowDetial)
}

