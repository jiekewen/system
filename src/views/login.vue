<template>
  <div class="login">
    <div class="login-top">
      <!-- 主题 -->
      <div class="login-title">
        <p>&nbsp;&nbsp;光&nbsp;谷&nbsp;电&nbsp;气&nbsp;（北&nbsp;京&nbsp;分&nbsp;公&nbsp;司）</p>
      </div>
      <!-- 登陆 -->
      <div class="login-submit">
        <p class="submit-title">电气安全云平台</p>
        <form :model="formData">
          <el-input
            @keyup.enter.native="handleLogin"
            v-model="formData.eid"
            class="submit-user"
            size="medium"
            placeholder="请输入您的EID"
          >
            <i slot="prefix" class="el-input_user">
              <img src="../../src/assets/images/login/login-user.png" alt />
            </i>
          </el-input>
          <el-input
            @keyup.enter.native="handleLogin"
            v-model="formData.username"
            class="submit-user"
            size="medium"
            placeholder="请输入您的用户名"
          >
            <i slot="prefix" class="el-input_user">
              <img src="../../src/assets/images/login/login-user.png" alt />
            </i>
          </el-input>
          <el-input
            @keyup.enter.native="handleLogin"
            type="password"
            v-model="formData.password"
            class="submit-passWord"
            size="medium"
            placeholder="请输入您的密码"
          >
            <i slot="prefix" class="el-input_password">
              <img src="../../src/assets/images/login/login-password.png" alt />
            </i>
          </el-input>
          <el-button type="danger" @click="handleLogin" class="submit-elBtn">登录</el-button>
        </form>
      </div>
    </div>
    <div class="login-bottom">
      <p>
        电气安全云平台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        版权所有&nbsp;&nbsp;
        武汉光谷电气有限公司
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      // 用户名密码
      formData: {
        eid: "Root",
        username: "Admin",
        password: "a123456"
      }
    };
  },
  methods: {
    // 提交判断
    handleLogin() {
      if (this.formData.eid == "") {
        this.$alert("请输入EID", "EID不能为空", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (this.formData.username == "") {
        this.$alert("请输入用户名", "用户名不能为空", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (this.formData.password == "") {
        this.$alert("请输入密码", "密码不能为空", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        localStorage.setItem("user", this.formData.username);
        localStorage.setItem("password", this.formData.password);
        this.$http
          .post("user/login", this.formData)
          .then(res => {
            localStorage.setItem("token", res.data.data.webtoken);
            localStorage.setItem("id", res.data.data.id);
            this.$router.push("/home");
            location.reload();
          })
          .catch(err => {
            localStorage.removeItem("token");
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/login/login";
</style>
<style lang="less">
.login {
  .login-top {
    // 输入框
    .el-input--prefix .el-input__inner {
      padding-left: 36px;
    }
  }
}
</style>
