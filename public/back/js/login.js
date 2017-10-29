/**
 * Created by Administrator on 2017-10-29.
 */
$(function() {
  //验证用户名和密码
  var $form = $("#login");
  $form.bootstrapValidator({
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    fields: {/*验证：规则*/
      username: {
        validators: {
          notEmpty: {
            message : "用户名不能为空"
          },
          callback: {
            message: "用户名错误"
          }
        },
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    },
  });
  
  var validator = $form.data('bootstrapValidator');
  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      success: function (msg) {
        if (msg.success) {
          // location.href = "index.html";
        } else {
          if (msg.error === 1000) {
            validator.updateStatus("username", "INVALID", "callback");
          }
          if (msg.error === 1001) {
            validator.updateStatus("password", "INVALID", "callback");
          }
        }
      }
    });
  });
  
  $("button[type='reset']").on("click", function () {
    // alert(12);
    validator.resetForm();
  });
});
