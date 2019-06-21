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
      <div class="roll-box" @click="alermPush">
        <div>
          <p class="tebie">{{this.zz1}}</p>
          <p class="tebie">{{this.zz2}}</p>
          <p class="tebie">{{this.zz3}}</p>
          <p class="tebie">{{this.zz4}}</p>
        </div>
      </div>
    </marquee>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zz1: "",
      zz2: "",
      zz3: "",
      zz4: "",
      // 报警数据
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableTime: []
    };
  },
  created() {
    // 获取报警列表数据
    const count = { amount: 8 };
    this.$http.get("homePage/getAlarmsByLimit", { params: count }).then(res => {
      this.tableData = res.data.data;
      this.tableData1 = this.tableData.slice(0, 4);
      this.tableData.forEach(element => {
        var a = element.switchhouse;
        var b = element.category;
        var c = element.tds;
        var d = element.alarmtype;
        var time = element.alarmtime;
        time = time.replace("T", " ").split(".")[0];
        this.tableTime.push(time, a, b, c, d); //时间，区域，类别,测点,报警类型
      });
      // console.log("this.tableTime", this.tableTime);
      this.zz1 = this.sliceArr(0, 5, this.tableTime);
      this.zz2 = this.sliceArr(5, 10, this.tableTime);
      this.zz3 = this.sliceArr(10, 15, this.tableTime);
      this.zz4 = this.sliceArr(15, 20, this.tableTime);
      this.tableData2 = this.tableData.slice(4, this.tableData.length);
    });
  },
  methods: {
    alermPush() {
      this.$router.push("/messageList");
    },
    // 分割数组
    sliceArr(start, end, arr) {
      const newArr = arr.slice(start, end);
      var str = "";
      for (var i = 0; i < newArr.length; i++) {
        str = str + " " + newArr[i];
      }
      return str;
    }
  }
};
</script>
<style lang="less" scoped>
.alermList {
  text-align: center;
  .roll-box {
    display: flex;
    cursor: pointer;
    .tebie {
      height: 4vh;
      line-height: 4vh;
      font-size: 14px;
      color: #333;
      font-family: serif;
      margin-left: 5vw;
    }
  }
}
</style>
