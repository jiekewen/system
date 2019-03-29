<template>
  <el-row>
    <el-col :span="8">
      <div class="Header-box1">
        <Date></Date>
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
          <img src="../../assets/images/home/u50.png" alt>
        </div>
        <div class="box3-warn">
          <img src="../../assets/images/home/u55.png" alt>
        </div>
        <div class="box3-warn">
          <img src="../../assets/images/home/u57.png" alt>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import Date from "./Date";
export default {
  data() {
    return {};
  },
  components: {
    Date
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home/Header";
</style>
