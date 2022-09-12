$(function () {
  //获取表单设置验证规则
  var form = layui.form;
  //获取layui.layer提示属性
  var layer = layui.layer;
  //定义密码规则
  form.verify({
    //设置昵称规则 nickname是规则名称，写在lay-verify中|nickname
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //设置规则原密码和新密码不能一样
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码不能相同";
      }
    },
    //设置确认新密码和新密码一直
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码不一致";
      }
    },
  });
  //绑定表单提交事件发起Ajax请求重置密码
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新密码失败");
        }
        layer.msg("更新密码成功");
        //将jquer对象添加索引变成dom对象进行重置
        $(".layui-form")[0].reset();
        //密码7个1
      },
    });
  });
});
