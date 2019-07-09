<template>
  <!-- 分类设置 -->
  <div class="sortConfig">
    <div class="sortConfig-header">
      <div class="header-left">
        <h3>层级配置列表</h3>
      </div>
      <div class="header-right">
        <el-button size="small" @click="ig" type="primary" icon="el-icon-edit" circle></el-button>
        <el-cascader @change="handleChange" class="sortConfig-cascader" :options="cascaderData"></el-cascader>
        <el-button @click="handleEdit" type="primary" plain>保存修改</el-button>
      </div>
    </div>
    <div class="sortConfig-wrap">
      <el-dialog title="编辑分类" :visible.sync="dialogVisible" width="30%">
        <el-card>
          <div slot="header">
            <h5>一级分类</h5>
            <p>{{ getStr1 }}</p>请输入：
            <el-input placeholder="str1" v-model="str1"></el-input>
            <p>{{ getStr2 }}</p>请输入：
            <el-input placeholder="str2" v-model="str2"></el-input>
            <p>{{ getStr3 }}</p>请输入：
            <el-input placeholder="str3" v-model="str3"></el-input>
          </div>
          <h5>二级分类</h5>
          <p>{{getStr4}}</p>请输入：
          <el-input placeholder="str4" v-model="str4"></el-input>
          <p>{{getStr5}}</p>请输入：
          <el-input placeholder="str5" v-model="str5"></el-input>
          <p>{{getStr6}}</p>请输入：
          <el-input placeholder="str6" v-model="str6"></el-input>
        </el-card>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="asd">确 定</el-button>
        </span>
      </el-dialog>
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
          :filters="[{ text: getStr1, value: getStr1 }, { text: getStr2, value: getStr2 },{ text: getStr3, value: getStr3 }]"
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
          :filters="[{ text: getStr4, value: getStr4 }, { text: getStr5, value: getStr5},{ text: getStr6, value: getStr6 }]"
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
      pageSize: 10, //每页显示数目
      dialogVisible: false,
      str1: "新工厂配电室",
      str2: "工厂ipanel柜",
      str3: "实验柜",
      getStr1: "新工厂配电室",
      getStr2: "工厂ipanel柜",
      getStr3: "实验柜",
      str4: "工厂用电",
      str5: "照明用电",
      str6: "其他",
      getStr4: "工厂用电",
      getStr5: "照明用电",
      getStr6: "其他"
    };
  },
  created() {
    // 储存当前页
    this.pageNo = Number(sessionStorage.getItem("currentPage")) || 1;
    this.pageChange(this.pageNo);
    // 获取列表总数
    this.$http
      .get("set/equipmentCount")
      .then(response => {
        console.log("response", response);

        this.pageTotal = response.data.data;
      })
      .catch(err => {
        console.log("err", err);
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
    asd() {
      this.getStr1 = this.str1;
      this.getStr2 = this.str2;
      this.getStr3 = this.str3;
      this.getStr4 = this.str4;
      this.getStr5 = this.str5;
      this.getStr6 = this.str6;
      this.cascaderData = [
        {
          value: this.str1,
          label: this.str1,
          children: [
            {
              value: this.str4,
              label: this.str4
            },
            {
              value: this.str5,
              label: this.str5
            },
            {
              value: this.str6,
              label: this.str6
            }
          ]
        },
        {
          value: this.str2,
          label: this.str2,
          children: [
            {
              value: this.str4,
              label: this.str4
            },
            {
              value: this.str5,
              label: this.str5
            },
            {
              value: this.str6,
              label: this.str6
            }
          ]
        },
        {
          value: this.str3,
          label: this.str3,
          children: [
            {
              value: this.str4,
              label: this.str4
            },
            {
              value: this.str5,
              label: this.str5
            },
            {
              value: this.str6,
              label: this.str6
            }
          ]
        }
      ];
      this.dialogVisible = false;
    },
    // 修改分类
    ig() {
      this.dialogVisible = true;
    },
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
