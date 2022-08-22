//注意每次掉get,post,ajax都先调用这个
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url)

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载
    options.complete = function(res) {
        var shenfen = res.responseJSON;
        if (shenfen.status === 1 && shenfen.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
                //2.跳转登录页面
            location.href = 'login.html'
        }
    }
})