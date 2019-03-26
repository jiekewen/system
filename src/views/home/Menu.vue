<template>
  <div class="NavMenu">
    <el-menu
      class="NavMenu-box"
      background-color="#14416E"
      text-color="#ddd"
      :default-active="$route.path"
      router
    >
      <el-menu-item class="nav-menu-item" index="/homePage">
        <i class="el-icon-setting"></i>
        <span slot="title">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 页</span>
      </el-menu-item>
      <el-menu-item class="nav-menu-item" index="/dataMonitor">
        <i class="el-icon-setting"></i>
        <span slot="title">数据监控</span>
      </el-menu-item>
      <!-- 二级报警管理 -->
      <el-submenu class="alarmManage" index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;报警管理
        </template>
        <el-menu-item class="nav-menu-item" index="/messageList">
          <i class="el-icon-setting"></i>
          <span slot="title" style="font-size:14px">消息列表</span>
        </el-menu-item>
        <el-menu-item class="nav-menu-item" index="/alarmConfig">
          <i class="el-icon-setting"></i>
          <span slot="title" style="font-size:14px">报警配置</span>
        </el-menu-item>
      </el-submenu>

      <el-menu-item class="nav-menu-item" index="/dataAnalysis">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <el-menu-item class="nav-menu-item" index="/systemLog">
        <i class="el-icon-setting"></i>
        <span slot="title">系统日志</span>
      </el-menu-item>
      <el-menu-item class="nav-menu-item" index="/systemReport">
        <i class="el-icon-setting"></i>
        <span slot="title">系统报表</span>
      </el-menu-item>
      <!-- 二级报警管理 -->
      <el-submenu style="overflow:hidden" index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;巡检管理
        </template>
        <el-menu-item class="nav-menu-item" index="/checkCalendar">
          <i class="el-icon-setting"></i>
          <span slot="title" style="font-size:14px">巡检日历</span>
        </el-menu-item>
        <el-menu-item class="nav-menu-item" index="/checkPlan">
          <i class="el-icon-setting"></i>
          <span slot="title" style="font-size:14px">巡检计划</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="nav-menu-item" index="/knowledge">
        <i class="el-icon-setting"></i>
        <span slot="title">知&nbsp;&nbsp;识&nbsp;&nbsp;库</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  watch: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/Menu";
</style>
<style>
/* 选中状态字体的颜色 */
.NavMenu .el-menu-item.is-active {
  background-color: rgb(11, 101, 211) !important;
  color: #fff;
}

.NavMenu .NavMenu-box .el-submenu__title {
  font-size: 16px;
}
</style>


