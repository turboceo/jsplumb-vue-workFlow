<template>
  <div
    class="node-item"
    ref="node"
    :class="[isActive || isSelected ? 'active' : '']"
    :style="flowNodeContainer"
    v-click-outside="setNotActive"
    @click="setActive"
    @mouseenter="showAnchor"
    @mouseleave="hideAnchor"
    @dblclick.prevent="showSetNodeDialog"
    @contextmenu.prevent="onContextmenu"
  >
    <div class="log-wrap">
      <img :src="node.logImg" alt="" />
    </div>
    <div class="nodeName">{{ node.name }}</div>
    <!--连线用--//触发连线的区域-->
    <div class="node-anchor anchor-top" v-show="mouseEnter"></div>
    <div class="node-anchor anchor-right" v-show="mouseEnter"></div>
    <div class="node-anchor anchor-bottom" v-show="mouseEnter"></div>
    <div class="node-anchor anchor-left" v-show="mouseEnter"></div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

import NodeItemForm from "./node-item-form.vue";
export default {
  name: "nodeItem",
  props: {
    node: Object,
  },
  directives: {
    ClickOutside,
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          top: this.node.top,
          left: this.node.left,
        };
      },
    },
  },

  data() {
    return {
      mouseEnter: false,
      isActive: false,
      isSelected: false,
    };
  },
  methods: {
    showAnchor() {
      this.mouseEnter = true;
    },
    hideAnchor() {
      this.mouseEnter = false;
    },
    onContextmenu() {
      this.$contextmenu({
        items: [
          {
            label: "删除",
            disabled: false,
            icon: "",
            onClick: () => {
              this.deleteNode();
            },
          },
        ],
        event,
        customClass: "custom-class",
        zIndex: 9999,
        minWidth: 180,
      });
    },

    setActive() {
      if (window.event.ctrlKey) {
        this.isSelected = !this.isSelected;
        return false;
      }
      this.isActive = true;
      this.isSelected = false;
      setTimeout(() => {
        this.$emit("changeLineState", this.node.id, true);
      }, 0);
    },

    setNotActive() {
      if (!window.event.ctrlKey) {
        this.isSelected = false;
      }
      if (!this.isActive) {
        return;
      }
      this.$emit("changeLineState", this.node.id, false);
      this.isActive = false;
    },

    showSetNodeDialog() {
      let node = this.node;
      console.log("log node: ");
      console.log(JSON.stringify(node));

      this.newNodeName = node.name;

      let dialogEventHandler = {
        done: function (event) {
          debugger;
          Object.assign(node, event);
          // 设置节点名称
          this.$emit("setNodeName", node.id, node.name);
        },
        cancel: function () {
          debugger;
        },
      };

      if (node.type !== "node") return;
      this.$openDialog(NodeItemForm)(
        {
          node,
          pageOptions: this.$store.state.pageOptions,
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

    deleteNode() {
      this.$emit("deleteNode", this.node);
    },
  },
};
</script>

<style lang="less" scoped>
@labelColor: #409eff;
@nodeSize: 20px;
@viewSize: 10px;
.node-item {
  position: absolute;
  display: flex;
  height: 40px;
  width: 150px;
  justify-content: center;
  align-items: center;
  border: 1px solid #b7b6b6;
  border-radius: 4px;
  cursor: move;
  box-sizing: content-box;
  z-index: 9995;
  &:hover {
    z-index: 9998;
    .delete-btn {
      display: block;
    }
  }
  .log-wrap {
    width: 40px;
    height: 40px;
    border-right: 1px solid #b7b6b6;
  }
  .nodeName {
    flex-grow: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .node-anchor {
    display: flex;
    position: absolute;
    width: @nodeSize;
    height: @nodeSize;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: crosshair;
    z-index: 9999;
    background: -webkit-radial-gradient(sandybrown 10%, white 30%, #9a54ff 60%);
  }
  .anchor-top {
    top: calc((@nodeSize / 2) * -1);
    left: 50%;
    margin-left: calc((@nodeSize / 2) * -1);
  }
  .anchor-right {
    top: 50%;
    right: calc((@nodeSize / 2) * -1);
    margin-top: calc((@nodeSize / 2) * -1);
  }
  .anchor-bottom {
    bottom: calc((@nodeSize / 2) * -1);
    left: 50%;
    margin-left: calc((@nodeSize / 2) * -1);
  }
  .anchor-left {
    top: 50%;
    left: calc((@nodeSize / 2) * -1);
    margin-top: calc((@nodeSize / 2) * -1);
  }
}
.active {
  border: 1px dashed @labelColor;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.5);
}
</style>

<style module>
.nodeItemConfigDialog {
  width: 800px !important;
}
</style>
