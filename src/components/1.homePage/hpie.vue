<template>
  <div id="drawRing"></div>
</template>
<script>
export default {
  data() {
    return {
      receiveData: []
    };
  },
  created() {
    // 获取环饼图数据
    this.$http.get("homePage/eType").then(response => {
      let ringData = [];
      response.data.data.forEach(item => {
        ringData.push({ name: item.type, value: item.count });
      });
      this.receiveData = ringData;
      this.drawRing();
    });
  },
  methods: {
    // 绘制饼图
    drawRing() {
      let drawRing = this.$echarts.init(document.getElementById("drawRing"));
      drawRing.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}"
        },
        // 标注
        legend: {
          orient: "vertical",
          x: "75%",
          // y: "10%",
          data: this.receiveData.name
        },
        // 分列数据
        series: [
          {
            center: ["35%", "45%"],
            type: "pie",
            radius: ["30%", "60%"],
            label: {
              normal: {
                formatter: "{b|{b}:} {per|  {d}%}",
                padding: [0, 4],
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 22
                  }
                }
              }
            },
            // 渲染的数据
            data: this.receiveData,
            color: ["#4cca76", "#3ba1e9", "#fa6b67", "#fec048", "#909399"]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
#drawRing {
  width: 100%;
  height: 35vh;
}
</style>
