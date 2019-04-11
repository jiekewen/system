<template>
  <div class="homePage">
    <!-- 左半部分 -->
    <div class="homePage-leftHalf">
      <!-- 上部两个盒子 -->
      <div class="leftHalf-top">
        <div class="leftHalf-top-first">
          <p class="icon-box">当前在线设备</p>
          <p class="icon-box-number">{{onCount}}</p>
        </div>
        <div class="leftHalf-top-second">
          <p class="icon-box">当前失联设备</p>
          <p class="icon-box-number">{{offCount}}</p>
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
          <p class="icon-box-number">{{onLinePercent}}%</p>
        </div>
        <div class="rightHalf-top-second">
          <p class="icon-box">系统已正常运行</p>
          <p class="icon-box-number">
            {{onLineDays}}
            <span style="font-size:32px">天</span>
          </p>
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
        <alermList></alermList>
      </div>
    </div>
  </div>
</template>
<script>
// 地图
import bmap from "./bmap";
// 环图
import hpie from "./hpie";
// 报警
import alermList from "./alermList";
// 引入方法
import { toPercent } from "./toPercent";
export default {
  name: "HomePage",
  data() {
    return {
      onLineDays: "",
      offCount: "",
      onCount: "",
      onLinePercent: ""
    };
  },
  components: {
    bmap,
    hpie,
    alermList
  },
  created() {
    this.$http.get("homePage/getOnLineDays").then(res => {
      this.onLineDays = res.data.data;
    });
    // 创建websocket连接
    this.initWebSocket();
  },
  destroyed() {
    // 关闭websocket连接
    this.websocketclose();
  },
  mounted() {},
  methods: {
    // 开启websocket连接
    initWebSocket() {
      // 连接地址
      this.websock = new WebSocket(
        "ws://192.168.0.219:8002/netgate-server/serverSocket/Root"
      );
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
      console.log("连接开始时间：" + new Date());
    },
    websocketonerror() {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      // 接收数据

      let resData = e.data;
      let a = 2; //JSON.parse(resData).oCount;
      let b = 5; //JSON.parse(resData).eCount;
      this.offCount = b - a;
      this.onCount = a;
      this.$store.state.facility.onCount = a;
      this.$store.state.facility.offCount = b;
      this.onLinePercent = toPercent(a, b);
    },
    websocketclose() {
      console.log("连接关闭");
    }
  },
  computed: {
    // 计算百分比保留两位小数
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/1.homePage/homePage";
</style>


