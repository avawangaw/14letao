/**
 * Created by Administrator on 2017-10-29.
 */
//检测用户有没有登录
if (location.href.indexOf("login.html") == -1) {
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function (msg) {
      if (msg.error === 400) {
        location.href = "login.html";
      }
    }
  });
}


//ajax启动到加载完成的进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 600);
});

$(function () {
  //分类显示与隐藏
  $(".tier").prev().on("click", function () {
    $(this).next().slideToggle();
  })
});

//左侧显示与隐藏
$(function () {
  $(".menu").click(function () {
    $(".lt_aside").toggleClass("now");
    $(".main_top").toggleClass("now");
  });
});

//显示退出登录模板
$(function () {
  $(".logout").on("click", function () {
    $('#logout').modal("show");
  });
});

//退出登录
$(function () {
  $(".logout_sure").on("click", function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (msg) {
        if (msg.success) {
          location.href = "login.html";
        }
      }
    });
  });
});