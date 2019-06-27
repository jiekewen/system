<template>
  <!-- 地图容器 -->
  <baidu-map
    @click="zz(position.lng,position.lat)"
    class="map"
    :center="{lng: 116.404, lat: 39.915}"
    :zoom="11"
    :scroll-wheel-zoom="true"
  >
    <!-- 光谷电气位置 -->
    <bm-marker
      :position="{lng: 116.313806, lat: 40.042103}"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
      @click="infoWindowOpen"
      title="光谷电气"
    >
      <!-- 弹框设置 -->
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
      <!-- 文本展示 -->
      <bm-label
        content="光谷电气"
        :labelStyle="{color: 'red', fontSize : '14px'}"
        :offset="{width: -20, height: 30}"
      />
    </bm-marker>
    <!-- 中心点标注 -->
    <bm-marker title="中心" :position="{lng: 116.404, lat: 39.915}" :dragging="true"></bm-marker>
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    zz(lng, lat) {
      console.log("lng,lat", lng, lat);
    },
    // 文本关闭
    infoWindowClose() {
      this.show = false;
    },
    // 文本打开
    infoWindowOpen() {
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.map {
  height: 62vh;
  width: 100%;
  font-family: "微软雅黑";
}
</style>
