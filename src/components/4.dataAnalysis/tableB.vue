<!-- 数据分析--表格(年度报警隐患统计) -->
<template>
  <div class="tableA">
    <el-table
    row-style="height:20px"  
    cell-style="padding:6px"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column align="center" prop="data" label="时间" width="300"></el-table-column>
      <el-table-column align="center" prop="wd" label="温度报警数量" width="310"></el-table-column>
      <el-table-column align="center" prop="ld" label="漏电报警数量" width="310"></el-table-column>
      <el-table-column align="center" prop="gz" label="故障报警数量" width="339"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pageA">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
    
</template>
<script>
 export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          wd: '5',
          ld: '12',
          gz: '20'
        }, {
          date: '2016-05-03',
          wd: '5',
          ld: '12',
          gz: '20'
        }, {
          date: '2016-05-03',
          wd: '5',
          ld: '12',
          gz: '20'
        }, {
          date: '2016-05-03',
          wd: '5',
          ld: '12',
          gz: '20'
        }, {
          date: '2016-05-03',
          wd: '5',
          ld: '12',
          gz: '20'
        }],
        multipleSelection: []
      }
    },
    methods: {
      // 表格 elementUI
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 表格 elementUI
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
  }
</script>
<style>
.pageA .el-pagination {
  display: inline-block;
  padding-top: 22px;
  /* margin-top: 27px; */
  /* margin-right: 46px; */
  float: right;
}
</style>
