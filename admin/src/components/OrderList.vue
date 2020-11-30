<template>
  <div class="main">
    <div class="container" ref="container"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  // mounted() {
  //   var echarts = require("echarts");
  //   console.log(echarts);
  //   var myChart = echarts.init(this.$refs.container);
  //   myChart.setOption({
  //     title: {
  //       text: "订单",
  //     },
  //     tooltip: {
  //       show: true,
  //       axisPointer: "y",
  //       triggerOn: "mousemove",
  //       trigger: "axis",
  //     },
  //     xAxis: {
  //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  //       left:0
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         color: [
  //           "#dd6b66",
  //           "#759aa0",
  //           "#e69d87",
  //           "#8dc1a9",
  //           "#ea7e53",
  //           "#eedd78",
  //           "#73a373",
  //           "#73b9bc",
  //           "#7289ab",
  //           "#91ca8c",
  //           "#f49f42",
  //         ],
  //         name: "销量",
  //         type: "line",
  //         data: [5, 20, 36, 10, 10, 20],
  //         // 高亮样式。
  //         emphasis: {
  //           itemStyle: {
  //             // 高亮时点的颜色。
  //             color: "orange",
  //           },
  //           label: {
  //             show: true,
  //             // 高亮时标签的文字。
  //           },
  //         },
  //       },
  //     ],
  //   });
  // },
};
</script>
<style lang="scss" scoped>
.main {
  width: 700px;
  height: 100vh;
  .container {
    width: 100%;
    height: 100%;
  }
}
</style>