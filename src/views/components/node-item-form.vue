<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    label-position="top"
  >
    <el-form-item label="节点名称" prop="name">
      <el-input v-model="ruleForm.nodeName"></el-input>
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
            v-model="ruleForm.shenpi.user"
            placeholder="请选择"
            style="flex: 1"
            multiple
            clearable
            filterable
          >
            <el-option
              v-for="(item, $userOrRoleOptionId) in ruleForm.shenpi.userOptions"
              :label="item.label"
              :value="item.value"
              :key="$userOrRoleOptionId"
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
              v-for="(item, $userOrRoleOptionId) in ruleForm.shenpi.roleOptions"
              :label="item.label"
              :value="item.value"
              :key="$userOrRoleOptionId"
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
          style="flex: 0 0 100px"
        >
          <el-option label="部门" value="bumen"></el-option>
          <el-option label="组织" value="zuzhi"></el-option>
          <el-option label="自定义" value="zidingyi"></el-option>
        </el-select>

        <el-select
          v-model="item.T_FieldName"
          placeholder="请选择"
          style="flex: 0 0 200px"
        >
          <el-option
            v-for="(item, $T_FieldName_OptionIdx) in T_FieldName_Options"
            :label="item.label"
            :value="item.value"
            :key="$T_FieldName_OptionIdx"
          ></el-option>
        </el-select>

        <el-select
          v-model="item.T_Operation"
          placeholder="请选择"
          style="flex: 0 0 100px"
        >
          <el-option label="等于" value="="></el-option>
          <el-option label="不等于" value="!="></el-option>
        </el-select>

        <el-input v-model="item.T_Val" placeholder=""> </el-input>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addWhereStr" icon="el-icon-plus"
        >添加审批条件</el-button
      >
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        size="mini"
        @click="submitForm('ruleForm')"
        plain
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchDataWithCache } from "./util";
import { whereStrFactory } from "./factory";

import { getUserList, getRoleList, getBumenList } from "./api";

export default {
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      ruleForm: {
        name: "",
        shenpi: {
          // 默认审批人按用户选择
          type: "selectByUser",
          user: [],
          role: [],
          userOptions: [],
          roleOptions: [],
        },
        whereStr: [whereStrFactory()],
      },

      T_FieldName_Options: [],

      rules: {
        nodeName: [
          { required: true, message: "请输入节点名称", trigger: "blur" },
          { min: 2, message: "长度至少 2 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**
     * 添加审批条件
     */
    addWhereStr() {
      this.ruleForm.whereStr.push(whereStrFactory());
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return;
        }
        console.log("log result: ");
        console.log(this.ruleForm);
        this.$emit("done", this.ruleForm);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  async created() {
    let ret = Object.assign(this.ruleForm, this.node);
    console.log(ret);
    fetchDataWithCache("getUserList", getUserList()).then((res) => {
      this.ruleForm.shenpi.userOptions = res;
    });
    fetchDataWithCache("getRoleList", getRoleList()).then((res) => {
      this.ruleForm.shenpi.roleOptions = res;
    });

    fetchDataWithCache("getBumenList", getBumenList()).then((res) => {
      this.T_FieldName_Options = res;
    });
  },
};
</script>
