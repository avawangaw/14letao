/**
 * Created by Administrator on 2017-10-30.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  rend();
  function rend() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (msg) {
        console.log(msg);
        console.log(typeof msg.rows);
        var html = template("data", msg);
        document.querySelector("tbody").innerHTML = html;
      
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages: Math.ceil(msg.total/pageSize),
          size:"small",
          onPageClicked:function(event, originalEvent, type,page){
            currentPage = page;
            rend();
          }
        });
      }
    });
  }
});