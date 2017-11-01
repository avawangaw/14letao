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
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (msg) {
        $("tbody").html(template("goodslist", msg));
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
  
  $(".add_cate").on("click", function () {
    $("#addModal").modal("show");
  });
  
  // 渲染二级分类列表
  var secondPage = 1;
  var secondTotal = 100;
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: secondPage,
      pageSize: secondTotal
    },
    success: function (msg) {
      // console.log(msg);
      $(".second_infor").html(template("secondinfor", msg));
      $(".second_infor").on("click", "a", function () {
        $(".dropdown-text").text($(this).text());
        $("#brandId").val($(this).data("id"));
    
        //改成通过状态
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
      });
    }
  });

  
  
  //图片上传
  var arrPic = [];
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      $(".add_img").append('<img src="' + data.result.picAddr + '" style="width:100px;height:100px">')
      arrPic.push(data.result);
      if (arrPic.length == 3) {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      } else {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  });
  
 // 校验表单
  var $form = $("#form");
  
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "商品名不能为空"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp:{
            //必须是0以上的数字
            regexp:/^[1-9]\d*$/,
            message:"请输入一个大于0的库存"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的折扣价"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          regexp:{
            //33-55
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码（30-50）"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      },
    }
  });
  
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    var sendDatas =  $form.serialize();
    sendDatas += "&picName1=" + arrPic[0].picName + "&picAddr1=" + arrPic[0].picAddr;
    sendDatas += "&picName2=" + arrPic[0].picName + "&picAddr2=" + arrPic[0].picAddr;
    sendDatas += "&picName3=" + arrPic[0].picName + "&picAddr3=" + arrPic[0].picAddr;
    $.ajax({
      type: "post",
      url: "/product/updateProduct",
      data: sendDatas,
      success: function (msg) {
        // console.log(msg);
        if (msg.success) {
          //关闭模态框
          $("#addModal").modal("hide");
          //重新渲染数据
          currentPage = 1;
          render();
          //  重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          $(".dropdown-text").text("请选择二级分类");
          $(".add_img img").remove();
          arrPic = [];
          $("#brandId").val("");
        }
      }
    });
  })
});