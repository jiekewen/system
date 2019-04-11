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
    this.$http.get("homePage/eType").then(response => {
      let ringData = [];
      response.data.data.forEach(item => {
        ringData.push({ name: item.type, value: item.count });
      });
      this.receiveData = ringData;
      this.drawRing();
    });
  },
  mounted() {},
  methods: {
    drawRing() {
      let drawRing = this.$echarts.init(document.getElementById("drawRing"));
      drawRing.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}"
        },
        legend: {
          orient: "vertical",
          x: "80%",
          data: this.receiveData.name
        },
        series: [
          {
            center: ["40%", "50%"],
            type: "pie",
            radius: ["40%", "70%"],
            label: {
              normal: {
                formatter: "{b|{b}:} {per|  {d}%}",
                padding: [0, 4],
                rich: {
                  b: {
                    fontSize: 14,
                    lineHeight: 22
                  }
                }
              }
            },
            data: this.receiveData,
            color: ["#4cca76", "#3ba1e9", "#fa6b67", "#fec048"]
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
  height: 30vh;
}
</style>
