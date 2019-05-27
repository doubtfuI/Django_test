$(function () {
    $('#a_submit1').click(function () {
        $.ajax({
            url: '/csrf.html',
            type: 'POST',
            data: {'username': $('#a_username1').val()},
            headers: {'X-CSRFtoken': $.cookie('csrftoken')},
            success: function (data) {
                console.log('Done');
                alert(data)
            }
        })
    });
});

$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('X-CSRFtoken', $.cookie('csrftoken'))
        }
    });
    $('#a_submit2').click(function () {
        $.ajax({
            url: '/csrf.html',
            type: 'POST',
            data: {'username': $('#a_username2').val()},
            success: function (data) {
                console.log('Done');
                alert(data)
            }
        })
    });
});