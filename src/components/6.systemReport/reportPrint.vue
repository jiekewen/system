<template>
  <!-- 打印界面 -->
  <div class="reportPrint">
    <div class="reportPrint-table">
      <h3>{{printTitle}}</h3>
      <el-table border :data="dialogDayData">
        <!-- 打印列表 -->
        <el-table-column align="center" property="eidDescription" label="项目名称"></el-table-column>
        <el-table-column align="center" property="ncount" label="接入设备"></el-table-column>
        <el-table-column align="center" property="ecount" label="设备总数"></el-table-column>
        <el-table-column align="center" property="alerm1" label="报警类型(1)"></el-table-column>
        <el-table-column align="center" property="alermCount1" label="报警次数(1)"></el-table-column>
        <el-table-column align="center" property="alerm2" label="报警类型(2)"></el-table-column>
        <el-table-column align="center" property="alermCount2" label="报警次数(2)"></el-table-column>
      </el-table>
    </div>
    <div id="reportPrintBtn">
      <el-button @click="returnReport" type="primary" plain>返回</el-button>
      <el-button @click="print" type="warning" plain>确认打印</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 列表数据
      dialogDayData: [],
      printTitle: ""
    };
  },
  created() {
    this.dialogDayData = JSON.parse(sessionStorage.getItem("dialogData"));
    // 打印标题
    this.printTitle = JSON.parse(sessionStorage.getItem("title"));
  },
  mounted() {},
  methods: {
    returnReport() {
      // 返回跳转系统报表界面
      this.$router.push({ path: "/systemReport" });
    },
    async print() {
      // 打印时隐藏不相关的按钮部分
      var reportPrintBtn = document.getElementById("reportPrintBtn");
      reportPrintBtn.style.display = "none";
      window.print();
      await location.reload();
    }
  }
};
</script>
<style lang="less">
.reportPrint {
  text-align: center;
  .reportPrint-table {
    margin: 0 auto;
    padding-top: 10%;
    .el-table {
      width: 800px;
      margin: 0 auto;
      text-align: center;
      border: 2px solid #666;
      margin-top: 20px;
      th {
        background-color: rgb(225, 243, 216); //#f0f9eb;
      }
    }
  }
  #reportPrintBtn {
    margin-top: 10%;
    text-align: center;
  }
}
</style>
