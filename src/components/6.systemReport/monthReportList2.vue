<template>
  <!-- 月报表 -->
  <div class="monthReportList2">
    <p class="first-box-title" style="background-color:#7cb7d1">月报表</p>
    <div class="box-icon">
      <div class="box-icon-dataRing">
        <span>选择日期</span>
        <el-date-picker
          format="yyyy年MM月"
          value-format="yyyy-MM"
          size="small"
          v-model="monthReportDate"
          type="month"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="box-icon-elButton">
        <el-button
          @click="monthReportView"
          size="medium"
          class="elButton"
          type="primary"
        >&nbsp;&nbsp;查看&nbsp;&nbsp;</el-button>
        <el-button
          @click="monthReportDownload"
          size="medium"
          class="elButton"
          type="info"
        >&nbsp;&nbsp;下载&nbsp;&nbsp;</el-button>
        <el-button @click="monthReportPrint" size="medium" class="elButton" type="info">在线打印</el-button>
        <!-- 查看弹窗 -->
        <el-dialog class="dialog-table" :title="dialogTitle" :visible.sync="dialogTableVisible">
          <el-table border :data="dialogMonthData">
            <!-- 弹出的列表 -->
            <el-table-column align="center" property="eidDescription" label="项目名称"></el-table-column>
            <el-table-column align="center" property="ncount" label="接入设备"></el-table-column>
            <el-table-column align="center" property="ecount" label="设备总数"></el-table-column>
            <el-table-column align="center" property="alerm1" label="报警类型(1)"></el-table-column>
            <el-table-column align="center" property="alermCount1" label="报警次数(1)"></el-table-column>
            <el-table-column align="center" property="alerm2" label="报警类型(2)"></el-table-column>
            <el-table-column align="center" property="alermCount2" label="报警次数(2)"></el-table-column>
            <el-table-column align="center" property="alerm3" label="报警类型(3)"></el-table-column>
            <el-table-column align="center" property="alermCount3" label="报警次数(3)"></el-table-column>
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
      // 日期选中值
      monthReportDate: "",
      // 禁选日期不能是今天以及以后的日期
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
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
  created() {},
  methods: {
    // 查看
    monthReportView() {
      if (!this.monthReportDate) {
        this.$alert("请先选择日期", "您没有选择日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        this.dialogTableVisible = true;
        const handleValue = this.$store.state.handleChangeData;
        const gDate1 = new Date(this.monthReportDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        // 拼接好的日期
        const gDate5 = this.monthReportDate + "-" + gDate4;
        const gDate5start = this.monthReportDate + "-01";

        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = gDate5start;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 5;
        //  发送请求
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
            console.log("xx", xx);

            // 标题;
            this.dialogMonthData = xx;
            this.dialogTitle =
              gDate5start +
              " 至 " +
              gDate5 +
              handleValue[0] +
              handleValue[1] +
              " 月报表";
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
    monthReportDownload() {
      if (!this.monthReportDate) {
        this.$alert("请先选择日期", "您没有选择日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        const gDate1 = new Date(this.monthReportDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        // 拼接好的日期
        const gDate5 = this.monthReportDate + "-" + gDate4;
        const gDate5start = this.monthReportDate + "-01";
        let oCount = this.$store.state.facility.onCount;
        let eCount = this.$store.state.facility.offCount;
        // 请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = gDate5start;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 5;
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
    // 在线打印
    async monthReportPrint() {
      if (!this.monthReportDate) {
        this.$alert("请先选择日期", "您没有选择日期", {
          confirmButtonText: "确定"
        });
        return false;
      } else {
        const handleValue = this.$store.state.handleChangeData;
        console.log("dayReportDate", this.monthReportDate);
        const gDate1 = new Date(this.monthReportDate);
        // 月份加一
        const gDate2 = new Date(gDate1.setMonth(gDate1.getMonth() + 1));
        // 日期减一
        const gDate3 = new Date(gDate2.setDate(gDate2.getDate() - 1));
        // 获取这个月底的日
        const gDate4 = gDate3.getDate();
        // 拼接好的日期
        const gDate5 = this.monthReportDate + "-" + gDate4;
        const gDate5start = this.monthReportDate + "-01";
        let oCount = this.$store.state.facility.oCount;
        let eCount = this.$store.state.facility.eCount;
        // 请求所需数据
        let monthSendData = {};
        monthSendData.switchhouse = handleValue[0];
        monthSendData.category = handleValue[1];
        monthSendData.ocount = oCount;
        monthSendData.ecount = eCount;
        monthSendData.startDate = gDate5start;
        monthSendData.endDate = gDate5;
        monthSendData.cycle = 5;
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
              // 报表标题
              this.$store.state.dayPrintTitle =
                this.monthReportDate +
                handleValue[0] +
                handleValue[1] +
                " 月报表";
              let dayPrint = [];
              dayPrint.push(dialogData);
              this.$store.state.dayPrint = dayPrint;
              sessionStorage.setItem(
                "title",
                JSON.stringify(this.$store.state.dayPrintTitle)
              );
              sessionStorage.setItem(
                "dialogData",
                JSON.stringify(this.$store.state.dayPrint)
              );
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
.monthReportList2 {
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
