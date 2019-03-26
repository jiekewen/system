<template>
  <div>
    <div class="center" id="date"></div>
  </div>
</template>
<script>
// header时间日期
var interval = setInterval(function() {
  var week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var hour = myDate.getHours();
  // var showHour = hour > 12 ? hour - 12 : hour;
  var day = myDate.getDate();
  var minute = myDate.getMinutes();
  var second = myDate.getSeconds();
  minute = minute < 10 ? "0" + minute : minute.toString();
  var dayOfWeek = week[myDate.getDay()];
  if (document.getElementById("date")) {
    document.getElementById("date").innerHTML =
      year +
      "年" +
      month +
      "月" +
      day +
      "日 " +
      dayOfWeek +
      " " +
      hour +
      ":" +
      minute;
  }
}, 1000);
</script>
<style lang="less" scoped>
.center {
  display: flex;
  text-align: center;
  font-size: 14px;
}
</style>
