<template>
  <!-- 巡检记录 -->
  <div class="checkCalendar">
    <div class="calendar-header">
      <h3>巡检记录</h3>
    </div>
    <div class="checkCalendar-wrap">
      <!-- 下部列表 -->
      <div class="wrap-table">
        <el-table :data="tableData" style="width:100%;" @current-change="handleEdit">
          <el-table-column align="center" label="序号" type="index" width="100"></el-table-column>
          <el-table-column prop="eid" label="巡检项目名称"></el-table-column>
          <el-table-column prop="type" label="巡检类型"></el-table-column>
          <el-table-column prop="content" label="巡检内容"></el-table-column>
          <el-table-column prop="patrolrange" label="巡检范围"></el-table-column>
          <el-table-column prop="operator" label="巡检人"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status=='0'">未执行</span>
              <span v-if="scope.row.status=='1'">已执行</span>
            </template>
          </el-table-column>
          <el-table-column prop="completetime" label="完成时间"></el-table-column>

          <el-table-column align="center" prop="status" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="carryOut(scope.$index, scope.row)"
                size="mini"
                type="warning"
                v-if="scope.row.status=='0'"
              >未执行</el-button>
              <el-button
                @click="recompose(scope.$index, scope.row)"
                size="mini"
                type="primary"
                v-if="scope.row.status=='1'"
              >查看详情</el-button>
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
          title="查看详情"
          :visible.sync="dialogFormVisible"
          top="0"
          width="100%"
        >
          <el-form
            style="width:60%"
            ref="ValidateForm"
            :rules="rules"
            label-position="right"
            label-width="100px"
            :model="planFormData"
          >
            <!-- 计划名称 -->
            <el-form-item label="计划名称 :" prop="name">
              <el-input v-model="planFormData.name"></el-input>
            </el-form-item>
            <!-- 项目名称 -->
            <el-form-item label="项目名称 :">{{this.planFormData.eid}}</el-form-item>
            <!-- 巡检类型 -->
            <el-form-item label="巡检类型 :">
              <el-select @change="handlechange" v-model="checkCurrent" placeholder="请选择">
                <el-option
                  v-for="item in checkData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 巡检范围 -->
            <el-form-item label="巡检范围 :" prop="positionData">
              <el-input v-model="planFormData.positionData"></el-input>
            </el-form-item>
            <!-- 巡检内容 -->
            <el-form-item label="巡检内容 :" prop="description">
              <el-input type="textarea" v-model="planFormData.description"></el-input>
            </el-form-item>
            <!-- 选择时间 -->
            <el-form-item label="选择时间 :">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="planFormData.pickerDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 执行人 -->
            <el-form-item label="执行人 :" prop="user">
              <el-input v-model="planFormData.user"></el-input>
            </el-form-item>
            <!-- 创建时间 -->
            <el-form-item label="创建时间 :">{{this.planFormData.showcreatetime}}</el-form-item>
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
              @click="planSubmit('ValidateForm')"
            >&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from "./getDate";
export default {
  name: "CheckCalendar",
  data() {
    return {
      // 弹窗数据
      // 提交数据
      planFormData: {
        eid: "", // 项目名称
        name: "", //计划名称
        type: [], //巡检内容
        description: "", //巡检内容
        user: "", //巡检人
        positionData: "", //巡检范围
        showcreatetime: "", //展示创建时间
        formatcreatetime: "", //格式创建时间
        pickerDate: "", // 时间选择
        tableId: "" // 列表选中行id
      },
      rules: {
        description: [
          {
            required: true,
            message: "请填写巡检内容",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请填写计划名称", trigger: "blur" }],
        user: [{ required: true, message: "请填写巡检人", trigger: "blur" }],
        positionData: [
          { required: true, message: "请填写巡检范围", trigger: "blur" }
        ]
      },
      checkData: [
        {
          value: "正常巡检",
          label: "正常巡检"
        }
      ], //巡检类型
      checkCurrent: "正常巡检",
      // 弹窗数据完
      // 列表数据
      tableData: [],
      // 当前行的所有数据
      currentRow: null,
      // 是否弹窗
      dialogFormVisible: false,

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
      pagesize: 8,
      tag: ""
    };
  },
  created() {
    // 获取列表
    this.getTableData();
    // 储存当前页
    this.currentPageNum = Number(sessionStorage.getItem("pagination")) || 1;
    this.currentPage(this.currentPageNum);
  },
  beforeUpdate() {
    sessionStorage.setItem("pagination", this.currentPageNum);
  },

  methods: {
    // 未执行
    carryOut(index, row) {
      sessionStorage.setItem("formData", JSON.stringify(row));
      this.$store.state.checkTableData = JSON.parse(
        sessionStorage.getItem("formData")
      );
      this.$router.push({ path: "/checkCalendar/executePlan" });
    },
    // 当前页
    currentPage(cpage) {
      this.loading = true;
      this.currentPageNum = cpage;
      this.getTableData();
    },
    handleEdit(row) {
      console.log(row);
    },
    // 获取列表数据
    getTableData() {
      const count = {
        pageNum: Number(sessionStorage.getItem("pagination")) || 1,
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
    // 巡检类型
    handlechange(val) {
      this.value = val;
    },
    // 表格修改
    recompose(index, row) {
      this.dialogFormVisible = true;
      // 计划名称
      this.planFormData.name = this.tableData[index].taskname;
      // 巡检范围
      this.planFormData.positionData = this.tableData[index].patrolrange;
      // 巡检内容
      this.planFormData.description = this.tableData[index].content;
      // 巡检人
      this.planFormData.user = this.tableData[index].operator;
      //  时间选择
      this.planFormData.pickerDate = [
        this.tableData[index].starttime,
        this.tableData[index].endtime
      ];
      // id
      this.planFormData.tableId = this.tableData[index].id;
      // 项目名称
      this.planFormData.eid = this.tableData[index].eid;
      // 创建时间
      this.planFormData.showcreatetime = this.tableData[index].createtime;
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

