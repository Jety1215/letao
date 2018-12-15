$(function () {


    $('#form').bootstrapValidator({


        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })

})

// 注册表单校验成功事件，校验成功会触发
// 在实践中阻止默认提交（会跳转）通过ajax进行提交
$('#form').on("success.form.bv", function (e) {
    // 阻止默认提交
    e.preventDefault()
    // 通过ajax提交
    $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $('#form').serialize(), //表单序列化
        dataType: 'json',
        success: function (info) {
            if (info.success) {
                location.href = "index.html";
            }
            if (info.error === 1000) {
                $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
            }
            if (info.error === 1001) {
                $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
            }
        }
    })
})

// 3.表单重置功能
$('[type = "reset"]').click(function () {
    // 重置校验状态
    $('#form').data("bootstrapValidator").resetForm()
})