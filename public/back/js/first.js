/**
 * Created by Administrator on 2017-10-31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 2;
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    success: function (msg) {
      console.log(msg);
      $("tbody").html(template("first_cate", msg));
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: currentPage,
        totalPages: Math.ceil(msg.total / pageSize)
      });
    }
  });
});