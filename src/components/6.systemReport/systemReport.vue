<template>
  <div class="systemReport">
    <!-- 上半部分 -->
    <div class="systemReport-up-half">
      <div class="up-half-left">
        <h3>系统报表分类</h3>
      </div>
      <div class="up-half-right">
        <span>选择区域 :</span>
        <el-cascader
          placeholder="选择分类"
          @change="handleChange"
          :options="cascaderData"
          v-model="selectedOptions"
        ></el-cascader>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="systemReport-down-half">
      <div class="down-half-box">
        <!-- 日累计量报表 -->
        <dayReportList1 class="half-box1"></dayReportList1>
        <!-- 月累积量报表 -->
        <monthReportList1 class="half-box2"></monthReportList1>
        <!-- 年累积量报表 -->
        <yearReportList1 class="half-box3"></yearReportList1>
      </div>
      <div class="down-half-box">
        <!-- 日报表 -->
        <dayReportList2 class="half-box1"></dayReportList2>
        <!-- 月报表 -->
        <monthReportList2 class="half-box2"></monthReportList2>
        <!-- 年报表 -->
        <yearReportList2 class="half-box3"></yearReportList2>
      </div>
    </div>
  </div>
</template>
<script>
import dayReportList1 from "./dayReportList1";
import monthReportList1 from "./monthReportList1";
import yearReportList1 from "./yearReportList1";
import dayReportList2 from "./dayReportList2";
import monthReportList2 from "./monthReportList2";
import yearReportList2 from "./yearReportList2";
export default {
  name: "SystemReport",
  data() {
    return {
      cascaderData: [
        {
          value: "",
          label: "全部",
          children: [{ value: "", label: "全部" }]
        },
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
      selectedOptions: ["", ""]
    };
  },
  components: {
    dayReportList1,
    monthReportList1,
    yearReportList1,
    dayReportList2,
    monthReportList2,
    yearReportList2
  },
  created() {
    this.$store.state.handleChangeData = this.selectedOptions;
  },
  methods: {
    // 级联选中
    handleChange(value) {
      console.log(value);
      this.$store.state.handleChangeData = value;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/6.systemReport/systemReport";
</style>
<style lang="less">
.systemReport {
  .systemReport-up-half {
    // 级联框内
    .el-input__inner {
      border: 1px solid #b5d9ff;
      border-radius: 4px;
      background-color: #ecf5ff;
    }

    .el-cascader__label {
      color: #409eff;
    }
  }
}
</style>
