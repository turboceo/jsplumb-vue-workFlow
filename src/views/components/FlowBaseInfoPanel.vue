<template>
  <el-dialog
    append-to-body
    :visible.sync="dialogVideoVisible"
    width="800"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    title="流程基本信息"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="流程名称" prop="SchemeName" required>
        <el-input
          v-model="ruleForm.SchemeName"
          placeholder="请填写流程名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="流程类型" prop="FrmId" required>
        <el-select
          v-model="ruleForm.FrmId"
          placeholder="请选择流程类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in pageOptions.flowschemeTypeOptions"
            :key="item.ID"
            :label="item.Name"
            :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="组织部门设置" required>
        <div
          style="display: flex; gap: 10px; margin-bottom: 8px"
          v-for="(item, index) in ruleForm.whereStr"
          :key="index"
        >
          <el-select
            v-model="item.CompanyCode"
            placeholder="请选择"
            style="flex: 0 0 200px"
            @change="
              (CompanyCode) =>
                handleItemCompanyCodeChange(item, CompanyCode, true)
            "
          >
            <el-option
              v-for="item in pageOptions.companyCodeOptiopns"
              :label="item.Name"
              :value="item.ID"
              :key="item.ID"
            ></el-option>
          </el-select>

          <el-select
            v-model="item.Bumen"
            placeholder="请选择部门"
            style="flex: 1"
            multiple
          >
            <el-option
              v-for="item in item.Bumen_Options"
              :label="item.Name"
              :value="item.Id"
              :key="item.Id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          plain
          @click="addWhereStr"
          icon="el-icon-plus"
          >添加条件</el-button
        >
      </el-form-item>

      <el-form-item>
        <div class="action-bar">
          <el-button type="info" @click="handleCancel" icon="">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" icon=""
            >保存</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
let whereStrFactory = () => {
  return {
    CompanyCode: "",
    Bumen: "",
    CompanyCode_Options: [],
    Bumen_Options: [],
  };
};

let ruleFormFactory = () => {
  return {
    // 流程名称
    SchemeName: "",
    // 流程类型
    FrmId: "",
    whereStr: [],
    // whereStr: [whereStrFactory()],
  };
};

// 所属组织-部门联动接口
import { getChildDeptList } from "@/utils/service";

import DiaglogMixin from "@/mixin/dialog";

export default {
  mixins: [DiaglogMixin],

  props: {
    node: {
      type: Object,
      default() {
        return {
          whereStr: [],
        };
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
        SchemeName: [
          { required: true, message: "请输入流程名称", trigger: "blur" },
          { min: 3, message: "长度至少 3 个字符", trigger: "blur" },
        ],
        FrmId: [
          { required: true, message: "请选择流程类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async handleItemCompanyCodeChange(
      item,
      T_FieldName,
      shouldResetData = false
    ) {
      if (shouldResetData) {
        this.T_FieldName = [];
        item.Bumen = [];
      }
      let res = await getChildDeptList(T_FieldName);
      if (res.code !== 200) return;
      // 调整部门下拉列表
      let deptList = res.data || [];
      item.Bumen_Options = deptList;
      this.$forceUpdate();
    },

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
        this.handleConfirm(this.ruleForm);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

  async created() {
    let f = this.ruleForm;
    let node = this.node || {};
    // 遍历每一项判断是否需要调用接口
    node.whereStr = (node.whereStr || []).map((item) => {
      console.log(item.CompanyCode, item.Bumen);
      // 判断组织&部门是否有值
      // 部门需要联动组织进行查询
      if (item.CompanyCode) {
        console.log("联动啦...");
        this.handleItemCompanyCodeChange(item, item.CompanyCode);
      }
      return item;
    });
    Object.assign(f, node);
    // await this.$nextTick();
    // this.$forceUpdate();
  },
};
</script>

<style scoped>
.action-bar {
  text-align: center;
  margin-bottom: -34px;
}
</style>
