<template>
  <div class="homePage">
    <!-- 左半部分 -->
    <div class="homePage-leftHalf">
      <!-- 上部两个盒子 -->
      <div class="leftHalf-top">
        <div class="leftHalf-top-first">
          <p class="icon-box">当前在线设备</p>
          <p class="icon-box-number">8800</p>
        </div>
        <div class="leftHalf-top-second">
          <p class="icon-box">当前失联设备</p>
          <p class="icon-box-number">8800</p>
        </div>
      </div>
      <!-- 下部地图部分 -->
      <div class="leftHalf-map">
        <bmap></bmap>
      </div>
    </div>
    <!-- 右半部分 -->
    <div class="homePage-rightHalf">
      <!-- 上部两个盒子 -->
      <div class="rightHalf-top">
        <div class="rightHalf-top-first">
          <p class="icon-box">当前设备在线率</p>
          <p class="icon-box-number">99.99%</p>
        </div>
        <div class="rightHalf-top-second">
          <p class="icon-box">系统已正常运行</p>
          <p class="icon-box-number">8800天</p>
        </div>
      </div>
      <!-- 下部两个盒子 -->
      <!-- 绘制环图 -->
      <div class="rightHalf-ring">
        <p>电气火灾设备分布</p>
        <div class="rightHalf-drawRing">
          <hpie></hpie>
        </div>
      </div>
      <!-- 实时报警 -->
      <div class="rightHalf-alarm">
        <p>实时报警</p>
        <div class="alarm-marquee">
          <marquee
            onMouseOut="this.start()"
            onMouseOver="this.stop()"
            scrollAmount="2"
            width="380"
            direction="up"
            style="height:22vh;"
          >
            <p>你真帅！{{marquee.data}}</p>
            <p>你真帅！{{marquee.data}}</p>
            <p>你真帅！{{marquee.data}}</p>
          </marquee>
          <marquee
            onMouseOut="this.start()"
            onMouseOver="this.stop()"
            scrollAmount="2"
            width="380"
            direction="up"
            style="height:22vh;margin-left:20px"
          >
            <p>你真帅！</p>
            <p>你真帅！</p>
            <p>你真帅！</p>
          </marquee>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 地图
import bmap from "./bmap";
// 环图
import hpie from "./hpie";
export default {
  name: "HomePage",
  data() {
    return {
      marquee: {
        data: "报警"
      }
    };
  },
  components: {
    bmap,
    hpie
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/1.homePage/homePage";
</style>

