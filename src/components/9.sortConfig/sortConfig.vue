<template>
  <!-- 分类设置 -->
  <div class="sortConfig">
    <div class="sortConfig-header">
      <div class="header-left">
        <h3>层级配置列表</h3>
      </div>
      <div class="header-right">
        <el-cascader @change="handleChange" class="sortConfig-cascader" :options="cascaderData"></el-cascader>
        <el-button @click="handleEdit" type="primary" plain>保存修改</el-button>
      </div>
    </div>
    <div class="sortConfig-wrap">
      <!-- 表头部分 -->
      <el-table
        v-loading="loading"
        element-loading-text="首次加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#EBEEF5"
        :data="tableData"
        size="mini"
        style="width:100%"
        empty-text="数据为空"
        @selection-change="selects"
      >
        <!-- 渲染列表 -->
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="bnm" label="通讯管理机"></el-table-column>
        <el-table-column align="center" prop="enm" label="名称"></el-table-column>
        <el-table-column align="center" prop="eds" label="描述"></el-table-column>
        <!-- 一级筛选 -->
        <el-table-column
          align="center"
          prop="switchhouse"
          label="区域"
          :filters="[{ text: '新工厂配电室', value: '新工厂配电室' }, { text: '工厂ipanel柜', value: '工厂ipanel柜' },{ text: '实现柜', value: '实验柜' }]"
          :filter-method="filterTag1"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.switchhouse === '新工厂配电室' ? 'warning' : 'warning'"
              disable-transitions
            >{{scope.row.switchhouse}}</el-tag>
          </template>
        </el-table-column>
        <!-- 二级筛选 -->
        <el-table-column
          :filters="[{ text: '工厂用电', value: '工厂用电' }, { text: '照明用电', value: '照明用电' },{ text: '其他', value: '其他' }]"
          :filter-method="filterTag2"
          filter-placement="bottom-end"
          align="center"
          prop="category"
          label="类别"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.category === '工厂用电' ? 'success' : 'success'"
              disable-transitions
            >{{scope.row.category}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="wra-page">
        <el-pagination
          @current-change="pageChange"
          :page-size="pageSize"
          :current-page.sync="pageNo"
          background
          layout="prev, pager, next"
          :total="pageTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// 复制方法引入
import { copyArray } from "./copyArray";
export default {
  name: "sortConfig",
  data() {
    return {
      // 层级选项
      cascaderData: [
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
      tableData: [], //列表
      checkedRow: [], //选中行
      checkedSelect: [], //选中下拉框
      currrentRoleId: "Root", //用户id
      loading: false,
      pageTotal: 0, //分页总数
      pageNo: 1, //当前页
      pageSize: 10 //每页显示数目
    };
  },
  created() {
    // 储存当前页
    this.pageNo = Number(sessionStorage.getItem("currentPage")) || 1;
    this.pageChange(this.pageNo);
    // 获取列表总数
    this.$http.get("set/equipmentCount").then(response => {
      this.pageTotal = response.data.data;
    });
    // 列表数据
    this.getTableList();
  },
  beforeUpdate() {
    sessionStorage.setItem("currentPage", this.pageNo);
  },
  beforeDestroy() {
    sessionStorage.setItem("currentPage", "1");
  },
  methods: {
    async getTableList() {
      //  发送请求
      await this.$http
        .get(
          `set/equipmentListByEid?pageNum=${Number(
            sessionStorage.getItem("currentPage")
          ) || 1}&pageSize=${10}`
        )
        .then(response => {
          if (response.data.code == 0) {
            this.tableData = response.data.data;
          } else {
            this.$alert("获取列表失败", {
              confirmButtonText: "确定"
            });
          }
        });
    },
    //改变页码
    pageChange(val) {
      this.pageNo = parseInt(val);
      this.getTableList();
    },

    // 级联选择器change事件
    handleChange(value) {
      //把分类赋值checkedSelect
      this.checkedSelect = value;
    },
    //点击保存提交
    handleEdit(h) {
      //判断是否选择了数据
      if (this.checkedRow.length == 0) {
        this.$alert("请先勾选数据", {
          confirmButtonText: "确定"
        });
        return false;
      }
      let sendData = []; //要发送的数据
      //判断是否选择了分类
      if (this.checkedSelect.length !== 0) {
        let arr = JSON.parse(JSON.stringify(this.checkedRow));
        arr.forEach(item => {
          //把分类信息追加到要上传的数据中的每个数组对象里面去
          item.switchhouse = this.checkedSelect[0];
          item.category = this.checkedSelect[1];
          sendData.push(item);
        });
      } else {
        this.$alert("请选择分类", {
          confirmButtonText: "确定"
        });
      }
      //上传数据、分类
      this.$http
        .post("set/updateSetBatch", sendData)
        .then(res => {
          //选中数据、选择分类、返回状态码为0都满足
          if (
            res.data.code == 0 &&
            this.checkedSelect.length !== 0 &&
            this.checkedRow.length !== 0
          ) {
            // 保存后重新请求界面
            this.getTableList();
            this.$alert("保存成功", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(err => {
          this.$alert("保存失败", {
            confirmButtonText: "确定"
          });
        });
    },
    // 创建方法用于筛选对象所需要的属性
    helpFun(arr, attributeArr) {
      const result = [];
      arr.forEach(item => {
        const obj = {};
        attributeArr.forEach(el => {
          obj[el] = item[el];
        });
        result.push(obj);
      });
      return result;
    },
    // 获取选中数据
    selects(selection) {
      const resArr = this.helpFun(selection, [
        "bnm",
        "bsn",
        "eds",
        "enm",
        "tds",
        "tnm",
        "vt",
        "id"
      ]); //得到列表选中数据
      this.checkedRow = resArr;
    },
    // 筛选
    filterTag1(value, row) {
      return row.switchhouse === value;
    },
    filterTag2(value, row) {
      return row.category === value;
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/9.sortConfig/sortConfig";
</style>
