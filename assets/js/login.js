$(function () {
  //点击链接实现切换注册和登陆页面
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //获取layui的form元素定义正则验证表单
  var form = layui.form;
  //获取layui弹出提示方法
  var layer = layui.layer;
  //设置form.verify属性验证条件
  form.verify(
    //自定义了pwd的密码限制条件，不能有空格，6-12位
    {
      pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
      repwd: function (value) {
        //通过形参value拿到确认密码框的值
        //通过属性值name拿到密码框的值
        //将两个值进行比较判断，不相同就提示
        var pwd = $(".reg-box [name=password]").val();
        if (pwd !== value) {
          return "两次密码不一样";
        }
      },
    }
  );
  //绑定注册b表单事件
  $("#form_reg").on("submit", function (e) {
    //阻止默认事件
    e.preventDefault();
    //发起ajax请求
    var data = {
      username: $(".reg-box [name=username]").val(),
      password: $(".reg-box [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请去登陆");
      //注册成功自动点击去登陆按钮
      $("#link-login").click();
    });
  });
  //监听登陆表单事件
  $("#form_login").submit(function (e) {
    //阻止默认行为
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      //快速获取表单数据
      data: $(this).serialize(),

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登陆失败");
        }
        layer.msg("登陆成功");
        //将登陆成功的token字符串保存到localStorage
        localStorage.setItem("token", res.token);
        //登陆成功自动跳转到主页面
        location.href = "./index.html";
      },
    });
  });
});
