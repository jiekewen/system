<template>
  <!-- 日累积量报表 -->
  <div class="dayReportList1">
    <!-- 标题 -->
    <p class="first-box-title">日累积量报表</p>
    <div class="box-icon">
      <div class="box-icon-dataRing">
        <span>起始日期</span>
        <!-- 日期选择 -->
        <el-date-picker
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="dayReport.startDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        ></el-date-picker>
      </div>
      <div class="box-icon-dataRing">
        <span>结束日期</span>
        <el-date-picker
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="dayReport.endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </div>
      <div class="box-icon-elButton">
        <el-button
          @click="dayReportRingView"
          size="medium"
          class="elButton"
          type="primary"
        >&nbsp;&nbsp;查看&nbsp;&nbsp;</el-button>
        <el-button
          @click="dayReportRingDownload"
          size="medium"
          class="elButton"
          type="info"
        >&nbsp;&nbsp;下载&nbsp;&nbsp;</el-button>
        <el-button @click="dayReportRingPrint" size="medium" class="elButton" type="info">在线打印</el-button>
        <!-- 查看弹窗 -->
        <el-dialog class="dialog-table" :title="dialogTitle" :visible.sync="dialogTableVisible">
          <el-table border :data="dialogDayData">
            <!-- 弹出的渲染列表 -->
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
      dayReport: { startDate: "", endDate: "" },

      // 禁选起始范围
      pickerOptions0: {
        disabledDate: time => {
          if (this.dayReport.endDate != "") {
            return time.getTime() > new Date(this.dayReport.endDate);
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      // 禁选结束范围
      pickerOptions1: {
        disabledDate: time => {
          if (this.dayReport.startDate != "") {
            return (
              time.getTime() < new Date(this.dayReport.startDate) ||
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
      dialogDayData: [],
      // 是否可见
      dialogTableVisible: false
    };
  },
  methods: {
    // 查看
    dayReportRingView() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;

        // 需要的发送数据
        let daySendData = {};
        daySendData.switchhouse = handleValue[0];
        daySendData.category = handleValue[1];
        daySendData.ocount = oCount;
        daySendData.ecount = eCount;
        daySendData.startDate = this.dayReport.startDate;
        daySendData.endDate = this.dayReport.endDate;
        daySendData.cycle = 1;
        console.log("daySendData", daySendData);
        // 发送请求
        this.$http
          .post("report/reportByDate", daySendData)
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
            console.log("dialogData", dialogData);
            let xx = [];
            xx.push(dialogData);
            console.log("xx", xx);
            this.dialogDayData = xx;
            this.dialogTitle =
              this.dayReport.startDate +
              " 至 " +
              this.dayReport.endDate +
              handleValue[0] +
              handleValue[1] +
              " 日累积量报表";
            this.dialogTableVisible = true;
            console.log("this.dialogDayData", this.dialogDayData);
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
    dayReportRingDownload() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        let oCount = this.$store.state.facility.onCount;
        let eCount = this.$store.state.facility.offCount;
        // 需要的发送数据
        let daySendData = {};
        daySendData.switchhouse = handleValue[0];
        daySendData.category = handleValue[1];
        daySendData.ocount = oCount;
        daySendData.ecount = eCount;
        daySendData.startDate = this.dayReport.startDate;
        daySendData.endDate = this.dayReport.endDate;
        daySendData.cycle = 1;
        console.log("daySendData", daySendData);
        // 发送请求
        this.$http
          .post("report/exportByDate", daySendData)
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
    async dayReportRingPrint() {
      if (!this.$store.state.handleChangeData) {
        this.$alert("请先选择区域", "您没有选择区域", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.dayReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 设置发送数据
        let daySendData = {};
        daySendData.switchhouse = handleValue[0];
        daySendData.category = handleValue[1];
        daySendData.ocount = oCount;
        daySendData.ecount = eCount;
        daySendData.startDate = this.dayReportDate;
        daySendData.endDate = this.dayReportDate;
        daySendData.cycle = 1;
        // 发送请求
        await this.$http
          .post("report/reportByDate", daySendData)
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
              // 表格标题
              this.$store.state.dayPrintTitle =
                this.dayReport.startDate +
                " 至 " +
                this.dayReport.endDate +
                handleValue[0] +
                handleValue[1] +
                " 日累积量报表";
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
.dayReportList1 {
  // 查看的弹出框
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

