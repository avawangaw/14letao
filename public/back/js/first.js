/**
 * Created by Administrator on 2017-10-31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  rend();
  function rend() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (msg) {
        $("tbody").html(template("first_cate", msg));
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(msg.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            rend();
          }
        });
      }
    });
  }
  
  //显示添加模态框
  $(".add_btn").on("click", function () {
    $("#addModal").modal("show");
    //添加分类
    var $form = $("#form");
    //校验表单
    $form.bootstrapValidator({
      feedbackIcons: {/*input状态样式图片*/
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        cateName: {
          validators: {
            notEmpty: {
              message: "请输入一级分类名称"
            }
          }
        }
      }
    });
  
    // 校验成功后发送ajax请求
    $form.on("success.form.bv", function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: $form.serialize(),       //$form.serialize()能够获取到$form表单中的值
        success: function (msg) {
          if (msg.success) {
            $("#addModal").modal("hide");
            rend();
            
          //  重置表单
            $form.data("bootstrapValidator").resetForm();     //返回一个对象
            $form[0].reset();
          }
        }
      });
    });
  });
  
});

