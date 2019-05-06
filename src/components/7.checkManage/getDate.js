function getDate() {
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var hour = myDate.getHours();
  var minute = myDate.getMinutes();
  var second = myDate.getSeconds();
  minute = minute < 10 ? "0" + minute : minute.toString();
  second = second < 10 ? "0" + second : second.toString();
  minute
  var dateShow = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  var formatDate = year + ' 年 ' + month + ' 月 ' + day + ' 日 ' + " " + hour + ':' + minute + ':' + second;
  var dateArray = [];
  dateArray.push(dateShow);
  dateArray.push(formatDate);
  return dateArray;
}
export {
  getDate
}
