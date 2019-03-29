<template>
  <div id="drawMap"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.createMap(); //创建地图
    },
    // 创建地图
    createMap() {
      var map = new BMap.Map("drawMap"); //在百度地图容器中创建一个地图
      var point = new BMap.Point(116.404, 39.915); //定义一个中心点坐标
      map.centerAndZoom(point, 5); //设定地图的中心点和坐标并将地图显示在地图容器中
      window.map = map; //将map变量存储在全局
      // 文本标注
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-10, 10) //设置文本偏移量
      };
      var label = new BMap.Label("光谷电气", opts); // 创建文本标注对象
      label.setStyle({
        color: "red",
        fontSize: "12px",
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
        border: "1px solid orange"
      });
      map.addOverlay(label);
    }
  }
};
</script>
<style lang="less" scoped>
#drawMap {
  height: 66vh;
  width: 100%;
  font-family: "微软雅黑";
}
</style>
