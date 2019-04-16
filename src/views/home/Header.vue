<template>
  <!-- 页面头部 -->
  <el-row>
    <el-col :span="8">
      <div class="Header-box1">
        <div class="progress-day">安全运行&nbsp;{{onLineDays}}&nbsp;天</div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="Header-box2">
        <h1 class="box2-title">电气安全云平台系统</h1>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="Header-box3">
        <div class="box3-warn">
          <router-link :to="{ path: 'messageList' }">
            <img src="../../assets/images/home/alerm-count-icon.png" alt>
          </router-link>
        </div>
        <div>
          <!-- 报警数量 -->
          <router-link :to="{ path: 'messageList' }">
            <el-badge :value="alerm.count" class="item-badge"></el-badge>
          </router-link>
        </div>
        <div class="box3-warn">
          <!-- 用户设置 -->
          <router-link :to="{ path: 'user' }">
            <img src="../../assets/images/home/user-icon.png" alt>
          </router-link>
        </div>
        <div class="user-name">
          <router-link :to="{ path: 'user' }">{{this.$store.state.user}}</router-link>
        </div>
        <div class="box3-warn">
          <img src="../../assets/images/home/set-message-icon.png" alt>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      alerm: {
        count: 0
      },
      onLineDays: ""
    };
  },
  components: {},
  created() {
    // 获取报警数量
    this.$http.get("homePage/UnReadCount").then(res => {
      this.alerm.count = res.data.data;
    }),
      // 获取安全天数
      this.$http.get("homePage/getOnLineDays").then(res => {
        this.onLineDays = res.data.data;
      });
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/Header";
</style>
