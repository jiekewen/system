<template>
  <div id="drawRing"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawRing();
  },
  methods: {
    drawRing() {
      let drawRing = this.$echarts.init(document.getElementById("drawRing"));
      drawRing.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["直达", "百度", "视频广告", "邮件营销", "联盟广告"]
        },
        series: [
          {
            center: ["50%", "40%"],
            name: "访问来源",
            type: "pie",
            radius: ["30%", "50%"],
            label: {
              normal: {
                formatter: "{b|{b}：}{c} {per|{d}%}",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 2,
                shadowBlur: 3,
                shadowOffsetY: 2,
                shadowColor: "#999",
                padding: [0, 7],
                rich: {
                  b: {
                    fontSize: 14,
                    lineHeight: 22
                  },
                  per: {
                    color: "#fff",
                    backgroundColor: "#666",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 481, name: "百度" }
            ],
            color: ["#4cca76", "#3ba1e9", "#fa6b67", "gray", "#fec048"]
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
