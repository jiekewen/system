<!-- 数据分析--月度报警隐患统计 -->
<template>
    <!-- 上半部分 -->
    <div class="top_Analysis">
      <h3 class="test_data">月度报警隐患统计</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="折线" name="first">
            <div class="echarts_test">
                <div id="drawLine" :style="{width: '1270px', height: '300px'}"></div>
            </div>            
          </el-tab-pane>
          <el-tab-pane label="表格" name="second">
             <div class="tableA">
                <el-table          
                ref="multipleTable"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                tooltip-effect="dark"
                stripe
                size="mini"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @selection-change="handleSelectionChange">
                <el-table-column align="center" prop="period" label="时间" width="300"></el-table-column>
                <el-table-column align="center" prop="countResults[0].count" label="温度报警数量" width="310"></el-table-column>
                <el-table-column align="center" prop="countResults[1].count" label="漏电报警数量" width="310"></el-table-column>
                <el-table-column align="center" prop="countResults[2].count" label="故障报警数量" width="339"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pageA">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total">
                </el-pagination>
                </div>
            </div>
          </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>

export default {
  name: "DataAnalysis",
  data() {
    return {
      activeName: 'first',
      active:'first',
      tableData: [],
      multipleSelection: [],
      total:50,
      currentPage:1, //初始页
      pagesize:5,    //每页的数据
      timeArray:[],   //X轴时间集合
      tempArray:[],   //Y轴温度预警数量集合
      leakageArray:[],  //Y轴漏电预警数量集合
      faultArray:[],  //Y轴故障预警数量集合
    };
  },
  components: {
  },
  mounted(){
    this.drawLine();
  },
  created() {
    // 列表数据
    this.getTableData();
  },
  methods: {
    //查询列表
    getTableData () {
      //查询方法  
      this.$http
      .get('analysis/monthly')
      .then(response => {
        console.log("response", response);
        if(response.status == "200"){
            //返回值填充页面
            this.tableData = response.data;  
              console.log(this.tableData.length)
            for(var i=0; i<this.tableData.length; i++){
              console.log(this.tableData[i])
              this.timeArray.push(this.tableData[i].period);
              this.tempArray.push(this.tableData[i].countResults[0].count);
              this.leakageArray.push(this.tableData[i].countResults[1].count);
              this.faultArray.push(this.tableData[i].countResults[2].count);
            }
            // 测试
            // this.timeArray=['2019-05-01','2019-05-02','2019-05-03','2019-05-04','2019-05-05','2019-05-06','2019-05-07','2019-05-08','2019-05-09',
            // '2019-05-10','2019-05-11','2019-05-12','2019-05-13','2019-05-14','2019-05-15','2019-05-16','2019-05-17','2019-05-18','2019-05-19',
            // '2019-05-20','2019-05-21','2019-05-22','2019-05-23','2019-05-24','2019-05-25','2019-05-26','2019-05-27','2019-05-28','2019-05-29',
            // '2019-05-30','2019-05-31']
            // this.tempArray=[12, 3, 7, 8, 5, 5, 8,9, 11, 13, 10, 5, 14, 12,12, 15, 17, 20, 16, 14, 18,12, 15, 28, 26, 5, 14,12,8,10,9]
            // this.leakageArray=[12, 7, 39, 12, 5, 6, 7,1, 3, 5, 7, 5, 14, 15,12, 12, 6, 9, 12, 5, 6, 7,1, 3, 5, 7, 5, 14, 15,12,10]
            // this.faultArray=[12, 5, 10, 7, 5, 9, 4,2, 15, 28, 26, 5, 11, 12,15,12, 7, 9, 11, 5, 6, 5,1, 3, 2, 0, 5, 1, 10,13,15]

            this.drawLine();    
        }else{
          this.$alert("获取列表失败", {
                confirmButtonText: "确定"
              });
        }
      })
    },
    //折线图
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let drawLine = this.$echarts.init(document.getElementById('drawLine'))
      // 绘制图表
      drawLine.setOption({
          tooltip: {
              trigger: 'axis' 
          },
          legend: { //图例设置
              data:['温度报警','漏电报警','故障']
          },
          grid: { /* 直角坐标系内绘图网格--图像四周边距设置 */
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
                //设置X轴时间旋转
              axisLabel: { 
                rotate: 40,
                interval: 0
              },
              boundaryGap: false, //设置折线图从X轴0刻度开始
              data: this.timeArray
          },
          yAxis: {
              type: 'value',
              min: 0,
              // max: 50, //最大值
              // interval: 5, //间隔
          },
          series: [ //值域设置
              {
                  name:'温度报警',
                  type:'line',
                  // stack: '总量',
                  data:this.tempArray
              },
              {
                  name:'漏电报警',
                  type:'line',
                  // stack: '总量',
                  data:this.leakageArray
              },
              {
                  name:'故障',
                  type:'line',
                  // stack: '总量',
                  data:this.faultArray
              }
          ]
      });
    },
    //分页
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },

    handleClick(tab, event) {
        console.log(tab, event);
    },
    handle(tab, event) {
        console.log(tab, event);
    },
    // 表格 elementUI
    toggleSelection(rows) {
    if (rows) {
        rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
        });
    } else {
        this.$refs.multipleTable.clearSelection();
    }
    },
    // 表格 elementUI
    handleSelectionChange(val) {
    this.multipleSelection = val;
    }
  },
};
</script>
<style>
@import "../../assets/css/4.dataAnalysis/dataAnalysis";
/* 标题 */
.test_data {
  width: 100%;
  color: #5f5f5f;
  text-align: center;
  font-size: 20px;
  line-height: 32px;
}
/* 上半部分 */
.top_Analysis {
  margin-top: 28px;
  margin-left: 28px;
  margin-bottom: 18px;
  background: #ffffff;
  width: 96%;
  height: 395px;
}
.top_Analysis .el-tabs--top {
  padding: 0 20px 20px;
}
.top_Analysis .el-tabs--top .el-table {
  font-size: 12px;
}
/* .tableA .el-tabs--top .el-table .el-table__header tr,.el-table__header th {
    padding: 0;
    height: 20px;
}
.tableA .el-tabs--top .el-table .el-table__body tr,.el-table__body td {
    padding: 0;
    height: 35px;
} */

/* 下半部分 */
.bottom_Analysis {
  margin-top: 28px;
  margin-left: 28px;
  margin-bottom: 18px;
  background: #ffffff;
  width: 96%;
  height: 395px;
}
.bottom_Analysis .el-tabs--top {
  padding: 0 20px 20px;
}
.bottom_Analysis .el-tabs--top .el-table {
  font-size: 12px;
}
</style>