<template>
  <!-- 报警列表 -->
  <div class="alermList">
    <marquee
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
      scrollAmount="2"
      direction="up"
      winth="400"
      style="height:13vh;width:40vw"
      align="absmiddle"
    >
      <div class="roll-box">
        <div class="roll-box-left">
          <p
            :key="index"
            v-for="(item,index) in tableData1"
          >{{item.switchhouse}}&nbsp;{{item.category}}&nbsp;{{item.tds}}&nbsp;{{item.alarmtype}}</p>
        </div>
        <div class="roll-box-right">
          <p
            :key="index"
            v-for="(item,index) in tableData2"
          >{{item.switchhouse}}&nbsp;{{item.category}}&nbsp;{{item.tds}}&nbsp;{{item.alarmtype}}</p>
        </div>
      </div>
    </marquee>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 报警数据
      tableData: [],
      tableData1: [],
      tableData2: []
    };
  },
  created() {
    // 获取报警列表数据
    const count = { amount: 8 };
    this.$http.get("homePage/getAlarmsByLimit", { params: count }).then(res => {
      this.tableData = res.data.data;
      this.tableData1 = this.tableData.slice(0, 4);
      this.tableData2 = this.tableData.slice(4, this.tableData.length);
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.alermList {
  .roll-box {
    display: flex;
    .roll-box-left {
      margin-left: 4vw;
      p {
        height: 4vh;
        line-height: 4vh;
        font-size: 12px;
        color: #777;
        font-family: serif;
      }
    }
    .roll-box-right {
      margin-left: 4vw;
      p {
        height: 4vh;
        line-height: 4vh;
        font-size: 12px;
        color: #777;
        font-family: serif;
      }
    }
  }
}
</style>
