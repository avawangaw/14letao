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
        //  禁用用户
        $("tbody").on("click", ".btn", function () {
          var id = $(this).parent().data("id");
          var isDelete = $(this).parent().data("isdelete");
          isDelete = isDelete == 1 ? 0 : 1;
          //弹出模态框
          $("#fd_st").modal("show");
          $(".comfirm").off().on("click", function () {
            $.ajax({
              type: "post",
              url: "/user/updateUser",
              data: {
                id: id,
                isDelete: isDelete
              },
              success: function (msg) {
                $("#fd_st").modal("hide");
                if (msg.success) {
                  rend();
                }
              }
            });
          })
        })
      }
    });
  }
  

});