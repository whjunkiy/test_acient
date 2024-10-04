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
                    for (let key in data.option) {
                        $('#' + key).val((data.option[key]));
                    }
                }
            }
        });
    })

    $(document).on('click', '.save-code-modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let modalId = $('#shippingOptionsModalForm');
        let shipping_option = $('#shipping_option').val();
        let price = $('#price').val();
        let default_pharmacy = $('#default_pharmacy').val();
        let cold_shipping = $('#cold_shipping').val();
        if ((shipping_option && price && default_pharmacy) || true) {
            let act = $("#shippingOptionForm").attr('action');
            $.ajax({
                headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
                method: 'post',
                data: {
                    shipping_option: shipping_option,
                    price: price,
                    default_pharmacy: default_pharmacy,
                    cold_shipping: cold_shipping,
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
                    $('#shipping_option').val('');
                    $('#price').val('');
                    $('#default_pharmacy').val('');
                    $('#cold_shipping').val('0');
                    $("#id").val('');
                },
                error: function (error) {
                    for (key in error.responseJSON) {
                        $('#' + key).next('.err-message').text(error.responseJSON[key])
                    }
                }
            });
        } else {
            $('#shipping_option').addClass('error');
            $('#price').addClass('error');
            $('#default_pharmacy').addClass('error');
        }
    });

    $(document).on('click', '#del-button', function (e) {
        let id = $(this).data('id');
        $.ajax({
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
            method: 'post',
            data: {
                id: id,
            },
            url: $("#shipping-option-delete-url").val(),
            cache: false,
            success: function (data) {
                $.ajax({
                    method: 'options',
                    url: $("#shippingOptionForm").attr('action') + '/',
                    async: true,
                    dataType: 'json',
                    success: function (data) {
                        if(data.success){
                            $('#cbResults').html(data.html);
                        }
                    }
                })
            },
            error: function (error) {
                console.log('ERROR!');
                console.log(error);
            }
        });
    });

    $(document).on('click', '#res-button', function (e) {
        let id = $(this).data('id');
        $.ajax({
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
            method: 'post',
            data: {
                id: id,
            },
            url: $("#shipping-option-restore-url").val(),
            cache: false,
            success: function (data) {
                $.ajax({
                    method: 'options',
                    url: $("#shippingOptionForm").attr('action') + '/',
                    async: true,
                    dataType: 'json',
                    success: function (data) {
                        if(data.success){
                            $('#cbResults').html(data.html);
                        }
                    }
                })
            },
            error: function (error) {
                console.log('ERROR!');
                console.log(error);
            }
        });
    });

    $(document).on('click', '#open-icdcode-modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#shipping_option').val('');
        $('#price').val('');
        $('#default_pharmacy').val('');
        $('#cold_shipping').val('0');
        $("#id").val('');
    })
})