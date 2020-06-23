<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-19 12:22:51
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-23 11:48:45
--> 
<template>
  <el-dialog title="注册" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
    <div class="region-form-div">
      <el-form
        ref="regionForm"
        :label-position="labelPosition"
        label-width="80px"
        :rules="rules"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名" prop="name">
          <el-input maxlength="20" placeholder="最多输入20位" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="密码" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" placeholder="密码" v-model="formLabelAlign.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('regionForm')">立即注册</el-button>
          <el-button @click="resetForm('regionForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  props: {
    dialogVisible: {
      required: true
    }
  },
  data() {
    var checkRePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }

      if (this.formLabelAlign.password == "") {
        callback();
      } else if (this.formLabelAlign.password !== value) {
        callback(new Error("确认密码和密码不一致"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        password: "",
        rePassword: ""
      },
      rules: {
        name: { required: true, message: "请输入用户名" },
        password: { required: true, message: "请输入密码" },
        rePassword: [
          { required: true, message: "请输入确认密码" },
          { validator: checkRePassword, trigger: 'blur' }
        ]
      }
    };
  },
  components: {},
  methods: {
    handleClose() {
      this.$refs["regionForm"].resetFields();
      this.$emit("hide", "regionDialog");
      return false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("hide", "regionDialog");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(1);
          this.$http
            .post("/api/user/region", {
              userName: this.formLabelAlign.name,
              password: this.formLabelAlign.password
            })
            .then(
              res => {
                this.$message({
                  type: "success",
                  message: "注册成功，欢迎登录"
                });
                this.$refs[formName].resetFields();
                this.$emit("hide", "regionDialog", "reset");
              },
              err => {
                console.log(err)
                this.$message({
                  type: "warning",
                  message: err.message
                });
              }
            );
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>
