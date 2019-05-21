<template>
  <div class="executePlan">
    <!-- 巡检计划标题 -->
    <div class="newPlan-title">
      <h3>巡检记录（未执行）</h3>
    </div>
    <!-- 计划内容表单部分 -->
    <div class="newPlan-wrap">
      <div class="newPlan-form">
        <el-form
          size="small"
          ref="dynamicValidateForm"
          :rules="rules"
          label-position="right"
          label-width="120px"
          :model="planFormData"
        >
          <!-- 计划名称 -->
          <el-form-item label="计划名称 :">
            <el-input disabled v-model="planFormData.name"></el-input>
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
          <el-form-item label="巡检范围 :">
            <el-input disabled v-model="planFormData.positionData"></el-input>
          </el-form-item>
          <!-- 巡检内容 -->
          <el-form-item label="巡检内容 :">
            <el-input disabled autosize type="textarea" v-model="planFormData.description"></el-input>
          </el-form-item>
          <!-- 选择时间 -->
          <el-form-item label="选择时间 :">
            <el-date-picker
              disabled
              value-format="yyyy-MM-dd"
              v-model="planFormData.pickerDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 执行人 -->
          <el-form-item label="执行人 :">
            <el-input disabled v-model="planFormData.user"></el-input>
          </el-form-item>
          <!-- 发现隐患数 -->
          <el-form-item label="发现隐患数 :" prop="count">
            <el-input
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              v-model.number="planFormData.count"
            ></el-input>
          </el-form-item>
          <!-- 完成时间 -->
          <el-form-item label="完成时间 :">
            <el-date-picker
              v-model="planFormData.completetime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注 :" prop="note">
            <el-input autosize type="textarea" v-model="planFormData.note"></el-input>
          </el-form-item>
          <!-- 巡检是否执行 -->
          <el-form-item label="巡检是否执行 :" prop="carry">
            <el-radio-group @change="radioChange" v-model="planFormData.carry">
              <el-radio label="0">未执行</el-radio>
              <el-radio label="1">已执行</el-radio>
            </el-radio-group>
          </el-form-item>
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
      // 提交数据
      planFormData: {
        note: "", //备注
        count: 0, //隐患数
        carry: "", //是否执行
        name: "", //计划名称
        type: [], //巡检内容
        description: "", //巡检内容
        user: "", //巡检人
        positionData: "", //巡检范围
        pickerDate: "", // 时间选择
        completetime: "" //完成时间
      },
      // 禁选今日以后的日期
      pickerOptions: {
        disabledDate: time => {
          if (this.planFormData.pickerDate[0] != "") {
            const gDate = new Date(
              JSON.parse(sessionStorage.getItem("formData")).starttime
            );
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(gDate.setDate(gDate.getDate() - 1))
            );
          }
        }
      },
      // 储存数据
      fData: {},
      // 验证规则
      rules: {
        count: [
          { required: true, message: "此处不能为空" },
          { type: "number", message: "此处必须为数字值" }
        ],
        carry: [
          { required: true, message: "请选择是否执行", trigger: "change" }
        ]
      },
      // 巡检类型
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
    this.initial();
  },
  methods: {
    // 计划初始值
    initial(value) {
      this.fData = JSON.parse(sessionStorage.getItem("formData"));

      // 计划名称
      this.planFormData.name = this.fData.taskname;
      // 巡检范围
      this.planFormData.positionData = this.fData.patrolrange;
      // 巡检内容
      this.planFormData.description = this.fData.content;
      // 选择时间
      this.planFormData.pickerDate = [this.fData.starttime, this.fData.endtime];
      // 执行人
      this.planFormData.user = this.fData.operator;
      // 隐患数
      this.planFormData.count = this.fData.dangernum;
    },
    // 巡检是否执行
    radioChange(val) {
      this.planFormData.carry = val;
    },
    // 巡检类型
    handlechange(val) {
      this.value = val;
      console.log("this.value", this.value);
    },
    // 保存提交
    planSubmit(formName) {
      if (this.planFormData.completetime == "") {
        this.$message({
          type: "warning",
          message: "请选择完成时间",
          center: true
        });
        return false;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 生成发送数据
            const sendData = {};
            // 完成时间
            sendData.completetime = this.planFormData.completetime;
            // 巡检内容
            sendData.content = this.planFormData.description;
            // 创建时间
            sendData.createtime = this.fData.createtime;
            // 隐患数
            sendData.dangernum = this.planFormData.count;
            // eid
            sendData.eid = this.fData.eid;
            // 结束时间
            sendData.endtime = this.planFormData.pickerDate[1];
            // id
            sendData.id = this.fData.id;
            // 备注
            sendData.note = this.planFormData.note;
            // 巡检人
            sendData.operator = this.planFormData.user;
            // 巡检范围
            sendData.patrolrange = this.planFormData.positionData;
            // 开始时间
            sendData.starttime = this.planFormData.pickerDate[0];
            // 执行状态
            sendData.status = Number(this.planFormData.carry);
            // 计划名称
            sendData.taskname = this.planFormData.name;
            // 巡检类型
            sendData.type = this.checkCurrent;
            console.log("sendData", sendData);

            this.$http
              .post("patrol/updatePatrolRecord", sendData)
              .then(res => {
                this.$alert("保存成功", "新增计划保存成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  window.history.back();
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
<style lang="less"scoped>
@import "../../assets/css/7.checkManage/executePlan";
</style><style lang="less">
.executePlan {
  .el-input.is-disabled .el-input__inner {
    color: #666;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    color: #666;
  }

  .el-range-editor.is-disabled input {
    color: #666;
  }
}
</style>
