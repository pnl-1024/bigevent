//每次触发请求时先调用这个函数
//实现请求地址拼接效果
// 函数的参数就是输入的api地址，拼接根路径
$.ajaxPrefilter(function (options) {
  //发起请求之前拼接地址
  options.url = "http://www.liulongbin.top:3007" + options.url;
  console.log(options.url);
});
