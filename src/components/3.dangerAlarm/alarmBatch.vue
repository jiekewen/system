<!-- 报警配置---批量修改页面 -->
<template>
<div class="alarmBatch">
    <h3 class="add-alarm">批量修改</h3>
    <div class="alerm_form">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">            
            <!-- 配电室 -->
            <div class="alerm_box">
                <span class="alermTie1">通讯机:</span>
                <div class="alerm_select">
                    <el-row>
                        <el-select class="alarmBatch-el-select" v-model="value" disabled="true" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>
                </div>
            </div>
            <!-- 限制量 -->
            <div class="alerm_box">
                <span class="alermTie1">限制量:</span>
                <div class="alerm_radio">
                    <el-radio v-model="radio7" :label="flag" border size="medium" @change="radioClick">{{ldl}}</el-radio>
                </div>
            </div>
            <!-- Tag -->
            <div class="alerm_box">
                <span class="alermTie1">限制量:</span>
                <!-- table表格 -->
                <div class="alerm_table">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        size="mini"
                        style="width: 45%"
                        @selection-change="handleSelectionChange">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>  
                        <el-table-column align="center" prop="tds" label="描述" width="500" show-overflow-tooltip></el-table-column>
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
    name: 'alarmBatch',
    data () {
        return {  
            //校验
            rules2: {
                alt: [{ type: 'number', message: '必须为数字值', trigger: 'blur' }],
                highalt: [{ type: 'number', message: '必须为数字值', trigger: 'blur' }],
            },
            options: [{
                    value: '新工厂配电室',
                    label: '新工厂配电室'
                }, {
                    value: '工厂ipanel柜',
                    label: '工厂ipanel柜'
                }, {
                    value: '实验柜',
                    label: '实验柜'
                }, {
                    value: '工厂智能化改造',
                    label: '工厂智能化改造'
            }],
            ruleForm2: {           
                alt: '',
                highalt: '',
            }, 
            value: this.$route.params.switchhouse,
            radio7: this.$route.params.flag,
            tableData3: [], 
            multipleSelection: [],  //选中数据数组
            ldl:this.$route.params.ldl , //限制量 vt
            flag:this.$route.params.flag
        }
    },
    created() {  
        //表格同步显示tds
        for(var i=0; i<this.$route.params.selections.length; i++){
            var data = {
                "tds" : this.$route.params.selections[i].tds,
            }
            this.tableData3.push(data);
        }             
    },
    methods: {
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                //获取报警配置列表
                var checkData = []
                for(var i=0; i<this.$route.params.selections.length; i++){
                    var data = {
                        "id" : this.$route.params.selections[i].id,
                        "bnm" : this.$route.params.selections[i].bnm,
                        "eid" : this.$route.params.selections[i].eid,
                        "enm" : this.$route.params.selections[i].enm,
                        "bsn" : this.$route.params.selections[i].bsn,
                        "eds" : this.$route.params.selections[i].eds,
                        "cnm" : this.$route.params.selections[i].cnm,
                        "cds" : this.$route.params.selections[i].cds,
                        "switchhouse" : this.switchhouse,
                        "category" : this.$route.params.selections[i].category,
                        "tnm" : this.$route.params.selections[i].tnm,
                        "tds" : this.$route.params.selections[i].tds,
                        "highlimit" : this.ruleForm2.alt,
                        "higherlimit" : this.ruleForm2.highalt,
                        "switchstatus" : this.$route.params.selections[i].switchstatus,
                        "vt" : this.vt,
                        "isset" : this.$route.params.selections[i].isset
                    };
                    checkData.push(data);
                }
            this.$http
                .post("alarmSet/updateAlarmSetBatch", checkData)
                .then(res => {
                    console.log(res, "res");
                    if (res.data.code == 0) {
                        // 保存后重新请求界面
                        this.$alert("保存成功", {
                            confirmButtonText: "确定"
                            }).then(()=>{
                                this.$router.push({path: '/alarmConfig'})
                        });
                    }
                })
                .catch(err => {
                    this.$alert("保存失败", {
                        confirmButtonText: "确定"
                    });
                });
            } else {
                console.log('error submit!!');
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
            this.$route.params.selections = val;
        }
    }  
}
</script>
<style>
@import "../../assets/css/3.dangerAlarm/alarmBatch";

</style>


