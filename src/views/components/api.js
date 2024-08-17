let mockFlowDetial = Object.assign(
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