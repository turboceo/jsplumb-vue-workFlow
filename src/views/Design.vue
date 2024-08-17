<template>
  <div class="flow_region">
    <!-- Header -->
    <div class="u-flex flow_region--header">
      <div class="u-flex-1 text-ellipsis flow_region--header---input">
        {{ flowBaseInfo.SchemeName }}
      </div>
      <div class="flow_region--header---action">
        <el-button type="primary" @click="showCreateFlowDialog" plain
          >配置/查看流程基本信息</el-button
        >
        <el-button type="primary" @click="saveFlow" v-if="shouldShowSaveFlowBtn"
          >保存流程</el-button
        >
      </div>
    </div>
    <!-- 左测工具栏 -->
    <div class="nodes-wrap">
      <div
        v-for="item in nodeTypeList"
        :key="item.type"
        class="node"
        draggable="true"
        @dragstart="drag($event, item)"
      >
        <div class="log">
          <img :src="item.logImg" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>

    <!-- 渲染区域 -->
    <div
      id="flowWrap"
      ref="flowWrap"
      class="flow-wrap"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
    >
      <div id="flow">
        <div
          v-show="auxiliaryLine.isShowXLine"
          class="auxiliary-line-x"
          :style="{
            width: auxiliaryLinePos.width,
            top: auxiliaryLinePos.y + 'px',
            left: auxiliaryLinePos.offsetX + 'px',
          }"
        ></div>
        <div
          v-show="auxiliaryLine.isShowYLine"
          class="auxiliary-line-y"
          :style="{
            height: auxiliaryLinePos.height,
            left: auxiliaryLinePos.x + 'px',
            top: auxiliaryLinePos.offsetY + 'px',
          }"
        ></div>
        <flowNode
          v-for="item in data.nodeList"
          :id="item.id"
          :key="item.id"
          :node="item"
          @setNodeName="setNodeName"
          @deleteNode="deleteNode"
          @changeLineState="changeLineState"
        ></flowNode>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb";
import { nodeTypeList } from "./config/init";
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions,
} from "./config/commonConfig";
import methods from "./config/methods";
import flowNode from "./components/node-item";

import { getFlowDetial } from "./components/api";
import { saveFlow } from "@/utils/service";

import get from "lodash/get";
import pick from "lodash/pick";
import { whereStrItemAdapter } from "./components/adapter";
// TODO:
// - Check the logic
import { shenpiObjFactory } from "./components/factory";

let joinComma = (arr) => arr.join(",");
let splitByComma = (str) => str.split(",");

import { DEFAULT_FLOW_DATA } from "./config/const";

import FlowBaseInfoPanel from "./components/FlowBaseInfoPanel.vue";
const OptionMixin = {
  data() {
    return {
      flowBaseInfo: {
        id: "",
        // 流程名称
        SchemeName: "默认流程名称",
        // 流程类型
        FrmId: "",
        whereStr: [],
      },

      pageOptions: {
        companyCodeOptiopns: [],
        flowschemeTypeOptions: [],
        liuchengtiaojianleixingOptions: [],
        userOptions: [],
        roleOptions: [],
      },
    };
  },
};

export default {
  name: "FlowEdit",

  mixins: [OptionMixin],

  computed: {
    shouldShowSaveFlowBtn() {
      return this.$route.query.mode !== "view";
    },
  },

  components: {
    flowNode,
  },
  data() {
    return {
      jsPlumb: null,
      currentItem: null,
      nodeTypeList: nodeTypeList,
      nodeTypeObj: {},

      isEditMode: false,

      data: {
        nodeList: [],
        lineList: [],
      },

      selectedList: [],
      jsplumbSetting: jsplumbSetting,
      jsplumbConnectOptions: jsplumbConnectOptions,
      jsplumbSourceOptions: jsplumbSourceOptions,
      jsplumbTargetOptions: jsplumbTargetOptions,
      auxiliaryLine: { isShowXLine: false, isShowYLine: false }, //对齐辅助线是否显示
      auxiliaryLinePos: {
        width: "100%",
        height: "100%",
        offsetX: 0,
        offsetY: 0,
        x: 20,
        y: 20,
      },
      commonGrid: [5, 5], //节点移动最小距离
      selectModuleFlag: false, //多选标识
      rectAngle: {
        px: "", //多选框绘制时的起始点横坐标
        py: "", //多选框绘制时的起始点纵坐标
        left: 0,
        top: 0,
        height: 0,
        width: 0,
      },
    };
  },

  methods: {
    ...methods,

    /**
     * 初始化节点类型对象
     */
    initNodeTypeObj() {
      nodeTypeList.map((v) => {
        this.nodeTypeObj[v.type] = v;
      });
    },

    /**
     * 初始化节点
     */
    initNode() {
      let nodeList = this.data.nodeList;
      let nodeItemAdapter = (item) => {
        item.logImg = this.nodeTypeObj[item.type].logImg;
        item.log_bg_color = this.nodeTypeObj[item.type].log_bg_color;
        let setInfoItem = get(item, "setInfoList[0]", shenpiObjFactory());
        setInfoItem.user = Array.isArray(setInfoItem.user)
          ? setInfoItem.user
          : splitByComma(setInfoItem.user).filter(Boolean);
        setInfoItem.role = Array.isArray(setInfoItem.role)
          ? setInfoItem.user
          : splitByComma(setInfoItem.role).filter(Boolean);
        item.shenpi = pick(setInfoItem, ["type", "user", "role"]);

        item.whereStr = setInfoItem.whereStr || [];
        delete item.setInfoList;
        return item;
      };
      this.data.nodeList = nodeList.map(nodeItemAdapter);
    },

    /**
     * 保存流程
     */
    saveFlow() {
      console.log("SAVE FLOW:::)");
      let nodeAdapter = (item) => {
        let obj = pick(item, ["id", "type", "name", "top", "left"]);
        let shenpiObj = get(item, "shenpi", {
          type: "selectByUser",
          user: [],
          role: [],
          NodeName: "",
          jop: "",
        });

        let setInfoItem = {
          whereStr: get(item, "whereStr", [])
            .map(whereStrItemAdapter)
            .map((item) => {
              debugger;
              return pick(item, ["T_FieldName", "T_Operation", "T_Val"]);
            }),
          type: shenpiObj.type,
          // NOTE:
          // - 不用区分类型直接对数据进行处理
          user: joinComma(shenpiObj.user),
          role: joinComma(shenpiObj.role),
        };

        obj.setInfoList = [setInfoItem];
        return obj;
      };

      let toJSON = (obj) => JSON.stringify(obj);

      // 流程数据回显
      let toBackEndData = {
        id: "",
        SchemeName: this.flowBaseInfo.SchemeName,
        FrmId: this.flowBaseInfo.FrmId,
        SchemeCanUser: toJSON(this.flowBaseInfo.whereStr),
        SchemeContent: toJSON({
          nodeList: this.data.nodeList.map(nodeAdapter),
          lineList: this.data.lineList,
        }),
        Disabled: "0",
      };

      console.log(JSON.stringify(toBackEndData, null, 4));

      // TODO:
      // -remove commnet
      // saveFlow(toBackEndData).then((res) => {
      //   console.log(res);
      //   this.$message.success("保存成功");
      // });
    },

    /**
     * 获取页面下拉项
     */
    async getPageOptions() {
      let listOptions = [
        {
          dicTypeID: "-1",
          dicTypeName: "所属组织",
          key: "pageOptions.companyCodeOptiopns",
        },
        {
          dicTypeID: "flowschemeType",
          dicTypeName: "流程类型下拉ID",
          key: "pageOptions.flowschemeTypeOptions",
        },
        {
          dicTypeID: "liuchengtiaojianleixing",
          dicTypeName: "流程条件类型（自定义） 下拉ID",
          key: "pageOptions.liuchengtiaojianleixingOptions",
        },
        {
          dicTypeID: "b5cab1b3-e486-4ae6-9d95-a849a710d72f",
          dicTypeName: "用户下拉ID",
          key: "pageOptions.userOptions",
        },
        {
          dicTypeID: "a97a2af4-edfb-4dcd-b606-25a21bbd9fda",
          dicTypeName: "角色下拉ID",
          key: "pageOptions.roleOptions",
        },
      ];
      await this.$getOptions.call(this, listOptions, true);
      this.$store.commit("updatePageOptions", this.pageOptions);
    },

    async renderFlow() {
      // 绘制流程
      this.jsPlumb = jsPlumb.getInstance();
      this.initNodeTypeObj();
      this.initNode();
      this.fixNodesPosition();
      await this.$nextTick();
      this.init();
      // 延迟弹窗显示避免流程图渲染异常
      this.isAddMode && this.showCreateFlowDialog();
    },

    /**
     * 显示设置流程基本信息弹窗
     */
    showCreateFlowDialog() {
      let dialogEventHandler = {
        done: function (event) {
          console.log(event);
          Object.assign(this.flowBaseInfo, event);
        },
        cancel: function () {},
      };

      this.$openDialog(FlowBaseInfoPanel)(
        {
          pageOptions: this.pageOptions,
          node: this.flowBaseInfo,
        },
        this
      )
        .then((event) => {
          dialogEventHandler.done.call(this, event);
        })
        .catch(() => {
          dialogEventHandler.cancel.call(this);
        });
    },
  },

  async mounted() {
    // 获取下拉选项
    this.getPageOptions();
    let { mode, id, token } = this.$route.query;

    let isAddMode = mode === "add";
    this.isAddMode = isAddMode;

    if (isAddMode) {
      // TODO:
      // 设置默认的节点、连线
      Object.assign(this.data, DEFAULT_FLOW_DATA);
      this.data;
    }

    if (mode === "edit") {
      let [err, res] = await this.$to(getFlowDetial(id));
      if (err) {
        this.$message.error("获取流程异常, 请稍后再试");
        return;
      }

      let mix = Object.assign;
      let parseJSON = (str) => JSON.parse(str);
      let obj$1 = pick(res, ["id", "SchemeName", "FrmId"]);
      obj$1.whereStr = parseJSON(res.SchemeCanUser);
      mix(this.flowBaseInfo, obj$1);
      mix(this.data, parseJSON(res.SchemeContent));
    }

    this.renderFlow();
  },
};
</script>

<style lang="less" scoped>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flow_region {
  &--header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 600px;
    height: 70px;
    background: #409eff73;
    border-radius: 0 0 10px 10px;
    font-size: 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 35px;
    padding-right: 35px;

    input {
      width: 200px;
      appearance: none;
      border: none;
      border-bottom: 1px solid #d2d2d2;
      background: transparent;
      padding: 3px 10px;
      text-align: center;
      margin-top: 5px;
      height: 32px;
    }
  }

  display: flex;
  height: 100%;
  border: 1px solid #ccc;
  .nodes-wrap {
    width: 200px;
    height: 100%;
    border-right: 1px solid #ccc;
    padding-top: 20px;

    .node {
      display: flex;
      height: 40px;
      width: 80%;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;
      &:hover {
        cursor: grab;
      }
      &:active {
        cursor: grabbing;
      }
      .log {
        width: 40px;
        height: 40px;
      }
      .name {
        width: 0;
        flex-grow: 1;
      }
    }
  }
  .flow-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    outline: none !important;
    flex-grow: 1;
    background-image: url("../flowDesignResource/point.png");
    #flow {
      position: relative;
      width: 100%;
      height: 100%;
      .auxiliary-line-x {
        position: absolute;
        border: 0.5px dashed #2ab1e8;
        z-index: 9999;
      }
      .auxiliary-line-y {
        position: absolute;
        border: 0.5px dashed #2ab1e8;
        z-index: 9999;
      }
    }
  }
}
</style>

<style lang="less">
.jtk-connector.active {
  z-index: 9999;
  path {
    stroke: #150042;
    stroke-width: 1.5;
    animation: ring;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    stroke-dasharray: 5;
  }
}
@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

<style module>
.nodeItemConfigDialog {
  width: 800px !important;
}
</style>
