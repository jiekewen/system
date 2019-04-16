<template>
  <!-- 年累积量报表 -->
  <div class="yearReportList1">
    <p class="first-box-title" style="background-color:#ab7cd1">年累积量报表</p>
    <div class="box-icon">
      <div class="box-icon-dataRing">
        <span>起始日期</span>
        <el-date-picker
          format="yyyy年"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="yearReport.startDate"
          type="year"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        ></el-date-picker>
      </div>
      <div class="box-icon-dataRing">
        <span>结束日期</span>
        <el-date-picker
          format="yyyy年"
          value-format="yyyy-"
          size="small"
          v-model="yearReport.endDate"
          type="year"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </div>
      <div class="box-icon-elButton">
        <el-button
          @click="yearReportRingView"
          size="medium"
          class="elButton"
          type="primary"
        >&nbsp;&nbsp;查看&nbsp;&nbsp;</el-button>
        <el-button
          @click="yearReportRingDownload"
          size="medium"
          class="elButton"
          type="info"
        >&nbsp;&nbsp;下载&nbsp;&nbsp;</el-button>
        <el-button @click="yearReportRingPrint" size="medium" class="elButton" type="info">在线打印</el-button>
        <!-- 查看弹窗 -->
        <el-dialog class="dialog-table" :title="dialogTitle" :visible.sync="dialogTableVisible">
          <!-- 弹出列表 -->
          <el-table border :data="dialogYearData">
            <el-table-column align="center" property="eidDescription" label="项目名称"></el-table-column>
            <el-table-column align="center" property="ncount" label="接入设备"></el-table-column>
            <el-table-column align="center" property="ecount" label="设备总数"></el-table-column>
            <el-table-column align="center" property="alerm1" label="报警类型1"></el-table-column>
            <el-table-column align="center" property="alermCount1" label="报警次数1"></el-table-column>
            <el-table-column align="center" property="alerm2" label="报警类型2"></el-table-column>
            <el-table-column align="center" property="alermCount2" label="报警次数2"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yearReport: { startDate: "", endDate: "" },
      // 禁选起始范围
      pickerOptions0: {
        disabledDate: time => {
          if (this.yearReport.endDate != "") {
            return time.getTime() > new Date(this.yearReport.endDate);
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      // 禁选结束范围
      pickerOptions1: {
        disabledDate: time => {
          if (this.yearReport.startDate != "") {
            return (
              time.getTime() < new Date(this.yearReport.startDate) ||
              time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      // 对话框标题
      dialogTitle: "",
      // 弹出dialog列表
      dialogYearData: [],
      // 是否可见
      dialogTableVisible: false
    };
  },
  methods: {
    // 查看
    yearReportRingView() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yearEndDate = this.yearReport.endDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = this.yearReport.startDate;
        yearSendData.endDate = yearEndDate;
        yearSendData.cycle = 3;
        // 发送请求
        this.$http
          .post("report/reportByDate", yearSendData)
          .then(response => {
            let resData = response.data.data;
            let dialogData = {};
            dialogData.eidDescription = resData.eidDescription;
            dialogData.ncount = resData.ncount;
            dialogData.ecount = resData.ecount;
            dialogData.alerm1 = resData.countResults[0].type;
            dialogData.alermCount1 = resData.countResults[0].count;
            dialogData.alerm2 = resData.countResults[1].type;
            dialogData.alermCount2 = resData.countResults[1].count;
            let xx = [];
            xx.push(dialogData);
            this.dialogYearData = xx;
            // 弹出窗标题
            this.dialogTitle =
              this.yearReport.startDate +
              " 至 " +
              yearEndDate +
              handleValue[0] +
              handleValue[1] +
              " 年累积量报表";
            this.dialogTableVisible = true;
          })
          .catch(err => {
            console.log("err", err);
            this.$alert("请求失败", "列表获取失败", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    // 下载
    yearReportRingDownload() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yearEndDate = this.yearReport.endDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = this.yearReport.startDate;
        yearSendData.endDate = yearEndDate;
        yearSendData.cycle = 3;
        // 发送请求
        this.$http
          .post("report/exportByDate", yearSendData)
          .then(response => {
            console.log("response", response);
          })
          .catch(err => {
            console.log("err", err);
            this.$alert("请求失败", "下载失败", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    // 在线打印
    async yearReportRingPrint() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.yearReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const yearEndDate = this.yearReport.endDate + "12-31";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let yearSendData = {};
        yearSendData.switchhouse = handleValue[0];
        yearSendData.category = handleValue[1];
        yearSendData.ocount = oCount;
        yearSendData.ecount = eCount;
        yearSendData.startDate = this.yearReport.startDate;
        yearSendData.endDate = yearEndDate;
        yearSendData.cycle = 3;
        // 发送请求
        await this.$http
          .post("report/reportByDate", yearSendData)
          .then(response => {
            if (response.data.code == 0) {
              let resData = response.data.data;
              let dialogData = {};
              dialogData.eidDescription = resData.eidDescription;
              dialogData.ncount = resData.ncount;
              dialogData.ecount = resData.ecount;
              dialogData.alerm1 = resData.countResults[0].type;
              dialogData.alermCount1 = resData.countResults[0].count;
              dialogData.alerm2 = resData.countResults[1].type;
              dialogData.alermCount2 = resData.countResults[1].count;
              // 弹出框标题
              this.$store.state.dayPrintTitle =
                this.yearReport.startDate +
                " 至 " +
                yearEndDate +
                handleValue[0] +
                handleValue[1] +
                " 年累积量报表";
              let dayPrint = [];
              dayPrint.push(dialogData);
              this.$store.state.dayPrint = dayPrint;
              this.$router.push({ path: "/reportPrint" });
            }
          })
          .catch(err => {
            this.$alert("请求失败", "打印请求失败", {
              confirmButtonText: "确定"
            });
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/6.systemReport/reportIcon";
</style>
<style lang="less">
.yearReportList1 {
  .dialog-table {
    .el-dialog__header {
      background-color: rgb(250, 236, 216);
    }
    .el-table {
      th {
        background-color: rgb(225, 243, 216); //#f0f9eb;
      }
    }
  }
}
</style>