<template>
  <div class="login">
    <!-- 登陆 -->
    <div class="login-submit">
      <form :model="formData">
        <div class="login-user">
          <label>用户名</label>
          <input @keyup.13="handleLogin" type="text" placeholder="用户名" v-model="formData.username">
        </div>
        <div>
          <label>密&nbsp;&nbsp;&nbsp;码</label>
          <input
            @keyup.13="handleLogin"
            type="password"
            placeholder="密码"
            v-model="formData.password"
          >
        </div>
        <input type="button" @click="handleLogin" value="登 录">
      </form>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 提交判断
    handleLogin() {
      if (this.formData.username !== "admin") {
        this.$alert("请输入正确用户名", "用户名不存在", {
          confirmButtonText: "确定",
        });
        return false;
      } else if (this.formData.password !== "123456") {
        this.$alert("请输入正确密码", "你输入的密码不正确", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        // sessionStorage.setItem("user", JSON.stringify(this.formData));
        this.$router.push("/home");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/login/login";
</style>
