<!-- 报警配置---单个修改页面 -->
<template>
<div class="alarmAmend">
    <h3 class="add-alarm">单个修改</h3>
    <div class="alerm_form">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">            
            <!-- 配电室 -->
            <div class="alerm_box">
                <span class="alermTie1">通讯机:</span>
                <div class="alerm_select">
                    <el-row>
                        <el-select class="alarmAmend-el-select" v-model="value" disabled="true">
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
                    <el-radio v-model="radio7 " :label="flag" border size="medium">{{ldl}}</el-radio>
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
                        <el-table-column align="center" width="55"></el-table-column>  
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
    name: 'alarmAmend',
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
            value: '新工厂配电室',
            radio7: '',
            tableData3: [], 
            multipleSelection: [],
            modifyData:{},
            ldl:"漏电流" ,
            flag:"0"   
        }
    },
    created() {  
        //表格同步显示tds     
        this.getTableData(this.$route.params.id);
    },
    methods: {
        //单个修改查询
        getTableData(val){
            this.$http
            .get('alarmSet/alarmSetById?id='+val)
            .then(response => {
            console.log("response1", response.data.data);
            if (response.data.code == 0) {
                    this.modifyData = response.data.data;
                    this.flag = this.modifyData.vt;
                    this.radio7 = this.flag;
                    this.ruleForm2.alt = this.modifyData.highlimit;
                    this.ruleForm2.highalt = this.modifyData.higherlimit;
                    var tdsData = {};
                    tdsData.tds = this.modifyData.tds;
                    this.tableData3.push(tdsData);
                    if(this.flag == "0"){
                        this.ldl = "漏电流"
                    }else if(this.flag == "1"){
                        this.ldl = "温度"
                    }
                    this.value = this.modifyData.switchhouse;
                } else {
                    this.$alert("获取列表失败", {
                    confirmButtonText: "确定"
                    });
                }
            })
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //alert('submit!');
                    var checkData = {
                        "id" : this.modifyData.id,
                        "bnm" : this.modifyData.bnm,
                        "eid" : this.modifyData.eid,
                        "enm" : this.modifyData.enm,
                        "bsn" : this.modifyData.bsn,
                        "eds" : this.modifyData.eds,
                        "cnm" : this.modifyData.cnm,
                        "cds" : this.modifyData.cds,
                        "switchhouse" : this.modifyData.switchhouse,
                        "category" : this.modifyData.category,
                        "tnm" : this.modifyData.tnm,
                        "tds" : this.modifyData.tds,
                        "highlimit" : this.$refs[formName].model.alt,
                        "higherlimit" : this.$refs[formName].model.highalt,
                        "switchstatus" : this.modifyData.switchstatus,
                        "vt" : this.flag,
                        "isset" : this.modifyData.isset
                    }
                this.$http
                    .post("alarmSet/updateAlarmSet", checkData)
                    .then(res => {
                    console.log(res, "res");
                    if (
                        res.data.code == 0
                    ) {
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
            this.multipleSelection = val;
        }

    }  
}
</script>
<style>
@import "../../assets/css/3.dangerAlarm/alarmAmend";

</style>


