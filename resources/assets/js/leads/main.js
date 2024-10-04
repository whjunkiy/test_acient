$(document).ready(function () {

    $(document).on('click', 'input.xls-report-button', function (event) {
        $('form#leads-details-filter').attr('action', $(this).data('action'));
        $('form#leads-details-filter').trigger('submit');
    });

    $(document).on('click', 'input.leads-details-button', function (event) {
        $('form#leads-details-filter').attr('action', $(this).data('action'));
        $('form#leads-details-filter').trigger('submit');
    });
});