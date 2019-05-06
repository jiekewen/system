<!-- 数据监控--实时报警 -->
<template>
  <div class="dataList">
    <marquee
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
      scrollAmount="2"
      width="400"
      direction="up"
      style="height:190px; margin-top: 14px;"
      align="absmiddle">
      <p class="data-list">{{dataList1}}</p>
      <p class="data-list">{{dataList2}}</p>
      <p class="data-list">{{dataList3}}</p>
      <p class="data-list">{{dataList4}}</p>
      <p class="data-list">{{dataList5}}</p>
      <p class="data-list">{{dataList6}}</p>
    </marquee>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList1: "",
      dataList2: "",
      dataList3: "",
      dataList4: "",
      dataList5: "",
      dataList6: "",
      tableData: []
    };
  },
  created() {
    // 获取报警列表数据
    const count = { amount: 8 };
    this.$http.get("homePage/getAlarmsByLimit", { params: count }).then(res => {
      this.tableData = res.data.data;
      this.dataList();
    });
  },
  methods: {
    dataList() {
      this.dataList1 =
        this.tableData[0].switchhouse +
        this.tableData[0].tds +
        this.tableData[0].alarmtype +
        "警报";
      this.dataList2 =
        this.tableData[1].switchhouse +
        this.tableData[1].tds +
        this.tableData[1].alarmtype +
        "警报";
      this.dataList3 =
        this.tableData[2].switchhouse +
        this.tableData[2].tds +
        this.tableData[2].alarmtype +
        "警报";
      this.dataList4 =
        this.tableData[3].switchhouse +
        this.tableData[3].tds +
        this.tableData[3].alarmtype +
        "警报";
      this.dataList5 =
        this.tableData[4].switchhouse +
        this.tableData[4].tds +
        this.tableData[4].alarmtype +
        "警报";
      this.dataList6 =
        this.tableData[5].switchhouse +
        this.tableData[5].tds +
        this.tableData[5].alarmtype +
        "警报";
    }
  }
};
</script>
<style lang="less" scoped>
.dataList {
  display: flex;
  padding: 0 5vw;
  p {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
  }
}
.dataList .marquee {
  margin-top: 5px;
}
</style>
