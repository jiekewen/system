<template>
  <div class="home">
    <!-- 导航 -->
    <div class="nav">
      <div class="navLogo">
        <!-- 导航上logo -->
        <img src="../../assets/images/home/u8.png" alt>
      </div>
      <div class="navWrap">
        <Menu></Menu>
      </div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <!-- 头部 -->
      <div class="header">
        <Header></Header>
      </div>
      <router-view>主体部分</router-view>
    </div>
  </div>
</template>
<script>
// 头部
import Header from "./Header";
// 导航
import Menu from "./Menu";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Menu
  }
};
</script>
<style lang="less" scope>
@import "../../assets/css/home/home";
</style>


