<template>
  <!-- 报警列表 -->
  <div class="alermList">
    <marquee
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
      scrollAmount="2"
      width="400"
      direction="up"
      style="height:13vh;"
      align="absmiddle"
    >
      <p>{{alermList1}}</p>
      <p>{{alermList2}}</p>
      <p>{{alermList3}}</p>
    </marquee>
    <marquee
      onMouseOut="this.start()"
      onMouseOver="this.stop()"
      scrollAmount="2"
      width="400"
      direction="up"
      style="height:13vh;"
      align="absmiddle"
    >
      <p>{{alermList4}}</p>
      <p>{{alermList5}}</p>
      <p>{{alermList6}}</p>
    </marquee>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 报警数据
      alermList1: "",
      alermList2: "",
      alermList3: "",
      alermList4: "",
      alermList5: "",
      alermList6: ""
    };
  },
  created() {
    // 获取报警列表数据
    const count = { amount: 8 };
    this.$http.get("homePage/getAlarmsByLimit", { params: count }).then(res => {
      this.tableData = res.data.data;
      this.alermList();
    });
  },
  methods: {
    // 报警数据拼接
    alermList() {
      this.alermList1 =
        this.tableData[0].switchhouse +
        this.tableData[0].tds +
        this.tableData[0].alarmtype +
        "警报";
      this.alermList2 =
        this.tableData[1].switchhouse +
        this.tableData[1].tds +
        this.tableData[1].alarmtype +
        "警报";
      this.alermList3 =
        this.tableData[2].switchhouse +
        this.tableData[2].tds +
        this.tableData[2].alarmtype +
        "警报";
      this.alermList4 =
        this.tableData[3].switchhouse +
        this.tableData[3].tds +
        this.tableData[3].alarmtype +
        "警报";
      this.alermList5 =
        this.tableData[4].switchhouse +
        this.tableData[4].tds +
        this.tableData[4].alarmtype +
        "警报";
      this.alermList6 =
        this.tableData[5].switchhouse +
        this.tableData[5].tds +
        this.tableData[5].alarmtype +
        "警报";
    }
  }
};
</script>
<style lang="less" scoped>
.alermList {
  display: flex;
  padding: 0 5vw;
  p {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
  }
}
</style>
