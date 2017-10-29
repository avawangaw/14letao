/**
 * Created by Administrator on 2017-10-29.
 */
//ajax启动到加载完成的进度条
// $(document).ajaxStart(function () {
//   NProgress.start();
// });
// $(document).ajaxStop(function () {
//   setTimeout(function () {
//     NProgress.done();
//   }, 600);
// });

$(document).ajaxStart(function () {
  //让进度条显示出来
  NProgress.start();
})


$(document).ajaxStop(function () {
  setTimeout(function () {
    //让进度条结束
    NProgress.done();
  }, 500);
});