<template>
  <!-- 月累积量报表 -->
  <div class="monthReportList1">
    <p class="first-box-title" style="background-color:#7cb7d1">月累积量报表</p>
    <div class="box-icon">
      <div class="box-icon-dataRing">
        <span>起始日期</span>
        <el-date-picker
          format="yyyy年MM月"
          value-format="yyyy-MM-dd"
          size="small"
          v-model="monthReport.startDate"
          type="month"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        ></el-date-picker>
      </div>
      <div class="box-icon-dataRing">
        <span>结束日期</span>
        <el-date-picker
          format="yyyy年MM月"
          value-format="yyyy-MM"
          size="small"
          v-model="monthReport.endDate"
          type="month"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </div>
      <div class="box-icon-elButton">
        <el-button
          @click="monthReportRingView"
          size="medium"
          class="elButton"
          type="primary"
        >&nbsp;&nbsp;查看&nbsp;&nbsp;</el-button>
        <el-button
          @click="monthReportRingDownload"
          size="medium"
          class="elButton"
          type="info"
        >&nbsp;&nbsp;下载&nbsp;&nbsp;</el-button>
        <el-button @click="monthReportRingPrint" size="medium" class="elButton" type="info">在线打印</el-button>
        <!-- 查看弹窗 -->
        <el-dialog class="dialog-table" :title="dialogTitle" :visible.sync="dialogTableVisible">
          <el-table border :data="dialogMonthData">
            <!-- 弹出的列表 -->
            <el-table-column align="center" property="eidDescription" label="项目名称"></el-table-column>
            <el-table-column align="center" property="ncount" label="接入设备"></el-table-column>
            <el-table-column align="center" property="ecount" label="设备总数"></el-table-column>
            <el-table-column align="center" property="alerm1" label="报警类型1"></el-table-column>
            <el-table-column align="center" property="alermCount1" label="报警次数1"></el-table-column>
            <el-table-column align="center" property="alerm2" label="报警类型2"></el-table-column>
            <el-table-column align="center" property="alermCount2" label="报警次数2"></el-table-column>
            <el-table-column align="center" property="alerm3" label="报警类型3"></el-table-column>
            <el-table-column align="center" property="alermCount3" label="报警次数3"></el-table-column>
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
      monthReport: { startDate: "", endDate: "" },
      // 禁选起始范围
      pickerOptions0: {
        disabledDate: time => {
          if (this.monthReport.endDate != "") {
            return time.getTime() > new Date(this.monthReport.endDate);
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      // 禁选结束范围
      pickerOptions1: {
        disabledDate: time => {
          if (this.monthReport.startDate != "") {
            return (
              time.getTime() < new Date(this.monthReport.startDate) ||
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
      dialogMonthData: [],
      // 是否可见
      dialogTableVisible: false
    };
  },
  methods: {
    // 跳转判断
    judge() {
      if (!this.monthReport.startDate) {
        this.$alert("请先选择起始日期", "您没有选择起始日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else if (!this.monthReport.endDate) {
        this.$alert("请先选择结束日期", "您没有选择结束日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        return true;
      }
    },
    // 查看
    monthReportRingView() {
      if (!this.judge()) {
        return false;
      } else {
        console.log("this.monthReport.endDate", this.monthReport.endDate);

        const handleValue = this.$store.state.handleChangeData;
        const gDate1 = new Date(this.monthReport.endDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        console.log("gDate4", gDate4);

        // 拼接好的日期
        const gDate5 = this.monthReport.endDate + "-" + gDate4;
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 发送请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = this.monthReport.startDate;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 2;
        // 发送数据
        this.$http
          .post("report/reportByDate", monthSendData)
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
            dialogData.alerm3 = resData.countResults[2].type;
            dialogData.alermCount3 = resData.countResults[2].count;
            let xx = [];
            xx.push(dialogData);
            this.dialogMonthData = xx;
            // 弹窗标题
            this.dialogTitle =
              this.monthReport.startDate +
              " 至 " +
              gDate5 +
              handleValue[0] +
              handleValue[1] +
              " 月累积量报表";
            this.dialogTableVisible = true;
          })
          .catch(err => {
            console.log("err", err);
            this.$alert("请求失败", "获取列表失败", {
              confirmButtonText: "确定"
            });
          });
      }
    },
    //下载
    monthReportRingDownload() {
      if (!this.judge()) {
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const gDate1 = new Date(this.monthReport.endDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        // 拼接好的日期
        const gDate5 = this.monthReport.endDate + "-" + gDate4;
        let oCount = this.$store.state.facility.onCount;
        let eCount = this.$store.state.facility.offCount;
        // 发送请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = this.monthReport.startDate;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 2;
        // 发送请求
        this.$http
          .post("report/exportByDate", monthSendData)
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
    async monthReportRingPrint() {
      if (!this.judge()) {
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const gDate1 = new Date(this.monthReport.endDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        // 拼接好的日期
        const gDate5 = this.monthReport.endDate + "-" + gDate4;
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = this.monthReport.startDate;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 2;
        // 发送请求
        await this.$http
          .post("report/reportByDate", monthSendData)
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
              dialogData.alerm3 = resData.countResults[2].type;
              dialogData.alermCount3 = resData.countResults[2].count;
              // 标题部分
              this.$store.state.dayPrintTitle =
                this.monthReport.startDate +
                " 至 " +
                gDate5 +
                handleValue[0] +
                handleValue[1] +
                " 月累积量报表";
              let dayPrint = [];
              dayPrint.push(dialogData);
              this.$store.state.dayPrint = dayPrint;
              this.$router.push({ path: "/reportPrint" });

              sessionStorage.setItem(
                "title",
                JSON.stringify(this.$store.state.dayPrintTitle)
              );
              sessionStorage.setItem(
                "dialogData",
                JSON.stringify(this.$store.state.dayPrint)
              );
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
.monthReportList1 {
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
