<!--
 * @Descripttion: 
 * @version: 
 * @Author: wqq
 * @Date: 2020-06-19 09:34:43
 * @LastEditors: wqq
 * @LastEditTime: 2020-06-19 10:53:51
--> 
<template>
  <div class="login-page bx">
    <div class="login-form-div">
      <div class="login-welcom">欢迎登录</div>
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
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post('/api/user/login',{
            userName:this.formLabelAlign.name,
            password:this.formLabelAlign.password
          }).then(res=>{
            
          },err=>{
            this.$message({
              type:'warning',
              message:err.message
            })
          })
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
.login-page {
  height: 100%;
  margin: 0;
  padding-top: 100px;
}
.login-form-div {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  padding: 50px;
}
.login-welcom {
  text-align: center;
  margin-bottom: 20px;
  color: #000;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 0 -3px 2px #ff3, 1px -5px 3px #fd3, -1px -6px 5px #f80,
    1px -9px 9px #f20;
}
</style>
