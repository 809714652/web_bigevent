$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }
    //为添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddbtn').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
        });

    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: {
                Id: parseInt(Math.random() * 100000),
                name: $('#form-add input[name=name]').val(),
                alias: $('#form-add input[name=alias]').val()
            },
            success: function(res) {
                // console.log($('#form-add input[name=alias]').val())
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！')
                console.log(res);
                layer.close(indexAdd)
                initArtCate()
            }
        })
    })
    var indexEdit = null
    $('body').on('click', '#btnEdit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分层数据失败！')
                }
                layer.msg('更新分类成功！')
                console.log(res);
                layer.close(indexEdit)
                initArtCate()
            }
        })
    })
    $('body').on('click', '#btnDelete', function(e) {
        var id = $(this).attr('data-id')
        console.log(id)

        layer.confirm('确认删除', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index);
                    initArtCate()
                }
            })
        });

    })
})