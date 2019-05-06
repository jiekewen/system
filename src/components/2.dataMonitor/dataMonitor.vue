<!-- 数据监控 -->
<template>
  <div class="dataMonitor">
    <!-- 上半部分 -->
    <div class="topMonitor">
      <!-- 设备信息 -->
      <div class="message_Monitor">
        <div class="images_Monitor">
          <img src="../../assets/images/dataMonitor/facility-icon.png" alt>
          <p class="images_test">设备信息</p>
        </div>
        <div class="test_Monitor">
          <p class="test_left">{{this.deviceInfo.cnm}}</p>
          <p class="test_right">{{this.deviceInfo.enm}}</p>
        </div>
        <div class="content_Monitor">
          <p class="content_test">状态:&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="success">正常</el-button>
            <!-- <el-button type="info">失联</el-button> -->
            <!-- <el-button type="warning">故障</el-button> -->
            <!-- <el-button type="danger">报警(漏电)</el-button> -->
          </p>
          <p class="content_test">所属区域:&nbsp;&nbsp;&nbsp;&nbsp;{{this.deviceInfo.switchhouse}}</p>
          <p class="content_test">所属位置:&nbsp;&nbsp;&nbsp;&nbsp;{{this.deviceInfo.category}}</p>
          <p class="content_test">型号:&nbsp;&nbsp;&nbsp;&nbsp;{{this.deviceInfo.bnm}}</p>
        </div>

      </div>
      <!-- 设备状态 -->
      <div class="status_Monitor">
        <div class="top_status">
          <!-- 左半部分 -->
          <div class="left_status">
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
          </div>
          <!-- 右半部分 -->
          <div class="right_status">
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
              <span class="test_all">漏电一:80mA
                <span class="zt_test">状态:<div class="circle_test"></div></span>
              </span>
          </div>                    
        </div>
        <!-- 复位、自检 -->
        <div class="check_status">
          <el-row>
            <el-button type="primary">复位</el-button>
            <!-- <el-button type="primary">自检</el-button>          -->
          </el-row>  
        </div>         
      </div>
      <!-- 实时报警 -->
      <div class="alarm_Monitor">
        <div class="image_Monitor">
          <img src="../../assets/images/dataMonitor/alerm-icon.png" alt>
          <p class="image_test">实时报警</p>
          <dataList></dataList>
        </div>

      </div>
    </div>
    <!-- 下半部分 -->
    <div class="bottomMonitor">
      <el-row class="button_row">
            <el-button class="button_fw" type="primary">复位</el-button>
      </el-row> 
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(monitor, index) in monitorList" :label="monitor.description" :key="index" class="tabpane" :name="monitor.description" :sn="monitor.sn">
          <div class="dataAnalysis">
            <el-tabs  @tab-click="portHandleClick">
              <el-tab-pane v-for="(port, index) in portList" :key="index" :label="port.cds" :name="port.cnm" :cnm="port.cnm">
                <div class="port_box"> 
                  <!-- 设备 -->
                  <div class="button_content">
                    <div class="port_test">
                      <el-button type="success" v-for="(device, index) in deviceList" :key="index" @click="getDeviceInfo(device.id)">{{device.enm}}</el-button>
                    </div>
                  </div>
                  <!-- 分页 -->
                  <div class="page_port">
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="50">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// 报警
import dataList from "./dataList";

export default {
  name: "DataMonitor",
  data() {
    return {
      activeName: 'first',
      monitorList:[],
      portList:[],
      deviceList:[],
      bsn:'',
      pageNum:1,
      pageSize:10,
      deviceInfo:{}
    };
  },
   components: {
    dataList,
  },
  created() {
    this.getMonitorList();
  },
  methods: {
    //单击通讯机事件
    handleClick(tab) {
      this.bsn = tab.$attrs.sn;
      this.getPortList(this.bsn);
    },
    //单击端口事件
    portHandleClick(tab) {
      this.getDeviceList(tab.$attrs.cnm);
    },
    /*获得全部通讯机
    */
    getMonitorList(){
      this.$http
        .get('equipment/getBsnByEid')
        .then(response => {
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.monitorList = response.data.data;
              if(this.monitorList.length>0){
                this.getPortList(this.monitorList[0].sn);
              }
            }
          } else {
             this.$alert("获取通讯机失败", {
              confirmButtonText: "确定"
            });
            this.monitorList = [];
          }
        })
    },
    //获得全部端口
    getPortList(sn){
      this.$http
        .get('equipment/getCnmByBsn?bsn='+sn)
        .then(response => {
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.portList = response.data.data;
              if(this.portList.length > 0){
                this.getDeviceList(this.portList[0].cnm);
              }
            }
          } else {
             this.$alert("获取通道失败", {
              confirmButtonText: "确定"
            });
            this.portList = [];
          }
        })
    },
    //获取全部设备
    getDeviceList(cnm){
      this.$http
        .get('equipment/getEqListByCnm?bsn='+this.bsn+"&cnm="+cnm+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize)
        .then(response => {
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.deviceList = response.data.data;
            }
          } else {
             this.$alert("获取全部设备失败", {
              confirmButtonText: "确定"
            });
            this.deviceList = [];
          }
        })
    },
    getDeviceInfo(id){
      this.$http
        .get('equipment/getEquipmentById?id='+id)
        .then(response => {
          if(response.status == "200"){
            if (response.data.code == 0) {
              this.deviceInfo = response.data.data;
              console.log(this.deviceInfo);
            }
          } else {
             this.$alert("获取单个设备信息失败", {
              confirmButtonText: "确定"
            });
            this.deviceInfo = {};
          }
        })
    }
  }
};
</script>
<style>
@import "../../assets/css/2.dataMonitor/dataMonitor";
/* 上半部分 */
.topMonitor {
  padding-top: 28px;
  padding-left: 28px;
  display: flex;
}
/* 设备信息 */
.message_Monitor {  
  background: #ffffff;
  width: 27%;
  height: 260px;
  display: inline-block;
  /* box-shadow: 5px 5px 5px #888888; */
}
.images_Monitor {
  display: inline-block;
  margin-top: 17px;
  margin-left: 21px;
}
.images_test {
  float: right;
  padding-left: 15px;
}
.test_Monitor {
  float: right;
  padding-top: 17px;
  padding-right: 20px;
}
.test_left {
  float: left;
}
.test_right{
  float: right;
  padding-left: 10px;
}
.content_Monitor {
  padding-top: 25px;
}
.content_test {
  padding-left: 45px;
  padding-bottom: 25px;
  /* font-weight:bold; */
}
/* 设备状态 */
.status_Monitor {
  margin-left: 15px;
  background: #ffffff;
  width: 41%;
  height: 260px;
  display: inline-block;
}
.top_status {
  height: 190px;
}
.left_status {
  padding-top: 20px;
  width: 240px;
  padding-left: 26px;
}
.test_all {  
  margin-bottom: 25px;
}
.zt_test {
  padding-left: 25px;  
}
.circle_test {
  width:20px;
  height:20px;
  border-radius:50px;
  background: #F56C6C;
  margin-left: 190px;
  margin-top: -20px;
  margin-bottom: 25px;
}
/* 右 */
.right_status {
  padding-top: 28px;
  width: 240px;
  float: right;
  margin-top: -233px;
}
.check_status {
  padding-right: 20px;
  margin-top: -18px;
  float: right;
}
.check_status .el-row .el-button {
  padding: 8px 19px;
}
/* 实时报警 */
.alarm_Monitor {
  margin-left: 15px;
  padding-right: 10px;
  background: #ffffff;
  width: 27%;
  height: 260px;
  display: inline-block;
}
.image_Monitor {
  /* display: inline-block; */
  margin-top: 17px;
  margin-left: 21px;
}
.image_test {
  padding-left: 40px;
  margin-top: -23px;
}
/* 下半部分 */
.bottomMonitor {
  margin-top: 28px;
  margin-left: 28px;
  background: #ffffff;
  width: 96%;
  height: 375px;
}
.tabpane {
  margin-top:-3px;
  margin-left: 5px;
  margin-right: 5px;
  border-left:solid #ddd 1px;
  border-right:solid #ddd 1px;
  border-bottom:solid #ddd 1px;
  border-top:none;
}
.bottomMonitor .el-tabs .el-tabs__header {
    padding-left: 0px;
    padding-top: 5px;
    margin: 0 5px 15px;
}
.bottomMonitor .el-tabs .el-tabs__content {
  margin-top: -15px
}
/* 通讯机-复位 */
.dataMonitor .bottomMonitor .button_row {
  float: right;
  display: inline-block;
}
.dataMonitor .bottomMonitor .button_fw {
  padding: 8px 19px;
  margin-top: 5px;
  margin-right: 6px;
}
.dataAnalysis .el-tabs--top {
  padding: 0 20px 20px;
}
.port_box {
  /* width: 1400px; */
  padding-top: 12px;
}
.port_test {
  margin-left: 22px;
  margin-top: 1px;
  margin-bottom: 15px;
}
/* 分页 */
.page_port .el-pagination {
  display: inline-block;
  margin-top: -4px !important;
  margin-right: 46px;
  float: right;
}
</style>