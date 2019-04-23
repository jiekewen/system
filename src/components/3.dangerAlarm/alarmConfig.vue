<!-- 报警管理---报警配置 -->
<template>
  <div class="alermConfig">
    <h3 class="alerm-test">报警配置列表</h3> 
    <Alarm-page class="AlarmPage-content">
      <!-- (区域)过滤框 --> 
      <template slot="left-alarm">                  
        <el-cascader
          :options="options"
          @change="handleChange"
          v-model="selectedOptions"
          >
        </el-cascader>
      </template>
      <!-- 添加 -->
      <template slot="middle-alarm">                  
        <el-button @click="buttonAdd" type="info" plain>添加</el-button>  
      </template>
      <!-- 批量修改 -->
      <template slot="right-alarm">                  
        <el-button @click="buttonBatch" type="info" plain>批量修改</el-button>
      </template>     
      <!-- table表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          stripe
          size="mini"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange"
          >
          <el-table-column align="center" type="selection" width="60"></el-table-column>
          <el-table-column align="center" prop="switchhouse" label="通讯管理机" width="180"></el-table-column>
          <el-table-column align="center" prop="tnm" label="tag标签" width="150"></el-table-column>
          <el-table-column align="center" prop="tds" label="描述" width="400"></el-table-column>
          <el-table-column align="center" prop="vt" label="类型" width="130" :formatter="formatName"></el-table-column>
          <el-table-column align="center" prop="highlimit" label="高限" width="130"></el-table-column>
          <el-table-column align="center" prop="higherlimit" label="高高限" width="130"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">修改</el-button>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <el-button 
                @click.native.prevent="deleteRow(scope.row.id)"
                type="text" 
                size="small">
                删除
            </el-button>
          </template>
          </el-table-column>
        </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="pageChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total"
          background>
        </el-pagination>
      </div>
    </Alarm-page>
</div>
</template>
<script>
import AlarmPage from './AlarmPage'
export default {
  name: 'alermConfig',
  components: {
    AlarmPage
  },
  data() {
    return {
      optionValue:{
          "0":"漏电流",
          "1":"温度"
        },
      // 下拉框
      options: [{
        value: '新工厂配电室',
        label: '新工厂配电室',
        children: [{
          value: '0',
          label: '漏电流',
          }, {
            value: '1',
            label: '温度',
          }]
        }, {
          value: '工厂ipanel柜',
          label: '工厂ipanel柜',
          children: [{
            value: '0',
            label: '漏电流',
          }, {
            value: '1',
            label: '温度',
          }]
        }, {
          value: '实验柜',
          label: '实验柜',
          children: [{
            value: '0',
            label: '漏电流',
          }, {
            value: '1',
            label: '温度',
          }]
      }],
      selectedOptions: ['新工厂配电室', '0'],
      tableData: [],  
      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      currentPage:1,//默认开始页面
      selections:[],
      ldl:"漏电流",  //级联漏电流
      flag:'0'  //漏电流标识
    }
  },
  created() {
    // 列表数据
    this.getTableList(this.selectedOptions);
  },
  mounted() {     
    this.handleChange();
  },
  methods: {
    getTableList(val) {
      this.$http
        .get('alarmSet/alarmSetList?switchhouse='+val[0]+'&vt='+val[1]+'&pageSize='+this.pagesize+'&pageNum='+this.currentPage)
        .then(response => {
          console.log("response", response);
          if(response.status == "200"){
            if (response.data.code == 0 && response.data.data.length > 0) {
              this.tableData = response.data.data;
              this.getTableTotal(val);
              }
          } else {
             this.$alert("获取列表失败", {
              confirmButtonText: "确定"
            });
            this.total=0;
            this.pagesize=10;
            this.currentPage=1;
            this.tableData=[];
          }
        })
    },
    //获取报警总数-分页
    getTableTotal(val){
      this.$http
        .get('alarmSet/findAlarmSetCount?switchhouse='+val[0]+'&vt='+val[1])
        .then(response => {
          console.log("response1", response);
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.total = response.data.data;
            }
          } else {
             this.$alert("获取列表总数获取失败", {
              confirmButtonText: "确定"
            });
            this.total = 0;
          }
        })
    },
    //改变页码
    pageChange(val) {
      this.currentPage = parseInt(val);
      this.getTableList(this.selectedOptions);
    },
    //类别转换，例如：0转换成漏电流
    formatName(row){
        return this.optionValue[row.vt];
      },
    //级联选择器
    handleChange(value) {
       this.flag = value[1];
       this.ldl = this.optionValue[this.flag];
       this.selectedOptions = [value[0], value[1]];
       this.getTableList(value);
        console.log(value);
    },
    //选中状态值方法 参数selection为选中数据
    handleSelectionChange(selection) {
      this.selections = selection;
    },    
    // 跳转到修改界面
    handleClick(row) {
      var data={};
      data.id = row;
      this.$router.push({name: 'alarmAmend',params:data})
      console.log(row);
    },
    // 跳转到批量修改界面
    buttonBatch(){
      console.log(this.ldl+"=="+this.flag);
      if(this.selections.length > 0){
        var data = {};
        data.selections = this.selections;
        data.ldl = this.ldl;
        data.flag = this.flag;
        data.switchhouse = this.selectedOptions[0];
        this.$router.push({name:'alarmBatch',params:data})
        // this.$router.push('/alarmBatch/'+this.ldl+'/'+this.flag+"/"+this.selectedOptions[0])
      } else {
        alert("请勾选数据")
      }
    },
    //跳转到添加界面
    buttonAdd(){
     this.$router.push({name:'alarmAdd'})
    },
    //删除
    deleteRow(index) {
      console.log(index)
      this.$confirm("是否确认删除此数据",'提示',{
          confirmButtonText:"确定",
          cancelButtonText:"取消"
      }).then(()=>{
          this.$http
          .delete('alarmSet/deleteAlarmSet?id='+index)
          .then(response => {
            console.log("response", response);
            if(response.status == "200"){
              if (response.data.code == 0) {
                this.getTableList(this.selectedOptions);
              }
            } else {
              this.$alert("删除数据失败", {
                confirmButtonText: "确定"
              });
            }
          })
      }).catch(()=>{
      })
    },
  }
}
</script>
<style>
@import "../../assets/css/3.dangerAlarm/alarmConfig";
</style>