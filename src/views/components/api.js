let mockFlowDetial = Object.assign(
    {
        "id": "",
        "SchemeName": "默认流程名称",
        "FrmId": "flowschemeType_feiyongbaoxiao1",
        "SchemeCanUser": "[{\"CompanyCode\":\"D01D001\",\"Bumen\":[\"D01D003\",\"D01D004\",\"D01D005\",\"D01D006\"]}]",
        "SchemeContent": "{\"nodeList\":[{\"id\":\"ex6wzepfm9400\",\"type\":\"start\",\"name\":\"开始\",\"top\":\"260px\",\"left\":\"160px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"\",\"T_Operation\":\"\",\"T_Val\":\"\"}],\"type\":\"selectByUser\",\"user\":\"\",\"role\":\"\"}]},{\"id\":\"3iss2hnwa76000\",\"type\":\"node\",\"name\":\"审批节点\",\"top\":\"280px\",\"left\":\"460px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"flowschemeType_qingjia\",\"T_Operation\":\"=\",\"T_Val\":\"3\"},{\"T_FieldName\":\"flowschemeType_feiyongbaoxiao1\",\"T_Operation\":\">\",\"T_Val\":\"200\"}],\"type\":\"selectByUser\",\"user\":\"1789972348664713216,1789972347297370112,1737304024684642304,1789972349172224000\",\"role\":\"\"}]},{\"id\":\"2x35rbrdjqq000\",\"type\":\"end\",\"name\":\"结束\",\"top\":\"320px\",\"left\":\"720px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"\",\"T_Operation\":\"\",\"T_Val\":\"\"}],\"type\":\"selectByUser\",\"user\":\"\",\"role\":\"\"}]}],\"lineList\":[{\"from\":\"ex6wzepfm9400\",\"to\":\"3iss2hnwa76000\",\"label\":\"连线名称\",\"id\":\"3ki604jbq9w000\",\"Remark\":\"\"},{\"from\":\"3iss2hnwa76000\",\"to\":\"2x35rbrdjqq000\",\"label\":\"连线名称\",\"id\":\"43ypyzgv4cu000\",\"Remark\":\"\"}]}",
        "Disabled": "0"
    },
    { "id": "1824479834293542912" },
)

/**
 * 获取流程明细
 * @param {String} flowId 流程Id
 * @returns 
 */
export let getFlowDetial = (flowId) => {
    console.log('Flow Id: ', flowId)
    return Promise.resolve(mockFlowDetial)
}