$(function () {
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
  $("#btnAddCate").on("click", function () {
    //调用layer.open弹窗功能
    layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: "配置各种参数，试试效果",
    });
  });
});
