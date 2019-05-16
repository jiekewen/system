<!-- 数据分析 -->
<template>
  <div class="dataAnalysis" style="width: 1363px;">
    <!-- 上半部分 -->
    <dataContent1></dataContent1>
    <!-- 下半部分 -->
    <dataContent2></dataContent2>
    
  </div>
</template>
<script>
import dataContent1 from './dataContent1'
import dataContent2 from './dataContent2'

export default {
  name: "DataAnalysis",
  data() {
    return {
      activeName: 'first',
      active:'first'
    };
  },
  components: {
    dataContent1,
    dataContent2
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
.pageA .el-pagination {
  display: inline-block;
  padding-top: 22px;
  /* margin-top: 27px; */
  /* margin-right: 46px; */
  float: right;
}
</style>