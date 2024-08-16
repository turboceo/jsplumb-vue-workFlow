<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    label-position="top"
  >
    <el-form-item label="节点名称" prop="name" required>
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="审批人">
      <div style="display: flex; gap: 10px; margin-bottom: 8px">
        <el-select
          v-model="ruleForm.shenpi.type"
          placeholder="请选择"
          style="flex: 0 0 250px"
        >
          <el-option label="按用户审批" value="selectByUser"></el-option>
          <el-option label="按角色审批" value="selectByRole"></el-option>
        </el-select>

        <template v-if="ruleForm.shenpi.type === 'selectByUser'">
          <el-select
            v-model="ruleForm.user"
            placeholder="请选择"
            style="width: 100%"
            multiple
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
        </template>

        <template v-if="ruleForm.shenpi.type === 'selectByRole'">
          <el-select
            v-model="ruleForm.shenpi.role"
            placeholder="请选择"
            style="flex: 1"
            multiple
            clearable
            filterable
          >
            <el-option
              v-for="item in pageOptions.roleOptions"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            ></el-option>
          </el-select>
        </template>
      </div>
    </el-form-item>

    <el-form-item label="审批条件">
      <div
        style="display: flex; gap: 10px; margin-bottom: 8px"
        v-for="(item, index) in ruleForm.whereStr"
        :key="index"
      >
        <el-select
          v-model="item.flag"
          placeholder="请选择"
          style="flex: 0 0 150px"
          @change="(flag) => handleItemFlagChange(item, flag)"
        >
          <el-option label="消费金额" value="C01"></el-option>
          <el-option label="发票额" value="C02"></el-option>
        </el-select>

        <el-select
          v-model="item.T_Operation"
          placeholder="请选择"
          style="flex: 0 0 100px"
        >
          <el-option label="等于" value="="></el-option>
          <el-option label="不等于" value="!="></el-option>
          <el-option label="大于" value=">"></el-option>
          <el-option label="小于" value="<"></el-option>
        </el-select>

        <el-input v-model="item.T_Val" placeholder=""> </el-input>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        plain
        @click="addWhereStr"
        icon="el-icon-plus"
        >添加审批条件</el-button
      >
    </el-form-item>

    <el-form-item>
      <div class="action-bar">
        <el-button type="info" @click="closeDialog" icon="">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" icon=""
          >保存</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchDataWithCache } from "./util";
import { ruleFormFactory, whereStrFactory } from "./factory";

import { getUserList, getRoleList, getCustomList } from "./api";

/**
 * 拉取列表策略
 */
let fetchListStrategies = {};
fetchListStrategies.user = function () {
  return fetchDataWithCache("getUserList", getUserList()).then((res) => {
    this.ruleForm.shenpi.userOptions = res;
  });
};

fetchListStrategies.role = function () {
  return fetchDataWithCache("getRoleList", getRoleList()).then((res) => {
    this.ruleForm.shenpi.roleOptions = res;
  });
};

fetchListStrategies.zidingyi = function (item) {
  return fetchDataWithCache("getCustomList", getCustomList()).then((res) => {
    item.T_FieldName_Options = res;
  });
};

export default {
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },

    pageOptions: {
      type: Object,
      default() {
        return {
          companyCodeOptiopns: [],
          flowschemeTypeOptions: [],
          liuchengtiaojianleixingOptions: [],
          userOptions: [],
          roleOptions: [],
        };
      },
    },
  },

  data() {
    return {
      ruleForm: ruleFormFactory(),

      rules: {
        nodeName: [
          { required: true, message: "请输入节点名称", trigger: "blur" },
          { min: 2, message: "长度至少 2 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleItemFlagChange(item, flag) {
      // 重置
      item.T_FieldName = "";
      let strategy = fetchListStrategies && fetchListStrategies[flag];
      if (!strategy) return;
      strategy && strategy.call(this, item);
    },

    handleItemCompanyCodeChange(item, CompanyCode) {
      if (!CompanyCode) return;
      let strategy = fetchListStrategies && fetchListStrategies["bumen"];
      if (!strategy) return;
      strategy && strategy.call(this, item);
    },

    /**
     * 添加审批条件
     */
    addWhereStr() {
      this.ruleForm.whereStr.push(whereStrFactory());
    },

    closeDialog() {
      this.$emit("cancel");
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return;
        }
        this.$emit("done", this.ruleForm);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  async created() {
    let f = this.ruleForm;
    let node = this.node;

    // 遍历每一项判断是否需要调用接口
    node.whereStr = node.whereStr.map((item) => {
      if (item.T_FieldName !== "CompanyCode") return item;
      console.log(item.CompanyCode, item.Bumen);
      // 判断组织&部门是否有值
      // 部门需要联动组织进行查询
      if (item.CompanyCode) {
        fetchListStrategies.CompanyCode.call(this, item).then(() => {
          this.$forceUpdate();
        });
        fetchListStrategies.bumen
          .call(this, item, item.CompanyCode)
          .then(() => {
            this.$forceUpdate();
          });
      }
      return item;
    });

    fetchListStrategies.user.call(this);
    fetchListStrategies.role.call(this);
    Object.assign(f, node);
  },
};
</script>

<style scoped>
.action-bar {
  text-align: center;
  margin-bottom: -34px;
}
</style>
