<template>
  <!-- 页面头部 -->
  <div class="Header">
    <!-- 安全运行天数 -->
    <div class="Header-box1">
      <div class="progress-day">安全运行&nbsp;{{onLineDays}}&nbsp;天</div>
    </div>
    <!-- 主标题 -->
    <div class="Header-box2">
      <h1 class="box2-title">电气安全云平台系统</h1>
    </div>
    <!-- 个人中心 -->
    <div class="Header-box3">
      <router-link :to="{ path: '/messageList' }">
        <img src="../../assets/images/home/alerm-count-icon.png" alt>
        <!-- 报警数量 -->
        <el-badge :value="alerm.count" class="item-badge"></el-badge>
      </router-link>
      <img src="../../assets/images/home/user-icon.png" alt>
      <el-dropdown size="small" placement="bottom-start" trigger="click">
        <!-- 登录人 -->
        <button class="user-name-btn">
          {{this.$store.state.user}}
          <i class="el-icon-arrow-down"></i>
        </button>
        <el-dropdown-menu style="margin-top:-20px" slot="dropdown">
          <el-dropdown-item style="border-bottom:1px solid #ccc;">
            <router-link :to="{ path: '/user' }">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/' }">退出登录</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 超级用户按钮 -->
      <button @click="tableShow" class="control-btn">
        <img src="../../assets/images/home/set-message-icon.png" alt>
      </button>
    </div>
  </div>
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
  },
  methods: {
    tableShow() {
      this.$router.push("/tableShow");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/Header";
</style>

