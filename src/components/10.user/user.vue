<template>
  <div class="user">
    <div class="form-submit1">
      <h4 class="submit1-h4">个人中心</h4>
      <div class="form-submit2">
        <!-- 提交表单 -->
        <el-form
          :model="ruleForm2"
          status-icon
          ref="ruleForm2"
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户姓名">
            <el-input v-model="ruleForm2.user"></el-input>
          </el-form-item>
          <el-form-item label="原始密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="age">
            <el-input type="password" v-model.number="ruleForm2.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="form-item-btn">
            <el-button type="info" @click="backlast">&nbsp;&nbsp;返&nbsp;&nbsp;回&nbsp;&nbsp;</el-button>
            <el-button
              class="confirm"
              type="primary"
              @click="submitForm('ruleForm2')"
            >&nbsp;&nbsp;提&nbsp;&nbsp;交&nbsp;&nbsp;</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        user: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    backlast() {
      window.history.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/10.user/user";
</style>
