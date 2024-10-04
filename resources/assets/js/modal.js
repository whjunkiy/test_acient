$(document).ready(function () {
    $(document).on('click', '.modal-button-close', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.modal-wrapper').hide();
    })

    $(document).on('click', '.open-modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let modalId = $(this).data('modal-target');
        $(modalId).show()
    })

    $(document).on('click','.modal-wrapper', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).hide();
    })
    $(document).on('click','.modal-dialog', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
});