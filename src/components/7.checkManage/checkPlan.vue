<template>
  <div class="checkPlan">
    <div class="checkPlan-header">
      <div class="header-left">
        <h3>巡检计划</h3>
      </div>
      <div class="header-right">
        <el-button @click="handleEdit" type="primary">新增巡检计划</el-button>
      </div>
    </div>
    <div class="checkPlan-wrap">
      <!-- 下部列表 -->
      <div class="wrap-table">
        <el-table :data="tableData" style="width: 100%;" @current-change="handleCurrentChange">
          <el-table-column label="序号" type="index" width="100"></el-table-column>
          <el-table-column prop="name" label="计划名称"></el-table-column>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column prop="name" label="巡检类型"></el-table-column>
          <el-table-column prop="name" label="巡检人"></el-table-column>
          <el-table-column prop="name" label="开始时间"></el-table-column>
          <el-table-column prop="name" label="结束时间"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="巡检计划操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="info"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="wrap-table-page">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckPlan",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
@import "../../assets/css/7.checkManage/checkPlan";
</style>
<style lang="less">
.checkPlan {
  .checkPlan-wrap {
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
