<!-- 系统日志 -->
<template>
  <div class="systemLog">
    <h3 class="alerm-test">系统日志</h3>
    <systemPage class="system-content">
      <!-- 表格 -->
      <div class="table_system">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          stripe
          size="mini"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange">
          >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column align="center" prop="module" label="模块" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="username" label="用户" width="190"></el-table-column>
          <el-table-column align="center" prop="action" label="内容" width="450" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="actiontime" label="记录时间" :formatter="formatAlarmtime"></el-table-column>
        </el-table>
      </div> 
      <!-- 分页 -->
      <div class="page_log">
          <el-pagination
            @current-change="pageChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="total"
            background>
          </el-pagination>
      </div>
    </systemPage>
  </div>
</template>
<script>
import systemPage from './systemPage'
export default {
  name: "SystemLog",
  data() {
    return {
      total:0,//默认数据总数
      pagesize:12,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: [],
      multipleSelection: []
    };
  },
  components: {
    systemPage
  },
  created() {
    // 列表数据
    this.getTableList();
  },
  methods: { 
    //查询列表
    getTableList () {
      //查询参数
      var tableList = {
        "pageSize" : this.pagesize,
        "pageNum" : this.currentPage,
      }
      //查询方法  
      this.$http
      .post("operationlog/getOperationLogs", tableList)
      .then(response => {
        console.log("response", response);
        if(response.status == "200"){
          if (response.data.code == 0 && response.data.data.length > 0) {
            //返回值填充页面
            this.tableData = response.data.data;
            this.getTableTotal();
          }else{
            this.total=0;
            this.pagesize=10;
            this.currentPage=1;
            this.tableData=[];
          }
        }else{
          this.$alert("获取列表失败", {
                confirmButtonText: "确定"
              });
          this.total=0;
          this.pagesize=10;
          this.currentPage=1;
          this.tableData=[];
        }
      })
    },
    //记录时间
    formatAlarmtime: function (row, column) {
        var time = row.actiontime;
        time = time.replace("T", " ").split('.')[0];
          return time;
    },
    //获取报警总数-分页
    getTableTotal(val){
      this.$http
        .get('operationlog/getOperationLogCount')
        .then(response => {
          // console.log("response1", response);
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.total = response.data.data;
            }
          } else {
             this.$alert("获取列表总数获取失败", {
              confirmButtonText: "确定"
            });
            this.total = 0;
          }
        })
    },
    //改变页码
    pageChange(val) {
      this.currentPage = parseInt(val);
      this.getTableList();
    },



    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
@import "../../assets/css/5.systemLog/systemLog";
.alerm-test {
    width: 100%;
    color: #5f5f5f;
    text-align: center;
    font-size: 24px;
    line-height: 66px;
}
.system-content {
  margin: 0 auto;
  width: 98%;
  height: 100%;
  background: #ffffff;
}
.table_system {
  padding: 17px 25px;
}
.page_log {
  display: inline-block;
  margin-top: -7px;
  margin-right: 46px;
  float: right;
}
</style>