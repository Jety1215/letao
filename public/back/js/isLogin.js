// 一进入页面 发送ajax请求，获取当前用户登录状态
// 如果当前用户登录,让用户继续访问
// 如果当前用户没登录,将用户拦截登录页

$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
        if (info.error === 400) {
            location.href = "login.html"
        }

        if (info.success) {
            console.log("当前用户登录");

        }
    }
})