<template>
  <div class="user">
    <div class="form-submit1">
      <h4 class="submit1-h4">个人中心</h4>
      <div class="form-submit2">
        <!-- 提交表单 -->
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldpass">
            <el-input type="password" v-model="ruleForm.oldpass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input type="password" v-model="ruleForm.newpass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input type="password" v-model="ruleForm.checkpass"></el-input>
          </el-form-item>
          <el-form-item class="form-item-btn">
            <el-button type="info" @click="backlast">&nbsp;&nbsp;返&nbsp;&nbsp;回&nbsp;&nbsp;</el-button>
            <el-button
              class="confirm"
              type="primary"
              @click="submitForm('ruleForm')"
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
    var user = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var oldpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if (value !== localStorage.getItem("password")) {
        callback(new Error("原密码输入有误"));
      } else {
        callback();
      }
    };
    var newpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var checkpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        oldpass: "",
        newpass: "",
        checkpass: ""
      },
      rules: {
        user: [{ validator: user, trigger: "blur" }],
        oldpass: [{ validator: oldpass, trigger: "blur" }],
        newpass: [{ validator: newpass, trigger: "blur" }],
        checkpass: [{ validator: checkpass, trigger: "blur" }]
      },
      id: ""
    };
  },
  mounted() {
    this.ruleForm.user = localStorage.getItem("user");
    this.id = localStorage.getItem("id");
  },
  methods: {
    // 返回
    backlast() {
      window.history.go(-1);
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const sendData = {};
          sendData.id = this.id;
          sendData.username = this.ruleForm.user;
          sendData.password = this.ruleForm.oldpass;
          sendData.newpassword = this.ruleForm.newpass;
          localStorage.removeItem("user");
          localStorage.removeItem("password");
          this.$http.post("user/updateUser", sendData).then(response => {
            this.$alert("修改成功", {
              confirmButtonText: "确定"
            }).then(() => {
              localStorage.setItem("user", this.ruleForm.user);
              localStorage.setItem("password", this.ruleForm.newpass);
              location.reload();
            });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/10.user/user";
</style>
