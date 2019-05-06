<!-- 数据分析--折线图(月度报警隐患统计) -->
<template>
  <div class="echarts_test">
    <div id="drawLine" :style="{width: '1300px', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        let drawLine = this.$echarts.init(document.getElementById('drawLine'))
        // 绘制图表
        drawLine.setOption({
            tooltip: { 
                trigger: 'axis' 
            },
            toolbox: { 
            },
            legend: { 
                data:['温度报警','漏电报警','故障']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21',
                '22','23','24','25','26','27','28','29','30','31']
            },
            yAxis: {
                type: 'value',
                min: 0, //最小值
                // max: 50, //最大值
                // interval: 5, //间隔
            },
            series: [ 
                {
                    name:'温度报警',
                    type:'line',
                    stack: '总量',
                    data:[12, 3, 7, 8, 5, 5, 8,9, 11, 13, 10, 5, 14, 12,12, 15, 17, 20, 16, 14, 18,12, 15, 28, 26, 5, 14,12,8,10,9],
                    symbol: 'none' 
                },
                {
                    name:'漏电报警',
                    type:'line',
                    stack: '总量',
                    data:[12, 7, 39, 12, 5, 6, 7,1, 3, 5, 7, 5, 14, 15,12, 12, 7, 9, 12, 5, 6, 7,1, 3, 5, 7, 5, 14, 15,12,10],
                },
                {
                    name:'故障',
                    type:'line',
                    stack: '总量',
                    data:[12, 5, 10, 7, 5, 9, 4,2, 15, 28, 26, 5, 11, 12,15,12, 7, 9, 12, 5, 6, 7,1, 3, 5, 7, 5, 14, 15,12,15],
                }
            ]
        });
    }
  }
}
</script>

<style>

</style>
