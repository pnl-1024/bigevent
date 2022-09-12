$(function () {
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };
  // 1.3 创建裁剪区域
  $image.cropper(options);
  //点击上传按钮触发文件选择事件
  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });
  //为文件上传绑定改变事件，替换头像
  $("#file").on("change", function (e) {
    //获取用户选择的文件 e.target.files就是文件路径
    // var filelist = e.target.files;
    // if (filelist.length == 0) {
    //   return console.log("请选择图片");
    // }
    var filelist = e.target.files;
    if (filelist.length === 0) {
      return layer.msg("请选择照片！");
    } //长度不为0就进行替换操作
    var file = e.target.files[0];
    var imgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  //为确定按钮绑定点击事件，将裁剪的图片设置为头像
  $("#btnUpload").on("click", function () {
    //获取用户裁剪的图片
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    //发起ajax请求更换头像
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        //获取数据就是图片
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更换头像失败");
        }
        //调用父页面的重新渲染头像函数
        window.parent.getUserInfo();
        layer.msg("更换头像成功");
      },
    });
  });
});
