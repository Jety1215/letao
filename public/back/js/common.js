// 测试进度条方法
// NProgress.start() //开启进度条
// setTimeout(function(){
//     NProgress.done()
// },2000)


// 需求 在第一个ajax发送时候 开启进度条
// 在其全部ajax回来时候，关闭进度条

// ajax全局事件
// .ajaxComplete() 当每个ajax完成时调用
// .ajaxSuccess() 当ajax返回成功时调用
// .ajaxError()     当ajax返回失败时调用
// .ajaxSend()      当ajax发送前调用
// .ajaxStart()     当第一个ajax发送时调用
// .ajaxStop()      当全部的ajax请求完成时调用

$(document).ajaxStart(function () {
    NProgress.start()
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done()
    }, 500)
})