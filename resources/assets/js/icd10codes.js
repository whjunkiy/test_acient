$(document).ready(function () {
    $(document).on('click', 'a.edit-code', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let href = $(this).attr('href');
        console.log(href)
        $.ajax({
            method: 'options',
            url: href,
            async: true,
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    $('#open-icdcode-modal').trigger('click');
                    for (let key in data.code) {
                        $('#' + key).val((data.code[key]));
                    }
                }
            }
        });
    })

    $(document).on('click', '.save-code-modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let modalId = $('#icd10CodeModalForm');
        let code = $('#com_dx_code').val();
        let name = $('#com_dx_name').val();
        if ((name && code) || true) {
            let act = $("#icdCodeForm").attr('action');
            $.ajax({
                headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
                method: 'post',
                data: {
                    com_dx_code: code,
                    com_dx_name: name,
                    com_dx_code_old: $('#com_dx_code_old').val(),
                    com_dx_name_old: $('#com_dx_name_old').val(),
                },
                url: act + '/' + $("#id").val(),
                cache: false,
                success: function (data) {
                    $.ajax({
                        method: 'options',
                        url: act + '/',
                        async: true,
                        dataType: 'json',
                        success: function (data) {
                            if(data.success){
                                $('#cbResults').html(data.html);
                            }
                        }
                    })
                    $('.modal-button-close', modalId).trigger('click');
                    let form = $('#icdCodeForm');
                    $(form).find('input[type=text]').each((i,item)=>{
                        $(item).val('');
                    })

                },
                error: function (error) {
                    for (key in error.responseJSON) {
                        $('#' + key).next('.err-message').text(error.responseJSON[key])
                    }
                }
            });
        } else {
            $('#com_dx_code').addClass('error');
            $('#com_dx_name').addClass('error');
        }
    });
    $(document).on('click', '#open-icdcode-modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#com_dx_code').val('')
        $('#com_dx_name').val('')
        $('#com_dx_code_old').val('')
        $('#com_dx_name_old').val('')
        $("#id").val('')
    })
})