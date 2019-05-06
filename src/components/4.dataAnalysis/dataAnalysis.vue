<!-- 数据分析 -->
<template>
  <div class="dataAnalysis" style="width: 1363px;">
    <!-- 上半部分 -->
    <div class="top_Analysis">
      <h3 class="test_data">月度报警隐患统计</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="曲线" name="first">
            <chartA></chartA>            
          </el-tab-pane>
          <el-tab-pane label="表格" name="second">
            <tableA></tableA>
          </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 下半部分 -->
    <div class="bottom_Analysis">
      <h3 class="test_data">年度报警隐患统计</h3>
      <el-tabs v-model="active" @tab-click="handle">
          <el-tab-pane label="曲线" name="first">
            <chartB></chartB>            
          </el-tab-pane>
          <el-tab-pane label="表格" name="second">
            <tableB></tableB>
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import chartA from './chartA'
import tableA from './tableA'
import chartB from './chartB'
import tableB from './tableB'

export default {
  name: "DataAnalysis",
  data() {
    return {
      activeName: 'first',
      active:'first'
    };
  },
  components: {
    chartA,
    tableA,
    chartB,
    tableB
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    handle(tab, event) {
        console.log(tab, event);
    }
  },
};
</script>
<style>
@import "../../assets/css/4.dataAnalysis/dataAnalysis";
/* 标题 */
.test_data {
  width: 100%;
  color: #5f5f5f;
  text-align: center;
  font-size: 20px;
  line-height: 32px;
}
/* 上半部分 */
.top_Analysis {
  margin-top: 28px;
  margin-left: 28px;
  margin-bottom: 18px;
  background: #ffffff;
  width: 96%;
  height: 395px;
}
.top_Analysis .el-tabs--top {
  padding: 0 20px 20px;
}
.top_Analysis .el-tabs--top .el-table {
  font-size: 12px;
}
/* .tableA .el-tabs--top .el-table .el-table__header tr,.el-table__header th {
    padding: 0;
    height: 20px;
}
.tableA .el-tabs--top .el-table .el-table__body tr,.el-table__body td {
    padding: 0;
    height: 35px;
} */

/* 下半部分 */
.bottom_Analysis {
  margin-top: 28px;
  margin-left: 28px;
  margin-bottom: 18px;
  background: #ffffff;
  width: 96%;
  height: 395px;
}
.bottom_Analysis .el-tabs--top {
  padding: 0 20px 20px;
}
.bottom_Analysis .el-tabs--top .el-table {
  font-size: 12px;
}
</style>