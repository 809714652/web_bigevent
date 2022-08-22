$(function() {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //1.清空本地存储的token
            localStorage.removeItem('token')
            location.href = 'login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res)
            if (res.status != 0) {
                return layui.layer.msg('获取信息失败！')
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {

        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;' + name + '&nbsp;&nbsp;')
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}