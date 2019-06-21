<template>
  <div class="homePage">
    <!-- 左半部分 -->
    <div class="homePage-leftHalf">
      <!-- 上部两个盒子 -->
      <div class="leftHalf-top">
        <div class="leftHalf-top-first">
          <p class="icon-box">当前在线设备</p>
          <p class="icon-box-number">{{onLine}}</p>
        </div>
        <div class="leftHalf-top-second">
          <p class="icon-box">当前失联设备</p>
          <p class="icon-box-number">{{outLine}}</p>
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
          <p class="icon-box-number">{{toPercent}}%</p>
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

export default {
  name: "HomePage",
  data() {
    return {
      onLineDays: "",
      outLine: "", //失联设备
      onLine: "", //在线设备
      allLine: "", //所有设备
      websock: null //websocket数据
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
  },
  mounted() {
    // 创建websocket连接
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },

  methods: {
    // 开启websocket连接
    initWebSocket() {
      // 连接地址
      this.websock = new WebSocket(
        "ws://101.201.73.248:8002/netgate-server/serverSocket/Root"
      );
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror() {
      //连接建立失败重连++++
      this.initWebSocket();
    },
    websocketonmessage(e) {
      // console.log("连接数据");
      const resData = JSON.parse(e.data);
      // 接收数据
      if (resData.oCount != undefined && resData.oCount != 0) {
        sessionStorage.setItem("out", resData.oCount);
        sessionStorage.setItem("all", resData.eCount);
        this.outLine = sessionStorage.getItem("out");
        this.allLine = sessionStorage.getItem("all");
        this.onLine = this.allLine - this.outLine;
      } else {
        this.outLine = sessionStorage.getItem("out");
        this.allLine = sessionStorage.getItem("all");
        this.onLine = this.allLine - this.outLine;
      }
    },
    websocketclose() {
      console.log("连接关闭");
    }
  },
  computed: {
    // 计算百分比保留两位小数
    toPercent() {
      if (this.allLine != 0) {
        return ((this.allLine - this.outLine) / this.allLine).toFixed(2);
      } else {
        return 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/1.homePage/homePage";
</style>


