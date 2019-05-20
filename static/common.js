$(function () {
    $('.modal_trigger').click(function () {
        $('#shadow').removeClass('hide');
        $('.modal').removeClass('hide');
    });
    $('#ajax_submit').click(function () {
        $.ajax({
            url:'/ajax1.html',  // 提交地址
            type:'POST',    // 提交方式
            data:{'name':$('#name').val(), 'password':$('#password').val()},    // 提交数据
            success:function (data) {   // data 是服务器端返回端数据
                if(data === 'OK'){
                    location.reload()
                }else{
                    alert(data)
                }
            }
        })
    })

});