<template>
  <div id="drawMap"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.createMap(); //创建地图
  },
  methods: {
    // 添加标记
    addMarker(point) {
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    },
    // 创建地图
    createMap() {
      var map = new BMap.Map("drawMap"); //在百度地图容器中创建一个地图
      var point = new BMap.Point(116.404, 39.915); //定义一个中心点坐标
      map.centerAndZoom(point, 9); //设定地图的中心点和坐标并将地图显示在地图容器中
      map.addEventListener("click", function() {
        console.log("地图点击事件");
      });
      window.map = map; //将map变量存储在全局
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // 文本标注
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-10, 10) //设置文本偏移量
      };
      // 添加文本
      var label = new BMap.Label("光谷电气", opts); // 创建文本标注对象
      label.setStyle({
        color: "red",
        fontSize: "12px",
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
        border: "1px solid orange"
      });
      // 添加标注
      map.addOverlay(label);
      var point = new BMap.Point(116.404, 39.915);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker);
      // 随机添加标注
      // 随机向地图添加25个标注
      var bounds = map.getBounds();
      var sw = bounds.getSouthWest();
      var ne = bounds.getNorthEast();
      var lngSpan = Math.abs(sw.lng - ne.lng);
      var latSpan = Math.abs(ne.lat - sw.lat);
      for (var i = 0; i < 10; i++) {
        var point = new BMap.Point(
          sw.lng + lngSpan * (Math.random() * 0.7),
          ne.lat - latSpan * (Math.random() * 0.7)
        );
        this.addMarker(point);
      }
      // 添加或和地图控件
      var mapType1 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        anchor: BMAP_ANCHOR_TOP_LEFT
      });

      var overView = new BMap.OverviewMapControl();
      var overViewOpen = new BMap.OverviewMapControl({
        isOpen: true,
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
      });
      map.addControl(mapType1); //2D图，混合图
      map.addControl(overView); //添加默认缩略地图控件
      map.addControl(overViewOpen); //右下角，打开
    }
  }
};
</script>
<style lang="less" scoped>
#drawMap {
  height: 62vh;
  width: 100%;
  font-family: "微软雅黑";
}
</style>
