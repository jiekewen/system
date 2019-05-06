<template>
  <!-- 巡检计划 -->
  <div class="checkPlan">
    <div class="checkPlan-header">
      <div class="header-left">
        <h3>巡检计划</h3>
      </div>
      <!-- 新增按钮 -->
      <div class="header-right">
        <el-button @click="addNewPlan" type="primary">新增巡检计划</el-button>
      </div>
    </div>
    <div class="checkPlan-wrap">
      <!-- 下部列表 -->
      <div class="wrap-table">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="序号" type="index" width="100"></el-table-column>
          <el-table-column prop="taskname" label="计划名称"></el-table-column>
          <el-table-column prop="eid" label="项目名称"></el-table-column>
          <el-table-column prop="type" label="巡检类型"></el-table-column>
          <el-table-column prop="operator" label="巡检人"></el-table-column>
          <el-table-column prop="starttime" label="开始时间"></el-table-column>
          <el-table-column prop="endtime" label="结束时间"></el-table-column>
          <el-table-column prop="createtime" label="创建时间"></el-table-column>
          <el-table-column width="120" fixed="right" label="巡检计划操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
                type="info"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="handleDelete(scope.$index, tableData)"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="wrap-table-page">
          <el-pagination
            @current-change="currentPage"
            class="page"
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            :current-page.sync="currentPageNum"
            :total="pageTotal"
          ></el-pagination>
        </div>
        <!-- 详情弹出框 -->
        <el-dialog
          style="margin:0;height:100%;"
          modal
          class="checkPlan-dialog"
          title="修改计划"
          :visible.sync="dialogFormVisible"
          top="0"
          width="100%"
        >
          <el-form
            style="width:60%"
            ref="dynamicValidateForm"
            label-position="right"
            label-width="100px"
          >
            <el-form-item label="计划名称 :" prop="name">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目名称 :">{{this.$store.state.projectName}}</el-form-item>
            <el-form-item label="巡检类型 :">
              <el-select @change="handlechange" placeholder="请选择">
                <el-option
                  v-for="item in checkData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 巡检范围 -->
            <el-form-item label="巡检范围 :">
              <el-input v-model="positionData"></el-input>
            </el-form-item>
            <el-form-item label="巡检内容 :">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="选择时间 :">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" 执 行 人 :" prop="user">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="创建时间 :"></el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              plain
              @click="dialogFormVisible = false"
            >&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;</el-button>
            <el-button
              class="btn-left"
              type="primary"
              @click="recompose"
            >&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckPlan",
  data() {
    return {
      // 巡检范围
      positionData: "",
      // 巡检类型
      checkData: [
        {
          value: "正常巡检",
          label: "正常巡检"
        }
      ], //巡检类型
      checkCurrent: "正常巡检",
      // 列表数据
      tableData: [],
      // 当前行的所有数据
      currentRow: null,
      // 是否弹窗
      dialogFormVisible: false,
      // 列表选中行id
      tableId: "",
      // 分页
      // 当前页
      currentPageNum: 1,
      // 页码总计
      pageTotal: 1,
      // 每页数据数
      pagesize: 5
    };
  },
  created() {
    this.getTableData();
    // 储存当前页
    this.currentPageNum = Number(localStorage.getItem("pagination")) || 1;
    this.currentPage(this.currentPageNum);
  },
  beforeUpdate() {
    localStorage.setItem("pagination", this.currentPageNum);
  },
  beforeDestroy() {
    localStorage.setItem("pagination", "1");
  },
  methods: {
    // 当前页
    currentPage(cpage) {
      this.loading = true;
      this.currentPageNum = cpage;
      this.getTableData();
    },
    // 获取列表数据
    getTableData() {
      const count = {
        pageNum: Number(localStorage.getItem("pagination")) || 1,
        pagesize: this.pagesize
      };
      this.$http
        .get("patrol/getAllPatrol", { params: count })
        .then(response => {
          this.tableData = response.data.data.content;
          this.pageTotal = response.data.data.totalElements;
        });
    },
    // 修改dialog
    recompose() {
      this.dialogFormVisible = false;
    },
    // 巡检类型
    handlechange(val) {
      this.value = val;
    },
    // 提交修改
    planSubmit(formName) {
      // 计划名称
      console.log("this.planFormData.name", this.planFormData.name);
      // 项目类型
      console.log("this.checkCurrent", this.checkCurrent);
      // 巡讲范围
      console.log("this.positionCurrent", this.positionCurrent);
      // 巡检内容
      console.log(
        "this.planFormData.description",
        this.planFormData.description
      );

      // 执行人
      console.log("this.planFormData.user", this.planFormData.user);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 弹窗返回
    retreat() {
      window.history.back();
    },
    // 新增巡检计划
    addNewPlan() {
      this.$router.push({ path: "/checkPlan/addNewPlan" });
    },
    // 表格修改
    handleEdit(index, row) {
      console.log(index, row);
      console.log("this.tableData[index]", this.tableData[index]);
      // 计划名称
      this.planFormData.name = this.tableData[index].b;
      // 执行人
      this.planFormData.user = this.tableData[index].d;
      // 执行内容
      this.planFormData.description = this.tableData[index].a;
      const dd = [];
      dd.push(this.tableData[index].e);
      dd.push(this.tableData[index].f);
      // 开始时间结束时间
      this.datePicker = dd;
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("将删除此条计划，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 上传id
          let currentId = { id: row[index].id };
          this.$http
            .delete("patrol/deletePatrol", { params: currentId })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
        // 表头
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
    .el-dialog {
      height: 100%;
      margin: 0 auto;
      .el-dialog__header {
        height: 8vh;
        line-height: 8vh;
        border-bottom: 1px solid #000;
        padding: 0 0 0 2vw;
        margin-bottom: 5vh;
        font-weight: 600;
      }
      .el-dialog__body {
        padding: 0 0 0 2vw;
      }
      .el-dialog__footer {
        width: 80%;
        text-align: left;
        padding: 0 0 0 6vw;
        .btn-left {
          margin-left: 5vw;
        }
      }
    }
  }
}
</style>
