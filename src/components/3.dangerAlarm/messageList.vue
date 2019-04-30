<!-- 报警管理---消息列表 -->
<template>
  <div class="MessageList">
    <h3 class="alerm-test">消息列表</h3>
    <View-page class="Viewpage-content">
      <!-- (区域)过滤框 -->
      <template slot="middle-filter">
        <span class="MessageList-area">区域</span>
        <el-cascader :options="options" @change="handleChange"></el-cascader>
      </template>
      <!-- (日期)过滤框 -->
      <template slot="right-filter">
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          @change="timeClick"
        ></el-date-picker>
      </template>
      <!-- 表格区 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        size="mini"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <!-- <el-table-column align="center" type="selection" width="30"></el-table-column> -->
        <el-table-column align="center" label="等级" prop="rank" width="50"></el-table-column>
        <el-table-column align="center" label="配电室" prop="switchhouse" width="120"></el-table-column>
        <el-table-column align="center" label="报警位置" prop="tds" width="100"></el-table-column>
        <el-table-column
          align="center"
          label="报警时间"
          prop="alarmtime"
          width="230"
          :formatter="formatAlarmtime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="类别"
          prop="alarmtype"
          width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="数值" prop="val" width="80"></el-table-column>
        <el-table-column align="center" label="阈值" prop="alarmlimit" width="60"></el-table-column>
        <el-table-column align="center" label="确认人" prop="confirmper" width="80"></el-table-column>
        <el-table-column
          align="center"
          label="确认时间"
          prop="confirmtime"
          width="230"
          :formatter="formatConfirmtime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          label="消息状态"
          prop="status"
          width="100"
          :formatter="formatStatus"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === true"
              @click.native.prevent="deleteRow(scope.row.id)"
              type="text"
              size="small"
            >删除</el-button>
            <el-button v-else @click="switchChange(scope.row.id)" type="text" size="small">标记</el-button>
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
          background
        ></el-pagination>
      </div>
    </View-page>
  </div>
</template>
<script>
import ViewPage from "./ViewPage";
import moment from "moment";
export default {
  name: "MessageList",
  components: {
    ViewPage
  },
  data() {
    return {
      options: [
        {
          value: "新工厂配电室",
          label: "新工厂配电室",
          children: [
            {
              value: "工厂用电",
              label: "工厂用电"
            },
            {
              value: "照明用电",
              label: "照明用电"
            },
            {
              value: "其他",
              label: "其他"
            }
          ]
        },
        {
          value: "工厂ipanel柜",
          label: "工厂ipanel柜",
          children: [
            {
              value: "工厂用电",
              label: "工厂用电"
            },
            {
              value: "照明用电",
              label: "照明用电"
            },
            {
              value: "其他",
              label: "其他"
            }
          ]
        },
        {
          value: "实验柜",
          label: "实验柜",
          children: [
            {
              value: "工厂用电",
              label: "工厂用电"
            },
            {
              value: "照明用电",
              label: "照明用电"
            },
            {
              value: "其他",
              label: "其他"
            }
          ]
        }
      ],
      //表格
      tableData: [],
      istag: true,
      value: "",
      istag: "",
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      startDate: "",
      endDate: "",
      switchhouse: "", //一级分类 配电室
      category: "" //二级分类 工厂用电 照明用电
    };
  },
  methods: {
    //消息状态
    formatStatus: function(row, column) {
      return row.status === false ? "未解决" : "已解决";
    },
    //报警时间
    formatAlarmtime: function(row, column) {
      var time = row.alarmtime;
      time = time.replace("T", " ").split(".")[0];
      return time;
    },
    //确认时间
    formatConfirmtime: function(row, column) {
      if (row.confirmtime == "" || row.confirmtime == null) return;
      var time = row.confirmtime;
      time = time.replace("T", " ").split(".")[0];
      return time;
    },
    //时间选择更改方法
    timeClick(value) {
      this.startDate = moment(value[0]).format("YYYY-MM-DD HH:mm:ss");
      this.endDate = moment(value[1]).format("YYYY-MM-DD") + " 23:59:59";
      this.selectFunction();
      console.log(
        moment(value[0]).format("YYYY-MM-DD HH:mm:ss") +
          "==" +
          moment(value[1]).format("YYYY-MM-DD") +
          " 23:59:59"
      );
    },
    //获取报警总数--分页
    getTableTotal() {
      var checkData = {
        startDate: this.startDate,
        endDate: this.endDate,
        switchhouse: this.switchhouse,
        category: this.category
      };
      this.$http.post("alarm/alarmCount", checkData).then(response => {
        if (response.status == "200") {
          if (response.data.code == 0) {
            //返回值填充页面
            this.total = response.data.data;
          }
        } else {
          this.$alert("获取列表总数失败", {
            confirmButtonText: "确定"
          });
          this.total = 0;
        }
      });
    },
    //改变页码
    pageChange(val) {
      this.currentPage = parseInt(val);
      this.selectFunction();
    },
    //区域
    handleChange(value) {
      this.switchhouse = value[0];
      this.category = value[1];
      this.selectFunction();
    },
    //查询列表
    selectFunction() {
      //查询参数
      var checkData = {
        startDate: this.startDate,
        endDate: this.endDate,
        switchhouse: this.switchhouse,
        category: this.category,
        pageSize: this.pagesize,
        pageNum: this.currentPage
      };
      //查询方法
      this.$http.post("alarm/alarmList", checkData).then(response => {
        console.log("response", response);
        if (response.status == "200") {
          if (response.data.code == 0) {
            //返回值填充页面
            this.tableData = response.data.data;
            this.getTableTotal();
          }
        } else {
          this.$alert("获取列表失败", {
            confirmButtonText: "确定"
          });
          this.total = 0;
          this.pagesize = 10;
          this.currentPage = 1;
          this.tableData = [];
        }
      });
    },
    // 标记
    switchChange(index) {
      console.log(index);
      this.$confirm("是否确认标记此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.istag = index;
          var checkData = {
            id: index,
            status: true
          };
          this.$http.post("alarm/updateStatus", checkData).then(response => {
            if (response.status == "200") {
              if (response.data.code == 0) {
                //返回值填充页面
                this.selectFunction();
              }
            } else {
              this.$alert("标记数据失败", {
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {});
    },
    // 删除单行
    deleteRow(index) {
      console.log(index);
      this.$confirm("是否确认删除此数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$http.delete("alarm/deleteAlarm?id=" + index).then(response => {
            if (response.status == "200") {
              if (response.data.code == 0) {
                //返回值填充页面
                this.selectFunction();
              }
            } else {
              this.$alert("删除数据失败", {
                confirmButtonText: "确定"
              });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
@import "../../assets/css/3.dangerAlarm/messageList";
</style>

