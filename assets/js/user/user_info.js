$(function () {
  //获取表单设置验证规则
  var form = layui.form;
  //获取layui.layer提示属性
  var layer = layui.layer;
  form.verify({
    //设置昵称规则 nickname是规则名称，写在lay-verify中|nickname
    nickname: function (value) {
      if (value.length > 6) {
        return alert("昵称长度必须在1-6个字符之间");
      }
    },
  }); //调用初始化用户信息函数
  initUserInfo();
  //利用ajax初始化用户信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        //调用 form.val()方法快速获取值
        form.val("formUserInfo", res.data);
      },
    });
  }
  //重置用户信息
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    //重置就是恢复默认值
    initUserInfo();
  });
  //提交用户信息的修改，监听表单提交事件

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    //发起Ajax请求更新数据
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      //快速获取表单填写的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败");
        }
        layer.msg("更新用户信息成功");
        //调用父页面的js方法重新渲染替换欢迎文本和头像
        //子页面是ifname的主体部分
        window.parent.getUserInfo();
      },
    });
  });
});
