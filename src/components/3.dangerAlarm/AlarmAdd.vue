<!-- 报警配置---添加页面 -->
<template>
  <div class="alermAdd">
    <h3 class="add-alarm">添加</h3>
    <div class="alerm_form">
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 限制量 -->
        <div class="alerm_box">
          <span class="alermTie1">限制量:</span>
          <div class="alerm_radio">
            <el-radio v-model="radio7 " label="0" border size="medium" @change="radioClick(0)">漏电流</el-radio>
            <el-radio v-model="radio7" label="1" border size="medium" @change="radioClick(1)">温度</el-radio>
          </div>
        </div>
        <!-- 通讯机 -->
        <div class="alerm_box">
          <span class="alermTie1">通讯机:</span>
          <div class="alerm_select">
            <el-row>
              <el-select
                class="alermAdd-el-select"
                v-model="value"
                placeholder="新工厂配电室"
                @change="onSelected"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-row>
          </div>
        </div>
        <!-- 限制量 -->
        <div class="alerm_box">
          <span class="alermTie1">限制量:</span>
          <!-- table表格 -->
          <div class="alerm_table" v-if="flag">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              size="mini"
              style="width: 45%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column align="center" type="selection" width="55"></el-table-column>
              <el-table-column
                align="center"
                prop="tds"
                label="描述"
                width="500"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 高限 -->
        <div class="alerm_higlow">
          <!-- 高限 -->
          <el-form-item prop="alt" class="alerm_gaoxian">
            <label>高限：</label>
            <el-input v-model.number="ruleForm2.alt"></el-input>
          </el-form-item>
          <el-form-item prop="highalt" class="alerm_gaogaoxian">
            <label class="leftBorderRadius">高高限：</label>
            <el-input v-model.number="ruleForm2.highalt"></el-input>
          </el-form-item>
          <!-- 提交、重置 -->
          <div class="alerm_low">
            <el-form-item>
              <div class="alerm_btn">
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "alermAdd",
  data() {
    return {
      //校验
      rules2: {
        alt: [{ type: "number", message: "必须为数字值", trigger: "blur" }],
        highalt: [{ type: "number", message: "必须为数字值", trigger: "blur" }]
      },
      options: [
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
        },
        {
          value: "工厂智能化改造",
          label: "工厂智能化改造"
        }
      ],
      ruleForm2: {
        alt: "",
        highalt: ""
      },
      value: "新工厂配电室",
      radio7: "",
      flag: false,
      tableData3: [],
      multipleSelection: [],
      switchhouse: "新工厂配电室",
      vt: -1
    };
  },
  activated: function() {
    this.$refs["ruleForm2"].clearValidate();
  },
  methods: {
    //限制量 vt
    radioClick(value) {
      this.vt = value;
      this.flag = true;
      this.getDataList();
    },
    getDataList() {
      this.$http
        .get(
          "alarmSet/pointsByShAndVt?switchhouse=" +
            this.switchhouse +
            "&vt=" +
            this.vt
        )
        .then(response => {
          console.log("response", response);
          if (response.data.code == 0 && response.data.data.length > 0) {
            this.tableData3 = response.data.data;
          } else {
            this.$alert("获取列表失败", {
              confirmButtonText: "确定"
            });
          }
        });
    },
    onSelected(value) {
      this.switchhouse = value;
      if (this.vt != -1) {
        this.getDataList();
      }
      console.log(value);
    },
    // 提交
    submitForm(formName) {
      var checkData = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var data = {
          id: this.multipleSelection[i].id,
          bnm: this.multipleSelection[i].bnm,
          eid: this.multipleSelection[i].eid,
          enm: this.multipleSelection[i].enm,
          bsn: this.multipleSelection[i].bsn,
          eds: this.multipleSelection[i].eds,
          cnm: this.multipleSelection[i].cnm,
          cds: this.multipleSelection[i].cds,
          switchhouse: this.switchhouse,
          category: this.multipleSelection[i].category,
          tnm: this.multipleSelection[i].tnm,
          tds: this.multipleSelection[i].tds,
          highlimit: this.ruleForm2.alt,
          higherlimit: this.ruleForm2.highalt,
          switchstatus: this.multipleSelection[i].switchstatus,
          vt: this.vt,
          isset: this.multipleSelection[i].isset
        };
        checkData.push(data);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("alarmSet/saveAlarmSet", checkData)
            .then(res => {
              console.log(res, "res");
              if (res.status == 200) {
                // 保存后重新请求界面
                this.$alert("保存成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  this.$router.push({ path: "/alarmConfig" });
                });
              }
            })
            .catch(err => {
              this.$alert("保存失败", {
                confirmButtonText: "确定"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //选中状态值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style>
@import "../../assets/css/3.dangerAlarm/AlarmAdd";
</style>


