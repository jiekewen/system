<template>
  <div class="NavMenu">
    <!-- 导航部分 -->
    <el-menu
      class="NavMenu-box"
      background-color="#2C3C51"
      text-color="#ddd"
      :default-active="$route.path"
      router
    >
      <!-- 首页 -->
      <el-menu-item class="nav-menu-item" index="/homePage">
        <i class="el-icon-office-building"></i>
        <span slot="title">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 页</span>
      </el-menu-item>
      <!-- 数据监控 -->
      <el-menu-item class="nav-menu-item" index="/dataMonitor">
        <i class="el-icon-help"></i>
        <span slot="title">数据监控</span>
      </el-menu-item>
      <!-- 二级报警管理 -->
      <el-submenu class="alarmManage" index="1">
        <template slot="title">
          <i class="el-icon-bell"></i>&nbsp;&nbsp;&nbsp;报警管理
        </template>
        <el-menu-item class="nav-menu-item" index="/messageList">
          <i class="el-icon-bank-card"></i>
          <span slot="title" style="font-size:14px">消息列表</span>
        </el-menu-item>
        <el-menu-item class="nav-menu-item" index="/alarmConfig">
          <i class="el-icon-set-up"></i>
          <span slot="title" style="font-size:14px">报警配置</span>
        </el-menu-item>
      </el-submenu>
      <!-- 数据分析 -->
      <el-menu-item class="nav-menu-item" index="/dataAnalysis">
        <i class="el-icon-document"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <!-- 系统日志 -->
      <el-menu-item class="nav-menu-item" index="/systemLog">
        <i class="el-icon-date"></i>
        <span slot="title">系统日志</span>
      </el-menu-item>
      <!-- 系统报表 -->
      <el-menu-item class="nav-menu-item" index="/systemReport">
        <i class="el-icon-printer"></i>
        <span slot="title">系统报表</span>
      </el-menu-item>
      <!-- 二级巡检管理 -->
      <el-submenu style="overflow:hidden" index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>&nbsp;&nbsp;&nbsp;巡检管理
        </template>
        <el-menu-item class="nav-menu-item" index="/checkCalendar">
          <i class="el-icon-notebook-2"></i>
          <span slot="title" style="font-size:14px">巡检记录</span>
        </el-menu-item>
        <el-menu-item class="nav-menu-item" index="/checkPlan">
          <i class="el-icon-notebook-1"></i>
          <span slot="title" style="font-size:14px">巡检计划</span>
        </el-menu-item>
      </el-submenu>
      <!-- 分类设置 -->
      <el-menu-item class="nav-menu-item" index="/sortConfig">
        <i class="el-icon-coin"></i>
        <span slot="title">分类设置</span>
      </el-menu-item>
      <!-- 知识库 -->
      <!-- <el-menu-item class="nav-menu-item" index="/knowledge">
        <i class="el-icon-reading"></i>
        <span slot="title">知&nbsp;识&nbsp;库</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/Menu";
</style>
<style>
/* 选中状态字体的颜色 */
.NavMenu .el-menu-item.is-active {
  background-color: #1a1e24 !important;
  color: #fff;
  border-right: 3px solid #689df9 !important;
}
/* 导航字体 */
.NavMenu .NavMenu-box .el-submenu__title {
  font-size: 16px;
}
</style>


