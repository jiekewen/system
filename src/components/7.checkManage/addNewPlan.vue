<template>
  <div class="addNewPlan">
    <!-- 巡检计划标题 -->
    <div class="newPlan-title">
      <h3>新增巡检计划</h3>
    </div>
    <!-- 计划内容表单部分 -->
    <div class="newPlan-wrap">
      <div class="newPlan-form">
        <el-form
          ref="dynamicValidateForm"
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
          <el-form-item label="项目名称 :">{{this.$store.state.projectName}}</el-form-item>
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
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </el-form-item>
          <!-- 执行人 -->
          <el-form-item label="执行人 :" prop="user">
            <el-input v-model="planFormData.user"></el-input>
          </el-form-item>
          <!-- 创建时间 -->
          <el-form-item label="创建时间 :">{{this.planFormData.showcreatetime}}</el-form-item>
        </el-form>
        <div class="newPlan-btn">
          <el-button @click="retreat" class="btn-left" type="primary">&nbsp;返&nbsp;回&nbsp;</el-button>
          <el-button
            @click="planSubmit('dynamicValidateForm')"
            class="btn-right"
            type="primary"
          >&nbsp;保&nbsp;存&nbsp;</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDate } from "./getDate";
export default {
  name: "addNewPlan",
  data() {
    return {
      // 禁选范围
      pickerOptions1: {
        disabledDate: time => {
          if (this.planFormData.formatcreatetime != "") {
            const gDate = new Date(this.planFormData.formatcreatetime);
            return (
              time.getTime() < new Date(gDate.setDate(gDate.getDate() - 1))
            );
          }
        }
      },
      // 提交数据
      planFormData: {
        name: "", //计划名称
        type: [], //巡检内容
        description: "", //巡检内容
        user: "", //巡检人
        positionData: "", //巡检范围
        showcreatetime: "", //展示创建时间
        formatcreatetime: "", //格式创建时间
        pickerDate: "" // 时间选择
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
      checkCurrent: "正常巡检"
    };
  },
  created() {
    // 创建时间
    const cDate = getDate();
    this.planFormData.formatcreatetime = cDate[0];
    this.planFormData.showcreatetime = cDate[1];
    console.log(
      "this.planFormData.formatcreatetime",
      this.planFormData.formatcreatetime
    );
  },
  methods: {
    // 巡检类型
    handlechange(val) {
      this.value = val;
      console.log("this.value", this.value);
    },
    // 保存提交
    planSubmit(formName) {
      if (this.planFormData.pickerDate == "") {
        this.$message({
          message: "请选择开始时间和结束时间",
          center: true
        });
        return false;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 生成发送数据
            const sendData = {};
            // 巡检内容
            sendData.content = this.planFormData.description;
            // 创建时间
            sendData.createtime = this.planFormData.formatcreatetime;
            // 开始时间
            sendData.endtime = this.planFormData.pickerDate[1];
            // 巡检人
            sendData.operator = this.planFormData.user;
            // 巡检范围
            sendData.patrolrange = this.planFormData.positionData;
            // 开始时间
            sendData.starttime = this.planFormData.pickerDate[0];
            // 计划名称
            sendData.taskname = this.planFormData.name;
            // 巡检类型
            sendData.type = this.checkCurrent;
            this.$http
              .post("patrol/savePatrol", sendData)
              .then(res => {
                this.$alert("保存成功", "新增计划保存成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  history.go(-1);
                });
              })
              .catch(err => {
                this.$alert("保存失败", "新增计划保存失败", {
                  confirmButtonText: "确定"
                });
              });
          } else {
            return false;
          }
        });
      }
    },
    // 返回
    retreat() {
      window.history.back();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/7.checkManage/addNewPlan";
</style>

