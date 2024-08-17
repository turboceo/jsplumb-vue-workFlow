<template>
  <el-dialog
    :visible.sync="dialogVideoVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
    title="节点设置"
    width="800"
    center
  >
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
            @change="(e) => handleItemFlagChange(e)"
          >
            <el-option label="按用户审批" value="selectByUser"></el-option>
            <el-option label="按角色审批" value="selectByRole"></el-option>
          </el-select>

          <template v-if="ruleForm.shenpi.type === 'selectByUser'">
            <el-select
              v-model="ruleForm.shenpi.user"
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
                :key="item.Id"
                :label="item.Name"
                :value="item.Id"
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
            v-model="item.T_FieldName"
            placeholder="请选择"
            style="flex: 0 0 200px"
            clearable
            filterable
          >
            <el-option
              v-for="item in pageOptions.flowschemeTypeOptions"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            ></el-option>
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
import DiaglogMixin from "@/mixin/dialog";
import { ruleFormFactory, whereStrFactory } from "./factory";

export default {
  mixins: [DiaglogMixin],

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
      this.ruleForm.shenpi.user = [];
      this.ruleForm.shenpi.role = [];
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
    let node = this.node;

    // TODO:
    // -REMOVE
    node.whereStr = node.whereStr.map((item) => {
      return item;
    });

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
