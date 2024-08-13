const nodeTypeList = [{
  type: 'start',
  typeName: '开始',
  nodeName: '开始',
  logImg: require('@/assets/svg/1开始.svg'),
  log_bg_color: 'rgba(0, 128, 0, 0.2)'
}, {
  type: 'end',
  typeName: '结束',
  nodeName: '结束',
  logImg: require('@/assets/svg/2结束.svg'),
  log_bg_color: 'rgba(255, 0, 0, 0.2)'
}, {
  type: 'node',
  typeName: '审批节点',
  nodeName: '审批节点',
  logImg: require('@/assets/svg/8个人服务.svg'),
  log_bg_color: 'rgba(132, 166, 251, 0.2)'
}
]

export { nodeTypeList };