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
          <el-form-item label="计划名称 :" prop="name">
            <el-input v-model="planFormData.name"></el-input>
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
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="执行人 :" prop="user">
            <el-input v-model="planFormData.user"></el-input>
          </el-form-item>
          <el-form-item label="创建时间 :"></el-form-item>
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
export default {
  name: "addNewPlan",
  data() {
    return {
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
      value1: ""
    };
  },
  methods: {
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/7.checkManage/addNewPlan";
</style>

