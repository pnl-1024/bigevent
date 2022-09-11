//每次触发请求时先调用这个函数
//实现请求地址拼接效果
// 函数的参数就是输入的api地址，拼接根路径
$.ajaxPrefilter(function (options) {
  //发起请求之前拼接地址
  options.url = "http://www.liulongbin.top:3007" + options.url;
  //统一给需要权限的接口添加headers请求头
  //判断是否有/my请求
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  //全局统一挂载complete验证是否登陆
  options.complete = function (res) {
    //不论成功和失败，都会调用complete回调函数，判断是否登陆

    //在complete函数中根据res.responseJSON获得status状态码
    //如果状态码不是0就是没有登陆，清空token和跳转到首页

    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //清空token
      localStorage.removeItem("token");
      //强制跳转首页
      location.href = "/login.html";
    }
  };
});
