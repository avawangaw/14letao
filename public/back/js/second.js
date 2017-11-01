/**
 * Created by Administrator on 2017-10-31.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (msg) {
        $("tbody").html(template("second_cate", msg));
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(msg.total / pageSize),
          onPageClicked: function (a, b, c, p) {
            currentPage = p;
            render();
          }
        });
      }
    });
  }
  
  
  //显示模态框
  $(".add_cate").on("click", function () {
    $("#addModal").modal("show");
    
  });
  
 // 渲染一级分类信息
  var firstPage = 1;
  var firstTotal = 100;
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: currentPage,
      pageSize: firstTotal
    },
    success: function (msg) {
      $(".first_infor").html(template("firstinfor", msg));
      //选择一级分类
      $(".first_infor").on("click","a", function () {
        $("#categoryId").val($(this).data("id"));
        $(".dropdown-text").text($(this).text());
      });
    }
  });
  
  //获取文件上传数据
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      // console.log(data);
      $("#display_img").attr("src", data.result.picAddr);
      $("#brandLogo").val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  
  
  
  // 添加二级分类
  //校验表单
  var $form = $("#form");
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
         notEmpty: {
           message: "请选择一级分类"
         }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {
    // console.log($form.serialize());
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $form.serialize(),
      success: function(msg) {
        // console.log(msg);
        if (msg.success) {
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
  
  
          //重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          console.log($(".dropdown-text"));
          $(".dropdown-text").text("请选择一级分类");
          $("#display_img").attr("src", "img/none.png");
          $("#brandLogo").val("");
          $("#categoryId").val("");
        }
      }
    });
  });
});