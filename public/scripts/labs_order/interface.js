$(document).ready(function () {

    let orderItemHidden = $('[data-order-hidden]')

    let addBtn = $('[data-add]')
    let countSections = 1
    let sectionsLimit = 5
    let selectedDates = []

    initDatepickers()
    updateViewDeleteButtons()
    findMaxDateInSelectedDates()

    addBtn.click(function (e) {
        e.preventDefault()
        let clonedOrderItem = indexSubstitutionOrderItems(orderItemHidden.clone(), countSections)
        if (countSections < sectionsLimit) {
            $('.rbs-labs_orders-items').append(clonedOrderItem)
            initDatepickers()
            updateViewDeleteButtons()
            countSections++
        }
        updateViewAddButton()
    })

    $(document).on('click', '[data-delete]', function () {
        let el = $(this)
        let parent = el.closest('[data-order-item]')
        let selectedDateValue = parent.find('[data-datepicker]').val()
        selectedDates = selectedDates.filter(el => el !== selectedDateValue)
        parent.remove()
        countSections--
        updateViewDeleteButtons()
        updateViewAddButton()
    });

    $(document).on('focus', 'input[data-datepicker]', function () {
        $(this).data('old-date', this.value);
    });

    $(document).on('change', 'input[data-datepicker]', function () {
        let oldValue = $(this).data('old-date');
        let newValue = this.value;

        if (!selectedDates.some(el => el === newValue)) {
            $(this).data('oldValue', newValue);
            selectedDates.push(newValue)
            selectedDates = selectedDates.filter(el => el !== oldValue)
        } else {
            alert('That date has already been selected on one of the orders')
            $(this).datepicker("setDate", oldValue)
        }
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


    function indexSubstitutionOrderItems(item, count) {

        let nameByDate = `order_items[${count}][date]`
        let nameBySelect = `order_items[${count}][type]`
        let nameByCheckbox = `order_items[${count}][codes][]`

        let dateSection = item.find('[data-datepicker]')
        let selectSection = item.find('[data-select]')
        let checkboxSections = item.find('[data-checkbox]')

        dateSection.attr('name', nameByDate)
        dateSection.attr('data-datepicker', count)
        dateSection.attr('id', `datepicker_${count}`)

        selectSection.attr('name', nameBySelect)

        checkboxSections.attr('name', nameByCheckbox)

        return item
    }

    function initDatepickers() {
        let orderItems = $('[data-order-items]').find('[data-order-item]')
        orderItems.each(function () {
            let datepickerItem = $(this).find('[data-datepicker]')
            let datepickerValue = datepickerItem.val()

            if (datepickerValue) {
                if (!selectedDates.some(el => el === datepickerValue))
                    selectedDates.push(datepickerValue)
            } else {
                let maxSelectedDate = findMaxDateInSelectedDates()
                let newDate = generateNextDate(maxSelectedDate)
                datepickerItem.val(newDate)
                selectedDates.push(newDate)
            }

            let index = datepickerItem.attr('data-datepicker')
            $(`#datepicker_${index}`).datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                minDate: 0
            });
        })
    }

    function findMaxDateInSelectedDates() {
        if (selectedDates.length) {
            let dates = selectedDates.map(function (e) {
                let parts = e.split('/');
                return new Date(parts[2], parts[1] - 1, parts[0]);
            });
            let maxDateIndex = dates.reduce((maxIndex, currDate, currIndex, arr) =>
                currDate > arr[maxIndex] ? currIndex : maxIndex, 0);
            return selectedDates[maxDateIndex]
        }
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
        $('[data-delete]').hide()
    }

    function showDeleteBtns() {
        $('[data-delete]').show()
    }

    function hideAddBtn() {
        $('[data-add]').hide()
    }

    function showAddBtn() {
        $('[data-add]').show()
    }
});

