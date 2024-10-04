require('./common/tinymce');

$(document).ready(function () {
    //Set Page
    function setPage(page, table) {
        let rowset = $(table).find('tbody>tr'),
            per_page = $(table).data('per-page') || 7,
            pages = Math.ceil(rowset.length / per_page);

        rowset.slice(0, page * per_page).hide();
        rowset.slice(page * per_page - per_page, page * per_page).show();
        rowset.slice(page * per_page).hide();
        $(table).find('.footer>div').html('Page ' + page + ' of ' + pages);
        $(table).data('page', page);
    }

    $('table.data').each(function (i) {
        let rows = $(this).find('tbody>tr').length,
            per_page = $(this).data('per-page') || 7;
        $(this).data('pages', Math.ceil(rows / per_page));
        setPage(1, this);
    });

    //Next Button
    $('.next').click(function () {
        let table = $(this).parents('table.data').last(),
            page = $(table).data('page'),
            pages = $(table).data('pages');
        if (page < pages) {
            page++
            setPage(page, table);
        }
    });


    //Previous Button
    $('.prev').click(function () {
        let table = $(this).parents('table.data').last(),
            page = $(table).data('page');

        if (page > 1) {
            page--
            setPage(page, table);
        }
    });

    $('.rclose').on('click', function () {

        if($(this).data('master')){
            var smaster = $(this).data('master');
            $('*[data-master="' + smaster + '"]').prop('checked', true);
        }
        var cid = $(this).attr('id');
        cid = cid.substring(1);
        $('#' + cid).prop('checked', true);

        $("#uncheck_paid").hide();
        $('#check_window').hide();

    });

    $('.pclose').on('click', function () {

        var cid = $(this).attr('id');
        cid = cid.substring(1);

        if($(this).data('master')){
            var smaster = $(this).data('master');
            $('*[data-master="' + smaster + '"]').prop('checked', false);
        }
        $('#' + cid).prop('checked', false);
        $("#check_paid").hide();
        $('#check_window').hide();

    });

    $('input[name="sendemail"]').click(function () {
        $('#order_msginfo').show();
    });


    $('input[name="sendemail_all"]').click(function () {
        $('#order_msginfo').show();
        jQuery.ajax({
            type: "POST",
            url: "/ajax/orders_sending_update.php",
            data: "t=1",
            beforeSend: function (html) {
            }
        });
    });

    $("#iselchecks").click(function () {
        $("#ila").prop('checked', false);
        $("#inormal").prop('checked', false);

        $("#iny").prop('checked', false);
        $("#inormal_ny").prop('checked', false);

        $(".allord").prop('checked', $(this).prop('checked'));
        $("#if_la").val('normal');
    });

    $("#ila").click(function () {
        $(".allord").prop('checked', false);
        $("#iselchecks").prop('checked', false);
        $("#inormal").prop('checked', false);
        $("#inormal_ny").prop('checked', false);
        $(".CA .allord").prop('checked', $(this).prop('checked'));
        $("#if_la").val('la');
    });

    $("#inormal").click(function () {
        $(".allord").prop('checked', false);
        $("#iselchecks").prop('checked', false);
        $("#ila").prop('checked', false);
        $("#iny").prop('checked', false);
        $(".allord").not(".CA .allord").prop('checked', $(this).prop('checked'));
        $("#if_la").val('normal');
    });


    $("#iny").click(function () {
        $(".allord").prop('checked', false);
        $("#iselchecks").prop('checked', false);
        $("#inormal").prop('checked', false);
        $("#inormal_ny").prop('checked', false);
        $(".MARSHALL .allord").prop('checked', $(this).prop('checked'));

    });

    $("#inormal_ny").click(function () {
        $(".allord").prop('checked', false);
        $("#iselchecks").prop('checked', false);
        $("#iny").prop('checked', false);
        $("#ila").prop('checked', false);
        $(".allord").not(".MARSHALL .allord").prop('checked', $(this).prop('checked'));
    });
});