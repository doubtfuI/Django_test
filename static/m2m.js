$(function () {
    // for edit_content and submit
    function edit(self, option) {

        if (option === 'write to modal') {
            var id = self.parent().parent().attr('c_id');
            $('#c_id').val(id);
            name_l = self.parent().prevAll().last();
            stu_l = name_l.next();
            var name = name_l.text();
            var stu_list = [];
            var all_stu = stu_l.children();
            for (var item = 0; item < all_stu.length; item++) {
                var temp = all_stu[item];
                stu_list.push($(temp).text());
            }
            $('#course').val(name);
            $('#student').val(stu_list);
        } else if (option === 'write to table') {
            var name_n = $('#course').val();
            var stu_n = $('#student').val();
            name_l.text(name_n);
            stu_l.text('');
            for (var i = 0; i < stu_n.length; i++) {
                var span = document.createElement("span");
                $(span).text(stu_n[i]);
                $(stu_l).append(span)
            }
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
        var c_id = $(this).parent().parent().attr('c_id');
        $('#del_id').val(c_id);
    });
    // submit
    $('#ajax_submit').click(function () {
        console.log($('#student').val());
        $.ajax({
            url: '/m2m.html',  // 提交地址
            type: 'POST',    // 提交方式
            data: {
                'c_id': $('#c_id').val(),
                'student': $('#student').val(),
                'course': $('#course').val(),
                'method': $('#submit_method').val()
            },    // 提交数据
            traditional: true,  // 支持提交列表
            // dataType: 'JSON',
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
            url: '/m2m.html',  // 提交地址
            type: 'POST',    // 提交方式
            data: {
                'c_id': $('#del_id').val(),
                'method': 'del'
            },    // 提交数据
            success: function (data) {   // data 是服务器端返回端数据
                if (data === 'Done') {
                    console.log('Done');
                    var cid = $('#del_id').val();
                    $('[c_id = "' + cid + '"]').addClass('hide');
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