import { whereStrFactory } from '../components/factory'

const nodeTypeList = [{
  id: '',
  type: 'start',
  name: '开始',
  logImg: require('@/assets/svg/1开始.svg'),
  log_bg_color: 'rgba(0, 128, 0, 0.2)',
  shenpi: {
    jop: "",
    NodeName: "",
    // 默认审批人按用户选择
    type: "selectByUser",
    user: [],
    role: [],
    userOptions: [],
    roleOptions: [],
  },
  whereStr: [whereStrFactory()],
}, {
  id: '',
  type: 'end',
  name: '结束',
  logImg: require('@/assets/svg/2结束.svg'),
  log_bg_color: 'rgba(255, 0, 0, 0.2)',
  shenpi: {
    jop: "",
    NodeName: "",
    // 默认审批人按用户选择
    type: "selectByUser",
    user: [],
    role: [],
    userOptions: [],
    roleOptions: [],
  },
  whereStr: [whereStrFactory()],
}, {
  id: '',
  type: 'node',
  name: '审批节点',
  logImg: require('@/assets/svg/8个人服务.svg'),
  log_bg_color: 'rgba(132, 166, 251, 0.2)',
  shenpi: {
    jop: "",
    NodeName: "",
    // 默认审批人按用户选择
    type: "selectByUser",
    user: [],
    role: [],
    userOptions: [],
    roleOptions: [],
  },
  whereStr: [whereStrFactory()],
}
]

export { nodeTypeList };