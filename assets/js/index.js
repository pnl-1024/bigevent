//入口函数 自动执行不需要调用
$(function () {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo();
  var layer = layui.layer;
  $("#btnLogout").on("click", function () {
    //提示用户是否退出
    layer.confirm("是否退出?", { icon: 3, title: "提示" }, function (index) {
      //执行完的回调函数，如果退出就到登陆页面
      //1.清空本地存贮的token
      localStorage.removeItem("token");
      //2.跳转登陆页面
      location.href = "/login.html";
      //关闭弹出框
      layer.close(index);
    });
  });
});
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    //因为需要权限，所以需要添加头部token
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    //要先登陆才能获取，不登陆就一直给你失败！
    success: function (res) {
      //对请求结果进行判断
      if (res.status !== 0) {
        return layui.layer.msg("获取失败");
      } //调用函数渲染用户头像
      renderAvatar(res.data);
    },
    //不论成功和失败，都会调用complete回调函数，判断是否登陆
    // complete: function (res) {
    //   //在complete函数中根据res.responseJSON获得status状态码
    //   //如果状态码不是0就是没有登陆，清空token和跳转到首页
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     //清空token
    //     localStorage.removeItem("token");
    //     //强制跳转首页
    //     location.href = "/login.html";
    //   }
    // },
  });
}
// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username;
  // 2. 设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 3.2 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
