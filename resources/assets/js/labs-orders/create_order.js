import {URL_PREFIX} from "../common/params";

$(document).ready(function () {

    $('[data-form]').submit(function (event) {
        event.preventDefault();

        let formData = $(this).serialize();
        let success = $('[data-success]');

        if (!validateCheckboxes()) {
            return;
        }

        if (!validateSelectedPatients()) {
            return;
        }

        if (!validateRequiredFieldsPatients()) {
            return;
        }

        if (!validateSelectedDates()) {
            return;
        }

        loaderShow()

        $.ajax({
            headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
            type: 'POST',
            url: `${URL_PREFIX}/labs-orders/create`,
            data: formData,
            success: function (response) {

                if (response.status === 'error') {
                    alert(`${response.status} | ${response.message}`);
                    loaderHide()
                    return false
                }

                if (response.data.items) {
                    let items = response.data.items
                    let html = ''
                    $.each(items, function (index, item) {
                        html +=
                            `
                                <div class="labs-orders__item">
                                    <table class="labs-orders__table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Patient:</td>
                                            <td style="background: #ffffff">
                                                ${item.patient}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="labs-orders__table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Date:</td>
                                            <td>
                                                ${item.created_date}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="labs-orders__table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Type of Visit:</td>
                                            <td>
                                                ${item.type_code}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="labs-orders__table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Codes:</td>
                                            <td>
                                                ${item.codes}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="labs-orders__table table--small">
                                        <tbody>
                                        <tr>
                                            <td>Total:</td>
                                            <td style="background: #ffffff">
                                                $${item.total}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                `;
                    });
                    $('[data-success-result]').append(html);
                }
                loaderHide()
                $('[data-interface]').remove()
                $('[data-order-hidden]').remove()
                success.show()
            },
            error: function (e) {
                loaderHide()
                if (e.responseText) {
                    try {
                        const response = JSON.parse(e.responseText);
                        if (response?.message) {
                            const messages = response.message;
                            alert(`${e.status} | ${JSON.stringify(messages)}`);
                        } else {
                            alert(`${e.status} | ${JSON.stringify(e.responseText)}`);
                        }
                    } catch {
                        alert(`${e.status} | ${e.responseText}`);
                    }
                } else {
                    alert(`HTTP Error: ${e.status}`);
                }
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

function validateSelectedPatients() {
    let isValid = true;
    $('[data-order-items] [data-order-item]').each(function () {
        if (!$(this).find('[data-patient-input-hidden]').val()) {
            isValid = false;
            return false;
        }
    });
    if (!isValid) {
        alert('One or more orders do not have a patient selected');
    }
    return isValid;
}

function validateRequiredFieldsPatients() {
    let isValid = true;
    $('[data-order-items] [data-order-item]').each(function () {
        if (!$(this).find('[data-patient-error]').hasClass('hidden')) {
            isValid = false;
            return false;
        }
    });
    if (!isValid) {
        alert('One or more selected patients have no mandatory fields to create an order');
    }
    return isValid;
}

function validateSelectedDates() {
    let selected_items = []
    let isValid = true;
    $('[data-order-items] [data-order-item]').each(function () {
        let newItem = {
            patient_id: $(this).find('[data-patient-input-hidden]').val(),
            patient_name: $(this).find('[data-patient-input]').val(),
            date: $(this).find('[data-datepicker]').val(),
        }

        for (let i = 0; i < selected_items.length; i++) {
            if (selected_items[i].patient_id === newItem.patient_id && selected_items[i].date === newItem.date) {
                alert('Duplicate detected: ' + newItem.patient_name + ', ' + newItem.date);
                isValid = false;
                return false;
            }
        }

        if (isValid) {
            selected_items.push(newItem);
        }
    });
    return isValid;
}

function loaderShow() {
    $('[data-loader]').show()
}

function loaderHide() {
    $('[data-loader]').hide()
}