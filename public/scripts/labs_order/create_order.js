$(document).ready(function () {
    $('[data-form]').submit(function (event) {
        event.preventDefault();

        let formData = $(this).serialize();
        let success = $('[data-success]');

        if (!validateCheckboxes()) {
            return;
        }

        loaderShow()

        $.ajax({
            type: 'POST',
            url: '/ajax/labs_order/create_labs_order.php',
            data: formData,
            success: function (response) {
                if (response.order_data && response.order_data['items']?.length) {
                    let items = response.order_data['items']
                    let comment = response.order_data['comment']
                    let html = ''
                    $.each(items, function (index, item) {
                        html +=
                            `
                                <div class="rbs-labs_orders-item">
                                    <table class="rbs-labs_orders-table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Date:</td>
                                            <td>
                                                ${item.date}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="rbs-labs_orders-table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Type of Visit:</td>
                                            <td>
                                                ${item.type}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="rbs-labs_orders-table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Codes:</td>
                                            <td>
                                                ${item.codes}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                `;
                    });
                    if (comment) {
                        html +=
                            `
                            <div style="margin-top: 15px; text-align: center;">
                                Order Comment: <strong>${comment}</strong>
                            </div>
                            `
                    }
                    $('[data-success-result]').append(html);
                }
                loaderHide()
                $('[data-interface]').remove()
                $('[data-order-hidden]').remove()
                success.show()
            },
            error: function (e) {
                loaderHide()
                e.responseText
                    ? alert(`${e.status} | ${e.responseText}`)
                    : alert(`HTTP Error: ${e.status}`)
            }
        });
    });
});

function validateCheckboxes() {
    let isValid = true;
    $('[data-order-items] [data-order-item]').each(function () {
        if (!$(this).find('input[type="checkbox"]').is(':checked')) {
            isValid = false;
            return false;
        }
    });
    if (!isValid) {
        alert('There must be at least one marked analysis in each block');
    }
    return isValid;
}

function loaderShow() {
    $('[data-loader]').show()
}

function loaderHide() {
    $('[data-loader]').hide()
}