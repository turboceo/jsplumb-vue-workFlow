<template>
  <div class="flow_region">
    <!-- Header -->
    <div class="flow_region--header">
      <input
        v-model="data.title"
        placeholder="请输入流程名称"
        :disabled="!isEditMode"
      />
      <i
        class="el-icon-edit"
        style="cursor: pointer; margin-left: 5px"
        @click="isEditMode = !isEditMode"
      ></i>
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
        <div class="name">{{ item.typeName }}</div>
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
import data from "./config/data.json";
import flowNode from "./components/node-item";
export default {
  name: "FlowEdit",
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
        title: "流程名称",
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
  mounted() {
    this.jsPlumb = jsPlumb.getInstance();
    this.initNodeTypeObj();
    this.initNode();
    this.fixNodesPosition();
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...methods,
    initNodeTypeObj() {
      nodeTypeList.map((v) => {
        this.nodeTypeObj[v.type] = v;
      });
    },
    initNode() {
      this.data.lineList = data.lineList;
      data.nodeList.map((v) => {
        v.logImg = this.nodeTypeObj[v.type].logImg;
        v.log_bg_color = this.nodeTypeObj[v.type].log_bg_color;
        this.data.nodeList.push(v);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.flow_region {
  &--header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: aliceblue;
    font-size: 1.5em;

    input {
      width: 200px;
      appearance: none;
      border: none;
      border-bottom: 1px solid #d2d2d2;
      background: transparent;
      padding: 3px 10px;
      text-align: center;
      margin-top: 5px;
    }
  }

  display: flex;
  height: 100%;
  padding-top: 50px;
  border: 1px solid #ccc;
  .nodes-wrap {
    width: 150px;
    height: 100%;
    border-right: 1px solid #ccc;
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
    background-image: url("../assets/point.png");
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
