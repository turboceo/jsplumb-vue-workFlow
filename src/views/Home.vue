<template>
  <div class="u-relative d-flex u-flex-col u-flex-1 w-full">
    <div class="table-action">
      <el-button
        size="mini"
        @click="doAction('add')"
        class="u-m-l-10"
        type="primary"
        v-if="
          $hasPerm({
            p: ['archives:inventory:add'],
          })
        "
        >新增</el-button
      >
      <el-input
        style="width: 200px"
        size="mini"
        v-model="queryParams.title"
        class="u-m-l-10"
        filterable
        clearable
        placeholder="请输入流程名称"
      >
      </el-input>

      <el-select
        v-model="queryParams.FrmId"
        size="mini"
        placeholder="请选择流程类型"
      >
        <el-option
          v-for="item in pageOptions.flowschemeTypeOptions"
          :key="item.ID"
          :label="item.Name"
          :value="item.ID"
        ></el-option>
      </el-select>

      <el-select
        v-model="queryParams.createUserName"
        placeholder="请选择创建人"
        size="mini"
        clearable
        filterable
      >
        <el-option
          v-for="item in pageOptions.userOptions"
          :key="item.ID"
          :label="item.Name"
          :value="item.ID"
        ></el-option>
      </el-select>

      <el-button
        size="mini"
        @click="doAction('search')"
        class="u-m-l-10"
        type="warning"
        style="color: #fefefe"
        >重置</el-button
      >

      <el-button
        size="mini"
        @click="doAction('search')"
        class="u-m-l-10"
        style="background: #0482b0; color: #fefefe"
        >查 询</el-button
      >
    </div>

    <!-- Table 表格区 -->
    <div ref="table" class="section--body u-flex-1">
      <el-table
        ref="tables"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ background: '#f4f3f9', color: '#606266' }"
        :height="tableHeight"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortchange"
        @row-click="rowclick"
        :highlight-current-row="true"
        v-loading="isTableLoading"
        class="custom--table"
        tooltip-effect="dark"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <el-table-column
          fixed
          type="index"
          label="序号"
          :resizable="false"
          width="70"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="schemeName" label="流程名称" align="center">
        </el-table-column>

        <el-table-column
          prop="createUserName"
          label="创建人"
          align="center"
          width="140"
        >
        </el-table-column>

        <el-table-column
          prop="createDate"
          label="创建时间"
          align="center"
          width="200"
        >
        </el-table-column>

        <el-table-column
          prop="modifyUserName"
          label="修改人"
          align="center"
          width="140"
        >
        </el-table-column>

        <el-table-column
          prop="modifyDate"
          label="修改时间"
          align="center"
          width="200"
        >
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click="doAction('viewDetial', scope.row.ID)"
              type="text"
              size="mini"
              >查看</el-button
            >
            <el-button
              @click="doAction('editFlow', scope.row)"
              type="text"
              size="mini"
              v-if="$hasPerm({ p: ['archives:inventory:edit'] })"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div
      class="table-footer pl-15 pr-15 text-left"
      style="
        box-shadow: none;
        background: none;
        box-sizing: border-box;
        padding-top: 20px;
      "
    >
      <div class="summary-bar"></div>
      <div class="pagination-nav">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page.sync="pagination.current"
          :page-sizes="paginationSizes"
          :page-size="pagination.size"
          layout="total, prev, pager, next, sizes"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getFlowList, getChedui } from "@/utils/service";
import { debounce } from "throttle-debounce";
import { setToken } from "@/util/index";

// 表格状态
let actionStrategies = {
  search() {
    this.handleFormSubmit();
  },

  /**
   * 新增流程
   */
  add() {
    this.$router.push({
      name: "FlowDesign",
      query: {
        mode: "add",
      },
    });
  },

  /**
   * 编辑流程
   * @param row 当前行对象
   */
  editFlow(row) {
    this.$router.push({
      name: "FlowDesign",
      query: {
        mode: "edit",
        id: row.id,
      },
    });
  },

  /**
   * 查看流程详情
   * @param row 当前行对象
   */
  viewDetial(row) {
    this.$router.push({
      name: "FlowDesign",
      query: {
        mode: "view",
        id: row.id,
      },
    });
  },
};

const PageOptionsMixin = {
  data() {
    return {
      pageOptions: {
        companyCodeOptiopns: [],
        flowschemeTypeOptions: [],
        liuchengtiaojianleixingOptions: [],
        userOptions: [],
        roleOptions: [],
      },
    };
  },

  methods: {
    /**
     * 获取页面下拉项
     */
    async getPageOptions() {
      //         所属组织下拉ID: -1
      // 流程类型下拉ID：flowschemeType
      // 流程条件类型（自定义） 下拉ID:  liuchengtiaojianleixing
      // 用户下拉ID：b5cab1b3-e486-4ae6-9d95-a849a710d72f
      // 角色下拉ID：a97a2af4-edfb-4dcd-b606-25a21bbd9fda
      // dicTypeID: "-1,flowschemeType,liuchengtiaojianleixing,b5cab1b3-e486-4ae6-9d95-a849a710d72f,a97a2af4-edfb-4dcd-b606-25a21bbd9fda",
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
        // {
        //   dicTypeID: "liuchengtiaojianleixing",
        //   dicTypeName: "流程条件类型（自定义） 下拉ID",
        //   key: "pageOptions.liuchengtiaojianleixingOptions",
        // },
        {
          dicTypeID: "b5cab1b3-e486-4ae6-9d95-a849a710d72f",
          dicTypeName: "用户下拉ID",
          key: "pageOptions.userOptions",
        },
        // {
        //   dicTypeID: "a97a2af4-edfb-4dcd-b606-25a21bbd9fda",
        //   dicTypeName: "角色下拉ID",
        //   key: "pageOptions.roleOptions",
        // },
      ];
      await this.$getOptions.call(this, listOptions, true);
    },
  },
};

// 查询
let TableMixin = {
  data() {
    return {
      isTableLoading: false,
      tableData: [],
      // 选择的项
      multipleSelection: [],
      tableKey: -1,
    };
  },

  methods: {
    handleFormSubmit2(order) {
      this.pagination.current = 1;
      this.handleFormSubmit(order);
    },

    /**
     * 查询操作（条件总数据）
     * @param order
     */
    handleFormSubmit(order) {
      let params = {
        page: this.pagination.current,
        limit: this.pagination.size,
        ...this.queryParams,
      };
      // 获取查询请求
      this.loadList(params);
    },
  },
};

// 获取请求
let PaginationMixin = {
  data() {
    return {};
  },

  methods: {
    /**
     * 设置数据总页数
     * @param {Number} num
     */
    setTotal(num) {
      this.total = num;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 获取请求
    loadList(apiOptions) {
      this.isTableLoading = true;
      getFlowList(apiOptions)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data || [];
            this.tableData.map((__item__) => {
              return (__item__.fileLength = 0);
            });
            this.setTotal(res.count);
            this.isTableLoading = false;
          } else {
            this.tableData = [];
            this.isTableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("请求异常，请重试");
          this.isTableLoading = false;
        });
    },
  },
};

const queryParamsFactory = () => {
  return {
    // 流程名称
    title: "",
    createUserName: "",
    FrmId: "",
  };
};

/**
 * 处理查询条件
 * 更多查询
 */
const HandleQueryMixin = {
  data() {
    return {
      queryParams: queryParamsFactory(),
    };
  },
  methods: {
    /**
     * 清空条件
     */
    reset() {
      Object.assign(this.queryParams, queryParamsFactory());
      this.$nextTick(() => {
        this.calcTableAviableHeight();
      });
      this.doAction("search");
    },

    /**
     * 删除条件
     */
    DeletItem(item, index) {
      this.palestine.splice(index, 1);
      let queryParams = this.queryParams;
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key].plaholer === item.plaholer)
          queryParams[key].vale = "";
      });
      this.$nextTick(() => {
        this.calcTableAviableHeight();
      });
      this.doAction("search");
    },

    focusOptfun() {
      if (!this.isFirstTime) {
        this.queryParams.xingmin.Optiopns = this.dboption;
      }
    },
  },
};

export default {
  name: "PageHome",

  mixins: [TableMixin, PaginationMixin, HandleQueryMixin, PageOptionsMixin],

  // 组件列表
  components: {},

  computed: {
    isZhuZhi() {
      // 定义变量hint，初始值为'请选择组织'
      // 如果queryParams.qiye存在，且QueryList.gangweiOptions的长度为0，则将hint的值改为'暂无部门'
      // 返回hint的值
      let hint = "请选择组织";
      if (
        this.queryParams.qiye.vale &&
        !this.queryParams.gangwe.Optiopns.length
      ) {
        hint = "暂无部门";
      }
      return hint;
    },
  },

  data() {
    return {
      state: "",
      tableHeight: 0, // 表格高度
      mode: "",
      scope: {},
      scopeId: "",
      scopeLine: {},
      vis: {
        andUsers: false,
        super: false,

        userBasicInformation: false,
      },

      // 分页
      pagination: {
        current: 1,
        size: 15,
      },
      // 数据总条数
      total: 0,
      paginationSizes: [15, 30, 50],

      tableNameId: "bf0c796a-b2da-42f4-947f-d22848b56e94",
    };
  },

  // 防止表格错位
  activated() {
    this.$refs.tables.doLayout();
  },

  methods: {
    handleCloses(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 点击当前行事件
    rowclick(row) {
      this.$refs.tables.clearSelection();
      this.$refs.tables.toggleRowSelection(row);
    },

    // 绑定后台是否升降序
    sortchange(column) {
      console.log(column);
      var fieldName = column.prop;
      var sortingType = column.order;

      if (sortingType === "descending") {
        sortingType = "desc";
      } //按照升序排序
      else {
        sortingType = "asc";
      }
      let co = "a." + fieldName + " " + sortingType;
      console.log(co);
      this.handleFormSubmit(co);
    },

    /**
     * 处理分页器页面数据大小变化
     */
    handleSizeChange(size) {
      let pagination = this.getPaginationState();
      pagination.current = 1;
      pagination.size = size;
      this.handleFormSubmit();
    },

    /**
     * 处理分页器页面数变化
     */
    handleCurrentChange(current) {
      let pagination = this.getPaginationState();
      pagination.current = current;
      this.handleFormSubmit();
    },

    /**
     * 列表接口适配器
     */
    getPaginationState() {
      return this.pagination;
    },

    doAction(actionType, row = {}) {
      console.log(`动作类型: `, actionType);
      let func = actionStrategies && actionStrategies[actionType];
      func && func.call(this, row);
    },

    // 窗口关闭返回刷新
    refresh() {
      this.handleFormSubmit();
    },

    /**
     * 计算表格可用高度
     */
    calcTableAviableHeight() {
      let el = this.$refs.table;
      if (el && el.getBoundingClientRect) {
        let { top } = el.getBoundingClientRect();
        let h = 50 + 15 + 27 + top;
        let tableHeight = window.innerHeight - h - 33;
        // 设置table的高度
        el.style.height = tableHeight + "px";
        this.tableHeight = tableHeight;
      }
    },
  },

  created() {
    // 设置页面Token
    let { token } = this.$route.query;
    token && setToken(token);
    this.getPageOptions();
    this.handleFormSubmit();
    this.debounceHandleResize = debounce(
      250,
      this.calcTableAviableHeight.bind(this)
    );
    this.$on("hook:mounted", () => {
      let $__func = this.debounceHandleResize.bind(this);
      window.addEventListener("resize", $__func);
      this.$nextTick(() => {
        this.calcTableAviableHeight();
      });
    });
    this.$on("hook:destoryed", () => {
      window.removeEventListener("resize");
    });
  },
};
</script>

<style lang="less" scoped>
// =========================== 更多查询-Start ===========================
.chaxunspan {
  background-color: rgba(60, 156, 255, 0.24);
  padding: 2px 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  margin: 3px 5px;
  &_icn {
    color: rgba(166, 166, 166, 1);
    margin-left: 5px;
  }
}
::v-deep.seleinput {
  width: 245px !important;
  margin: 3px;
  & .el-range-separator {
    width: 10%;
    padding: 0;
  }
}
.cpopover {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    align-self: end;
  }
}
// =========================== 更多查询-End ===========================

.table-action {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px;

  > * {
    margin-right: 10px;
  }
}

// 加载状态居中
::v-deep .el-loading-spinner {
  display: flex;
  justify-content: center;
}

.custom--table {
  ::v-deep tr.current-row > td.el-table__cell {
    color: #fff;
    background-color: #0482b0 !important;
  }
}

.max-x-200 {
  max-width: 200px;
}

.summary-bar {
  span {
    padding-left: 5px;
    padding-right: 5px;
    color: #1890ff;
  }
}

// 弹窗表头/关闭
::v-deep .el-dialog__header {
  background: rgb(204, 204, 204);

  & .el-dialog__headerbtn {
    position: absolute;
    top: 8px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 30px;
    font-weight: 400;
  }
}
</style>
