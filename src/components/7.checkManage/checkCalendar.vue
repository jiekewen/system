<template>
  <!-- 巡检记录 -->
  <div class="checkCalendar">
    <div class="calendar-header">
      <h3>巡检记录</h3>
    </div>
    <div class="checkCalendar-wrap">
      <!-- 下部列表 -->
      <div class="wrap-table">
        <el-table :data="tableData" style="width:100%;" @current-change="handleCurrentChange">
          <el-table-column align="center" label="序号" type="index" width="100"></el-table-column>
          <el-table-column prop="name" label="巡检项目名称">我司日常检查</el-table-column>
          <el-table-column prop="name" label="巡检类型">正常巡检</el-table-column>
          <el-table-column prop="name" label="巡检内容">对强电场电气火灾接线</el-table-column>
          <el-table-column prop="name" label="巡检范围">小区</el-table-column>
          <el-table-column prop="name" label="巡检人">admin</el-table-column>
          <el-table-column prop="name" label="状态">未执行</el-table-column>
          <el-table-column prop="date" label="完成时间"></el-table-column>
          <el-table-column align="center" prop="tag" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)"
                :type="scope.row.tag === '未执行' ? 'warning' : 'primary'"
                disable-transitions
                size="mini"
              >{{scope.row.tag}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="wrap-table-page">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckCalendar",
  data() {
    return {
      tableData: [
        // {
        //   alarmlimit: 5,
        //   alarmtime: "2019-04-25T10:47:09.888+0000",
        //   alarmtype: "过温",
        //   bsn: "123",
        //   category: "工厂用电",
        //   confirmper: null,
        //   confirmtime: null,
        //   id: "5cc11fd48c29a2026411f815",
        //   rank: "故障",
        //   status: false,
        //   switchhouse: "新工厂配电室",
        //   tds: "测试7",
        //   tnm: "测试7",
        //   val: 10
        // },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "查看详情"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "未执行"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "未执行"
        }
      ],
      currentRow: null,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      if ((this.tableData[index].tag = "查看详情")) {
        console.log("未执行");
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/7.checkManage/checkCalendar";
</style>
<style lang="less">
.checkCalendar {
  .checkCalendar-wrap {
    .el-table {
      thead {
        th {
          text-align: center;
          color: #000;
          font-weight: 500;
          padding: 3vh 0vw;
        }
      }
      tbody {
        tr {
          td {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

