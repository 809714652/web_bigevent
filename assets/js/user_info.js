$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        'nickname': function(value) {
            if (value.length > 6) {
                console.log(111)
                return '昵称长度必须在1-6之间'
            }
        }
    })
    initUserInfo()


    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')

                }
                //调用form.val()
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新用户失败')
                }
                layer.msg('更新用户信息成果')
                    //父页面的方法
                window.parent.getUserInfo();
            }
        })
    })
})