import {URL_PREFIX} from "../common/params";

$(document).ready(function () {

    let orderItemHidden = $('[data-order-hidden]')

    let addBtn = $('[data-add]')
    let countSections = 1
    let sectionsLimit = 3

    initDatepickers()
    updateViewDeleteButtons()

    $('#autocomplete').autocomplete({
        serviceUrl: '/autocomplete/countries',
        onSelect: function (suggestion) {
            alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });

    addBtn.click(function (e) {
        e.preventDefault()
        let clonedOrderItem = indexSubstitutionOrderItems(orderItemHidden.clone(), countSections)
        if (countSections < sectionsLimit) {
            clonedOrderItem.removeAttr('data-order-hidden')
            clonedOrderItem.attr('data-order-show', '')
            $('[data-order-items]').append(clonedOrderItem)
            initDatepickers()
            updateViewDeleteButtons()
            countSections++
        }
        updateViewAddButton()
    })

    let timeout = null;

    $(document).on('input', 'input[data-patient-input]', function () {
        let el = $(this);
        let parent = el.closest('[data-order-item]')
        let results = parent.find('[data-search-patients-results]')
        let patient_id = parent.find('[data-patient-input-hidden]')
        let patient_details = parent.find('[data-patient-details]')
        let patient_wrapper = parent.find('[data-patient-wrapper]')

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            $.ajax({
                headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
                type: 'GET',
                url: `${URL_PREFIX}/patients/search`,
                data: 'keyword=' + $(el).val(),
                beforeSend: function () {
                    $(results).empty();
                    $(results).empty();
                    $(el).addClass('loading')
                    $(patient_wrapper).addClass('loading')
                    $(el).blur();
                },
                success: function (data) {
                    if (!data.length) {
                        $(results).append('<div class="labs-orders__search-result">not results</div>');
                        $(el).val('')
                        $(patient_id).val('');
                        $(patient_details).empty();
                        $(patient_wrapper).addClass('hidden')
                    } else {
                        data.forEach(function (item) {
                            let listItem = $('<div class="labs-orders__search-result">').text(getPatientName(item.patient_firstname, item.patient_lastname))
                                .attr('data-patient-id', item.patient_id)
                                .attr('data-patient-firstname', item.patient_firstname)
                                .attr('data-patient-lastname', item.patient_lastname)
                                .attr('data-patient-dob', item.patient_dob)
                                .attr('data-patient-mrn', item.patient_mrn)
                                .attr('data-patient-location', item.patient_location)
                                .attr('data-patient-gender', item.patient_gender)
                                .attr('data-patient-physician-npi', item.physician_npi)
                                .attr('data-patient-physician-name', item.physician_name)
                            listItem.on('click', function () {
                                appendDetailsPatient($(this))
                                $(el).val(getPatientName($(this).attr('data-patient-firstname'), $(this).attr('data-patient-lastname')));
                                $(patient_id).val($(this).attr('data-patient-id'));
                                $(results).hide();
                            });
                            $(results).append(listItem);
                        });
                    }
                    $(el).removeClass('loading')
                    $(patient_wrapper).removeClass('loading')
                    $(results).show();
                }
            });
        }, 1000);
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('[data-search-patients-results]').length &&
            !$(event.target).closest('input[data-patient-input]').length) {
            $('[data-search-patients-results]').hide();
        }
    });

    $(document).on('focus', 'input[data-patient-input]', function () {
        let el = $(this);
        let parent = el.closest('[data-search-patients-section]')
        let results = parent.find('[data-search-patients-results]')
        results.show()
    });


    $(document).on('click', '[data-order-delete]', function () {
        let el = $(this)
        let parent = el.closest('[data-order-item]')
        let selectedDateValue = parent.find('[data-datepicker]').val()
        parent.remove()
        countSections--
        updateViewDeleteButtons()
        updateViewAddButton()
    });

    $(document).on('click', '[data-patient-delete]', function () {
        let el = $(this)
        let parent = el.closest('[data-order-item]')
        parent.find('[data-patient-wrapper]').addClass('hidden')
        parent.find('[data-patient-error]').addClass('hidden')
        parent.find('[data-patient-details]').empty()
        parent.find('[data-search-patients-results]').empty()
        parent.find('[data-patient-input-hidden]').val('')
        parent.find('[data-patient-input]').val('')
    });

    $(document).on('focus', 'input[data-datepicker]', function () {
        $(this).data('old-date', this.value);
    });

    $(document).on('change', 'input[data-checkbox="group"]', function () {
        let el = $(this)
        let parent = el.closest('[data-order-item]')
        let codeValue = el.val()

        let individualCodesCheckboxes = parent.find('input[data-checkbox="individual"]')

        el.prop('checked')
            ? disableIndividualCodes(individualCodesCheckboxes, codeValue)
            : enableIndividualCodes(individualCodesCheckboxes, codeValue)
    });

    $(document).on('change', 'input[type=checkbox]', function (e) {
        calculateTotalAmountOnlyOrder(this)
    });
    $(document).on('change', 'select', function (e) {
        calculateTotalAmountOnlyOrder(this)
    });

    function indexSubstitutionOrderItems(item, count) {

        let nameByDate = `order_items[${count}][date]`
        let nameBySelect = `order_items[${count}][type]`
        let nameByCheckbox = `order_items[${count}][codes][]`
        let nameByComment = `order_items[${count}][comment]`
        let nameByAmount = `order_items[${count}][amount]`
        let nameByPatient = `order_items[${count}][patient]`

        let dateSection = item.find('[data-datepicker]')
        let selectSection = item.find('[data-select]')
        let checkboxSections = item.find('[data-checkbox]')
        let commentSection = item.find('[data-comment]')
        let amountSection = item.find('[data-hidden-amount]')
        let patientSection = item.find('[data-patient-input-hidden]')

        dateSection.attr('name', nameByDate)
        dateSection.attr('data-datepicker', count)
        dateSection.attr('id', `datepicker_${count}`)

        selectSection.attr('name', nameBySelect)
        checkboxSections.attr('name', nameByCheckbox)
        commentSection.attr('name', nameByComment)
        amountSection.attr('name', nameByAmount)
        patientSection.attr('name', nameByPatient)

        return item
    }

    function initDatepickers() {
        let orderItems = $('[data-order-items]').find('[data-order-item]')
        orderItems.each(function () {
            let datepickerItem = $(this).find('[data-datepicker]')

            let currentDate = new Date();
            let day = String(currentDate.getDate()).padStart(2, '0');
            let month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            let year = currentDate.getFullYear();

            let newDate = month + '/' + day + '/' + year;
            datepickerItem.val(newDate)

            let index = datepickerItem.attr('data-datepicker')
            $(`#datepicker_${index}`).datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                minDate: 0
            });
        })
    }

    function generateNextDate(string) {
        let parts = string.split('/');
        let date = new Date(parts[2], parts[0] - 1, parts[1]);
        date.setDate(date.getDate() + 1);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
    }

    function updateViewDeleteButtons() {
        let countItems = $('[data-order-items] [data-order-item]').length
        countItems > 1
            ? showDeleteBtns()
            : hideDeleteBtns()
    }

    function updateViewAddButton() {
        let countItems = $('[data-order-items] [data-order-item]').length
        countItems < sectionsLimit
            ? showAddBtn()
            : hideAddBtn()
    }

    function disableIndividualCodes(items, code) {
        items.each(function () {
            let el = $(this)
            let codeScopes = el.attr('data-scopes')
            if (codeScopes.includes(code)) {
                el.prop('disabled', true);
                if (el.prop('checked')) {
                    el.prop('checked', false);
                }
            }
        })
    }

    function enableIndividualCodes(items, code) {
        let groupCheckedCheckboxes = $('input[data-checkbox="group"]:checked')
        let values = groupCheckedCheckboxes.map(function () {
            return this.value;
        }).get();

        items.each(function () {
            let el = $(this)
            let codeScopes = el.attr('data-scopes')

            let exists = values.some(v => codeScopes.includes(v));

            if (codeScopes.includes(code) && !exists) {
                el.prop('disabled', false);
            }
        })
    }

    function hideDeleteBtns() {
        $('[data-order-delete]').hide()
    }

    function showDeleteBtns() {
        $('[data-order-delete]').show()
    }

    function hideAddBtn() {
        $('[data-add]').hide()
    }

    function showAddBtn() {
        $('[data-add]').show()
    }

    function calculateTotalAmountOnlyOrder(target) {
        let el = $(target)
        let parent = el.closest('[data-order-item]')
        let checkboxes = parent.find('[data-checkbox]')
        let select = parent.find('[data-select]')
        let amount = parent.find('[data-order-amount]')

        let total = 0

        checkboxes.each(function () {
            if ($(this).is(':checked')) {
                total += +($(this).data('price'));
            }
        });
        select.each(function () {
            let selectedOption = $(this).find('option:selected');
            total += +(selectedOption.data('price'));
        });

        amount.text(total)
    }

    function appendDetailsPatient(target) {
        let parent = $(target).closest('[data-order-item]')
        let patient_details = parent.find('[data-patient-details]')
        let patient_wrapper = parent.find('[data-patient-wrapper]')
        let patient_error = parent.find('[data-patient-error]')

        patient_details.empty()
        patient_error.empty()
        patient_error.addClass('hidden')

        let attributes = ['data-patient-location', 'data-patient-id', 'data-patient-firstname', 'data-patient-lastname', 'data-patient-dob', 'data-patient-gender', 'data-patient-physician-name', 'data-patient-physician-npi'];
        let labels = ['Location', 'MRN', 'First Name', 'Last Name', 'DOB', 'Gender', 'Physician Name', 'Physician NPI'];

        let errorFields = [];

        attributes.forEach((attribute, i) => {
            let value = target.attr(attribute);
            let isEmpty = !value || value.trim() === '';
            let html_details = `
            <div class="labs-orders__patient-item">
                <div class="labs-orders__patient-key">
                    ${labels[i]}:
                </div>
                <div class="labs-orders__patient-value ${isEmpty ? 'empty' : ''}">
                    ${isEmpty ? 'unfilled' : value}
                </div>
            </div>`;
            patient_details.append(html_details);

            if (isEmpty && ['data-patient-gender', 'data-patient-dob', 'data-patient-firstname', 'data-patient-lastname', 'data-patient-physician-npi'].includes(attribute)) {
                errorFields.push(labels[i]);
            }
        });

        if (errorFields.length) {
            patient_error.removeClass('hidden');
            patient_wrapper.removeClass('hidden');
            let html_error = `There are no required fields in the patient profile: <span>${errorFields.join(', ')}</span>`
            patient_error.html(html_error);
        } else {
            patient_wrapper.removeClass('hidden');
        }
    }


    function getPatientName(firstName, lastName) {
        if (firstName && lastName) {
            return lastName + ', ' + firstName;
        } else if (firstName) {
            return firstName;
        } else if (lastName) {
            return lastName;
        } else {
            return '';
        }
    }


});

