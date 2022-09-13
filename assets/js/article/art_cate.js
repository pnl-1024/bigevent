$(function () {
  var layer = layui.layer;
  var form = layui.form;
  initArtCateList();
  //获取文章分类列表数据
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  indexAdd = null;
  $("#btnAddCate").on("click", function () {
    //调用layer.open弹窗功能添加文章
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //因为弹出框是点击之后才添加的，不能直接给表单绑定提交事件
  //只能使用代理方式绑定
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增分类失败！");
        }

        //根据索引关闭弹出层
        layer.close(indexAdd);
        //添加成功就重新渲染页面
        initArtCateList();
      },
    });
  });
  var indexEdit = null;
  //通过代理方式，为编辑按钮绑定事件
  $("tbody").on("click", "#btn-edit", function () {
    //弹出修改类别弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    //获取自定义id属性
    var id = $(this).attr("data-id");

    //发起ajax请求修改数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  //通过代理方式绑定更改文章类别的表单提交事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新分类失败！");
        }

        //根据索引关闭弹出层
        layer.close(indexEdit);
        //添加成功就重新渲染页面
        initArtCateList();
      },
    });
  }); // 通过代理的形式，为删除按钮绑定点击事件
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    // 提示用户是否要删除
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
