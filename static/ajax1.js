$(function () {
    // for edit_content and submit
    function edit(self, option) {

        if (option === 'write to modal') {
            var id = self.parent().parent().attr('u_id');
            $('#u_id').val(id);
            num_l = self.parent().prevAll().last();
            name_l = num_l.next();
            age_l = num_l.next().next();
            gender_l = num_l.next().next().next();
            school_l = num_l.next().next().next().next();
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

    function hide(modal_class) {
        $('#shadow').addClass('hide');
        modal_class.addClass('hide');
        // $('.m').addClass('hide');
    }

    function clear_input() {
        $(':text').val('');
        $('select').val('');
    }

    // 点击展示modals
    $('.modal_trigger').click(function () {
        $('#shadow').removeClass('hide');
        $('.modal').removeClass('hide');
    });
    // 点击展示del_modals
    $('.del_modal_trigger').click(function () {
        $('#shadow').removeClass('hide');
        $('.del_modal').removeClass('hide');
    });
    // edit_content 自动填充表单，添加提交类型
    $('.edit_content').click(function () {
        edit($(this), 'write to modal');
        $('#submit_method').val('edit');
    });
    // add_content 添加提交类型
    $('.add_content').click(function () {
        $('#submit_method').val('add');
        console.log()
    });
    // dal_content 添加id
    $('.del_content').click(function () {
        var u_id = $(this).parent().parent().attr('u_id');
        $('#del_id').val(u_id);
    });
    // submit
    $('#ajax_submit').click(function () {
        $.ajax({
            url: '/ajax1.html',  // 提交地址
            type: 'POST',    // 提交方式
            data: {
                'id': $('#u_id').val(),
                'name': $('#name').val(),
                'age': $('#age').val(),
                'gender': $('#gender').val(),
                'school': $('#school').val(),
                'method': $('#submit_method').val()
            },    // 提交数据
            success: function (data) {   // data 是服务器端返回端数据
                if (data === 'Done') {
                    console.log('Done');
                    if ($('#submit_method').val() === 'edit') {
                        edit($(this), 'write to table');
                        hide($('.modal'));
                    } else if ($('#submit_method').val() === 'add') {
                        // 无法解决通过循环获取表单数据，只能一项一项单独获取，先通过刷新界面解决
                        // var new_tr = document.createElement("tr");
                        // var new_td = document.createElement("td");
                        // new_td.textContent = '1';
                        // new_tr.appendChild(new_td);
                        // $('tbody').append(new_tr);
                        location.reload()
                    }

                } else {
                    alert(data)
                }
            }
        })
    });
    // del_submit
    $('#del_submit').click(function () {
        $.ajax({
            url: '/ajax1.html',  // 提交地址
            type: 'POST',    // 提交方式
            data: {
                'id': $('#del_id').val(),
                'method': 'del'
            },    // 提交数据
            success: function (data) {   // data 是服务器端返回端数据
                if (data === 'Done') {
                    console.log('Done');
                    var uid = $('#del_id').val();
                    $('[u_id = "' + uid + '"]').addClass('hide');
                    hide($('.del_modal'))
                } else {
                    alert(data)
                }
            }
        })
    });
    // cancel in modal
    $('.modal_hider').click(function () {
        hide($('.modal'));
        clear_input();
    });
    // cancel in del_modal
    $('.del_modal_hider').click(function () {
        hide($('.del_modal'));
    });

});