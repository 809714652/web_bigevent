//注意每次掉get,post,ajax都先调用这个
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url)
})