<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-19 11:56:38
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 14:57:07
--> 
<template>
  <el-dialog title="登录" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
    <div class="login-form-div">
      <el-form
        ref="loginForm"
        :label-position="labelPosition"
        label-width="80px"
        :rules="rules"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="用户名" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="密码" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          <el-button @click="resetForm('loginForm')">取消</el-button>
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
    return {
      
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        password: ""
      },
      rules: {
        name: { required: true, message: "请输入用户名" },
        password: { required: true, message: "请输入密码" }
      }
    };
  },
  components: {},
  methods: {
    handleClose() {
      this.$refs["loginForm"].resetFields();
      this.$emit("hide", "loginDialog");
      return false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("hide", "loginDialog");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/user/login", {
              userName: this.formLabelAlign.name,
              password: this.formLabelAlign.password
            })
            .then(
              res => {
                this.$message({
                  type: "success",
                  message: "登录成功"
                });
                this.$refs[formName].resetFields();
                this.$emit("hide", "loginDialog");
                sessionStorage.setItem('userName',res.userName);
              },
              err => {
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
