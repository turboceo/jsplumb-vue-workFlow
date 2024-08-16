let mockFlowDetial = { "id": "1824479834293542912", "SchemeName": "dafdafda111111", "FrmId": "flowschemeType_qingjia", "SchemeCanUser": "[{\"CompanyCode\":\"D01D001\",\"Bumen\":[\"D01D003\",\"D01D004\",\"D01D005\"],\"Bumen_Options\":[{\"Id\":\"D01D003\",\"Name\":\"总经办\"},{\"Id\":\"D01D004\",\"Name\":\"财务部\"},{\"Id\":\"D01D005\",\"Name\":\"人事部\"},{\"Id\":\"D01D006\",\"Name\":\"安全部\"},{\"Id\":\"D01D007\",\"Name\":\"运营部\"},{\"Id\":\"D01D008\",\"Name\":\"项目部\"},{\"Id\":\"D01D009\",\"Name\":\"技术部\"},{\"Id\":\"D01D010\",\"Name\":\"产品部\"},{\"Id\":\"D01D011\",\"Name\":\"销售部\"}]}]", "SchemeContent": "{\"nodeList\":[{\"id\":\"4onov0jlpzi000\",\"type\":\"start\",\"name\":\"开始\",\"top\":\"155px\",\"left\":\"270px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"\",\"T_Operation\":\"\",\"T_Val\":\"\"}],\"type\":\"selectByUser\",\"user\":\"\",\"role\":\"\"}]},{\"id\":\"3alqmbwjofc000\",\"type\":\"node\",\"name\":\"审批节点\",\"top\":\"160px\",\"left\":\"495px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"flowschemeType_feiyongbaoxiao1\",\"T_Operation\":\">\",\"T_Val\":\"200\"},{\"T_FieldName\":\"flowschemeType_qingjia\",\"T_Operation\":\"=\",\"T_Val\":\"10\"}],\"type\":\"selectByUser\",\"user\":\"\",\"role\":\"\"}]},{\"id\":\"16yvpymeeuio00\",\"type\":\"end\",\"name\":\"结束\",\"top\":\"200px\",\"left\":\"760px\",\"setInfoList\":[{\"whereStr\":[{\"T_FieldName\":\"\",\"T_Operation\":\"\",\"T_Val\":\"\"}],\"type\":\"selectByUser\",\"user\":\"\",\"role\":\"\"}]}],\"lineList\":[{\"from\":\"4onov0jlpzi000\",\"to\":\"3alqmbwjofc000\",\"label\":\"连线名称\",\"id\":\"53dgrmosh7k000\",\"Remark\":\"\"},{\"from\":\"3alqmbwjofc000\",\"to\":\"16yvpymeeuio00\",\"label\":\"连线名称\",\"id\":\"l7usivne3to00\",\"Remark\":\"\"}]}", "Disabled": "0" }

/**
 * 获取流程明细
 * @param {String} flowId 流程Id
 * @returns 
 */
export let getFlowDetial = (flowId) => {
    console.log('Flow Id: ', flowId)
    return Promise.resolve(mockFlowDetial)
}

