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
        <el-table :data="tableData" style="width: 100%;" @current-change="handleCurrentChange">
          <el-table-column label="序号" type="index" width="100"></el-table-column>
          <el-table-column label="计划名称">{{planName}}</el-table-column>
          <el-table-column prop="b" label="项目名称">我司日常检查</el-table-column>
          <el-table-column prop="c" label="巡检类型">正常巡检</el-table-column>
          <el-table-column prop="d" label="巡检人"></el-table-column>
          <el-table-column prop="e" label="开始时间"></el-table-column>
          <el-table-column prop="f" label="结束时间"></el-table-column>
          <el-table-column prop="g" label="创建时间"></el-table-column>
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
                @click="handleDelete(scope.$index, scope.row)"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
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
            :rules="rules"
            label-position="right"
            label-width="100px"
            :model="planFormData"
          >
            <el-form-item label="计划名称 :" prop="name">
              <el-input v-model="planName"></el-input>
            </el-form-item>
            <el-form-item label="项目名称 :">{{this.$store.state.projectName}}</el-form-item>
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
            <el-form-item label="巡检范围 :">
              <el-select @change="handlechange2" v-model="positionCurrent" placeholder="请选择">
                <el-option
                  v-for="item in positionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="巡检内容 :" prop="description">
              <el-input type="textarea" v-model="planFormData.description"></el-input>
            </el-form-item>
            <el-form-item label="选择时间 :">
              <!-- format="yyyy年MM月dd日" -->
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label=" 执 行 人 :" prop="user">
              <el-input v-model="planFormData.user"></el-input>
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
              @click="asd"
            >&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;</el-button>
          </div>
        </el-dialog>
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
  name: "CheckPlan",
  data() {
    return {
      // 计划名称
      planName: "",
      // dialod
      planFormData: {
        name: "",
        type: [],
        description: "",
        user: ""
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
        user: [{ required: true, message: "请填写巡检人", trigger: "blur" }]
      },
      positionData: [
        {
          value: "新工厂配电室",
          label: "新工厂配电室"
        },
        {
          value: "工厂ipanel柜",
          label: "工厂ipanel柜"
        },
        {
          value: "实验柜",
          label: "实验柜"
        }
      ],
      checkData: [
        {
          value: "正常巡检",
          label: "正常巡检"
        },
        {
          value: "异常巡检",
          label: "异常巡检"
        }
      ],
      checkCurrent: "正常巡检",
      positionCurrent: "新工厂配电室",
      value1: "",
      // dialod,
      tableData: [
        {
          a: "对强电场电气火灾接线1",
          b: "我司日常检查",
          c: "正常巡检",
          d: "王小二",
          e: "2019-04-29",
          f: "2019-04-30",
          g: "2019-05-01"
        },
        {
          a: "对强电场电气火灾接线2",
          b: "我司日常检查2",
          c: "正常巡检",
          d: "王小二2",
          e: "2019-04-29",
          f: "2019-04-30",
          g: "2019-05-01"
        },
        {
          a: "对强电场电气火灾接线3",
          b: "我司日常检查3",
          c: "正常巡检",
          d: "王小二3",
          e: "2019-04-29",
          f: "2019-04-30",
          g: "2019-05-01"
        }
      ],
      currentRow: null,
      dialogFormVisible: false
    };
  },
  methods: {
    // dialog
    asd() {
      this.dialogFormVisible = false;
    },
    handlechange(val) {
      this.value = val;
      console.log("this.value", this.value);
    },
    handlechange2(val) {
      this.value = val;
      console.log("this.value", this.value);
    },
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
    retreat() {
      window.history.back();
    },
    // dialog
    // 新增巡检计划
    addNewPlan() {
      this.$router.push({ path: "/checkPlan/addNewPlan" });
    },
    // 修改
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
      this.value1 = dd;
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 点击列表获取当前行
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("val", val);
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
