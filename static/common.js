$(function () {
    // for edit_content and submit
    function edit(self, option) {

        if (option === 'write to modal') {
            var id = self.parent().parent().attr('u_id');
            $('#u_id').val(id);
            var num_l = self.parent().prevAll().last();
            var name_l = num_l.next();
            var age_l = num_l.next().next();
            var gender_l = num_l.next().next().next();
            var school_l = num_l.next().next().next().next();
            var name = name_l.text();
            var age = age_l.text();
            var gender = gender_l.text();
            var school = school_l.text();
            $('#name').val(name);
            $('#age').val(age);
            $('#gender').val(gender);
            $('#school').val(school);
        } else if (option === 'write to table') {
            var name_n = $('#name').val();
            var age_n = $('#age').val();
            var gender_n = $('#gender').val();
            var school_n = $('#school').val();
            name_l.text(name_n);
            age_l.text(age_n);
            gender_l.text(gender_n);
            school_l.text(school_n);
        }
    }

    // 点击展示modals
    $('.modal_trigger').click(function () {
        $('#shadow').removeClass('hide');
        $('.modal').removeClass('hide');
    });
    // edit_content 自动填充表单，添加提交类型
    $('.edit_content').click(function () {
        edit($(this), 'write to modal');
        $('#submit_method').val('edit');
    });
    // add_content 添加提交类型
    $('.edit_add').click(function () {
        $('#submit_method').val('add');
        console.log()
    });
    // submit
    $('#ajax_submit').click(function () {
        $.ajax({
            url:'/ajax1.html',  // 提交地址
            type:'POST',    // 提交方式
            data: {
                'id': $('#u_id').val(),
                'name': $('#name').val(),
                'age': $('#age').val(),
                'gender': $('#gender').val(),
                'school': $('#school').val(),
                'method': $('#submit_method').val()
            },    // 提交数据
            success:function (data) {   // data 是服务器端返回端数据
                if (data === 'Done') {
                    console.log('Done');
                    if ($('#submit_method').val() === 'edit') {
                        console.log('Edit');
                        edit($(this), 'write to table')
                    } else if ($('#submit_method').val() === 'add') {

                    }
                    // location.reload()
                }else{
                    alert(data)
                }
            }
        })
    });
    // cancel
    $('.modal_hider').click(function () {
        $('#shadow').addClass('hide');
        $('.modal').addClass('hide');
        $(':text').val('');
        $('select').val('');

    })

});