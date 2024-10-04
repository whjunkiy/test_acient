$(document).ready(function () {
    function setPage(page, table) {
        let rowset = $(table).find('tbody>tr'),
            per_page = $(table).data('perPages') ?? 10,
            pages = Math.ceil(rowset.length / per_page);

        rowset.slice(0, page * per_page).hide();
        rowset.slice(page * per_page - per_page, page * per_page).show();
        rowset.slice(page * per_page).hide();
        $('.page-footer>div').html('Page ' + page + ' of ' + pages);
        $(table).data('page', page);
    }

    $('table.data').each(function (i) {
        let rows = $(this).find('tbody>tr').length,
            per_page = $(this).data('perPages') ?? 10;
        $(this).data('pages', Math.ceil(rows / per_page));
        setPage(1, this);
    });

    //Next Button
    $('.next').click(function () {
        let table = $('table.data').last(),
            page = $(table).data('page'),
            pages = $(table).data('pages');
        if (page < pages) {
            page++
            setPage(page, table);
        }
    });


    //Previous Button
    $('.prev').click(function () {
        let table = $('table.data').last(),
            page = $(table).data('page');

        if (page > 1) {
            page--
            setPage(page, table);
        }
    });

});