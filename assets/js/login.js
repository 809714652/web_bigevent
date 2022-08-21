$(function() {
    //点击去注册账号的连接
    $('#link_reg').on("click", function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击去登录的连接
    $('#link_login').on("click", function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        'repwd': function(value) {
            var pwd = $('#form_reg [name = password]').val();
            if (pwd != value) {
                console.log(pwd, value)
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单界面
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var username = $('#form_reg [name = username]').val();
        var password = $('#form_reg [name = password]').val();
        $.post('/api/reguser', { username: username, password: password }, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return console.log(res.message)
            }
            layer.msg("注册成功");
            $('#link_login').click();
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        console.log(1);
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                    // console.log(res.token)
                localStorage.setItem('token', res.token);
                location.href = 'index.html'
            }
        })
    })
})