var order_templates = document.querySelectorAll('.order-template');
var add_more_buttons = document.querySelectorAll('.btnAddMore');
var selected_pharmacy = '';

function recalculate_med_price() {
    var tm = 0;
    $('.order-template.active .med_cost_class').each(function (i, obj) {
        var v = $(this).val().trim();
        if (!(v > 0)) {
            v = 0;
        }
        tm = tm + parseFloat(v) * 1;
    });

// add shipping price
    tm = tm + parseFloat($('#choose-shipping' + $('#setFormId').val() + ' option:selected').data('price'));

// add Alcohol Swabs i� checked and add shipping prices
    if ($('input[name="alcSwabs' + $('#setFormId').val() + '"]').is(':checked')) {
        tm = tm + parseFloat($('input[name="alc_cost' + $('#setFormId').val() + '"]').val());
    }
    if ($('#setFormId_add').val() > 0) {
        if ($('input[name="alcSwabs' + $('#setFormId_add').val() + '"]').is(':checked')) {
            tm = tm + parseFloat($('input[name="alc_cost' + $('#setFormId_add').val() + '"]').val());
        }
        tm = tm + parseFloat($('#choose-shipping' + $('#setFormId_add').val() + ' option:selected').data('price'));
    }
    if ($('#setFormId_add_2').val() > 0) {
        if ($('input[name="alcSwabs' + $('#setFormId_add_2').val() + '"]').is(':checked')) {
            tm = tm + parseFloat($('input[name="alc_cost' + $('#setFormId_add_2').val() + '"]').val());
        }
        tm = tm + parseFloat($('#choose-shipping' + $('#setFormId_add_2').val() + ' option:selected').data('price'));
    }

// add order process fee
    tm = tm + parseFloat($('#orderprocess-fee' + $('#setFormId').val()).val());

    $('.ctmedcost').html(parseFloat(tm).toFixed(2));
    $('.totmeds').val(parseFloat(tm).toFixed(2));
}


function deleteThisRow() {
    event.target.classList.toggle('clicked');

    var newtotmeds = $('.totmeds').val() - event.target.previousElementSibling.value;
    $('.totmeds').val(parseFloat(newtotmeds).toFixed(2));
    $('.ctmedcost').html(parseFloat(newtotmeds).toFixed(2));
    console.log('delete med: ' + newtotmeds);

    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);

    recalculate_med_price();
}


function addMedRow() {
    let data_id = event.target.getAttribute('data-id');
    let med_form = document.getElementById('medForm' + data_id);
    let last_row = med_form.querySelector('tr');
    let clone = last_row.cloneNode(true);
    med_form.querySelector('tbody').appendChild(clone);

    var last_row1 = $('#medForm' + data_id).find('tr').last();
    var row = $(last_row1).find('.change_common_med');
    var s_c = $(row).val().split('|');

    if(s_c[5] == 1) {
        $('.order-template.active #choose-shipping' + data_id + ' .shipping').hide();
        $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').show();
        var с = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
        var d = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
        $('.order-template.active #choose-shipping' + data_id ).val(с);
        $('.order-template.active #shipping-price' + data_id ).val(d);
    } else {
        $('.order-template.active #choose-shipping' + data_id + ' .shipping').hide();
        $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy).show();
    }

    var row1 = $(row).closest('tr').find('.change_select');
    $(row1).each(function () {
        var m_v = '';
        var row2 = $(this).find('.med' + s_c[0]);
        var numItems = $(row2).length;
        if (numItems == 2) {
            var m_v = $(row2).eq(1).val();
//            $(this).val(m_v);
        }
    });

    recalculate_med_price();


    $(".change_med_disp").on("change", function () {
        var tek_val = 1;
        if (!($(this).val().trim() == 'Open')) {
            tek_val = $(this).val().trim();
        }
        var row = $(this).closest('tr').find('.med_cost_class');
        var n_val = tek_val * $(row).data('cost');
        $(row).val(parseFloat(n_val).toFixed(2));
        var row2 = $(this).closest('tr').find('.med_cost2_class');
        var n_val2 = tek_val * $(row2).data('cost');
        $(row2).val(parseFloat(n_val2).toFixed(2));

        if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
            var n_val = $(this).find(':selected').data('price');
            var n_val1 = $(this).find(':selected').data('price2');
            $(row).val(parseFloat(n_val).toFixed(2));
            $(row2).val(parseFloat(n_val1).toFixed(2));
        }

        $(row2).prop('type', 'hidden');
        var row3 = $(this).closest('tr').find('.change_manual_med_disp');
        $(row3).hide();
        if ($(this).val().trim() == 'Open') {
            $(row3).show();
            $(row3).val('1');
//            $(row2).prop('type', 'number');
        }

        recalculate_med_price();
    });


    $(".change_manual_med_disp").on("change", function () {
        var row = $(this).closest('tr').find('.med_cost_class');
        var n_val = $(this).val().trim() * $(row).data('cost');
        $(row).val(parseFloat(n_val).toFixed(2));

        var row = $(this).closest('tr').find('.med_cost2_class');
        var n_val = $(this).val().trim() * $(row).data('cost');
        $(row).val(parseFloat(n_val).toFixed(2));
    });

    recalculate_med_price();



    $(".change_common_med").on("change", function () {

        if ($('#medForm' + data_id + ' .change_select').length > 0) {

            $(this).closest('tr').find('.medication_name').hide();

            var s_c = $(this).val().trim().split('|');

            if(s_c[5] == 1) {
                $('.order-template.active #choose-shipping' + data_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').show();
                var с = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                var d = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                $('.order-template.active #choose-shipping' + data_id ).val(с);
                $('.order-template.active #shipping-price' + data_id ).val(d);
            } else {
                $('.order-template.active #choose-shipping' + data_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy).show();
            }

            var row = $(this).closest('tr').find('.med' + s_c[0]);
            $(row).show();

            var row1 = $(this).closest('tr').find('.change_select');
            $(row1).each(function () {

                var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                var row2 = $(this).find('.med' + s_c[0]);
                var numItems = $(row2).length;
                console.log('numItems: ' + numItems);
                if (numItems == 2) {
                    var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                }
                $(this).val(m_v);

            });

            var row_disp = $(this).closest('tr').find('.change_med_disp');
            var tek_val = 1;
            if (!($(row_disp).val() == 'Open')) {
                tek_val = $(row_disp).val();
            }
            $(row_disp).data('custom', s_c[4]);

            var row_price = $(this).closest('tr').find('.med_cost_class');
            $(row_price).val(parseFloat(s_c[2] * tek_val).toFixed(2));
            $(row_price).data('cost', s_c[2]);

            var row_manual_disp = $(this).closest('tr').find('.change_manual_med_disp');
            $(row_manual_disp).hide();
            if ($(row_disp).val() == 'Open') {
                $(row_manual_disp).show();
                $(row_manual_disp).val('1');
            }

            var row_price = $(this).closest('tr').find('.med_cost2_class');
            $(row_price).val(parseFloat(s_c[3] * tek_val).toFixed(2));
            $(row_price).data('cost', s_c[3]);

            $(row_price).prop('type', 'hidden');
            if ($(row_disp).val() == 'Open') {
//                $(row_price).prop('type', 'number');
            }

            recalculate_med_price();

        }

    });


    $(".med_cost_class").on("change", function () {
        recalculate_med_price();
    });


}











// Toggle Secondary Physician Functionality
if (document.querySelector('#has-second-phys')) {
    document.querySelector('#has-second-phys').addEventListener('change', function (e) {
        document.querySelectorAll('.has-second-phys').forEach(elem => {
            if (elem.classList.contains('hidden')) {
                elem.classList.remove('hidden');
            } else {
                elem.classList.add('hidden');
            }
        });
    });
}

// Save Split Payment
function save_split_payment(e) {
    let nth = e.target.getAttribute('data-nth');
    let field = document.querySelector('#split-payment' + nth);
    let table = document.querySelector('#split-payment-table' + nth + ' tbody');
    let new_val = [];
//    console.log({nth: nth, field: field, table: table});
    table.querySelectorAll('tr').forEach((row, index) => {
        //console.log({index: index, row: row});
        let new_row = {};
        let cols = row.querySelectorAll('td input');
        cols.forEach((col, jndex) => {
            if (col.getAttribute('data-name') !== null && col.getAttribute('data-name') != "") {
                //console.log({jndex: jndex, col: col});
                let col_name = col.getAttribute('data-name');
                let col_val = col.value;
                new_row[col_name] = col_val;
            }
        });
        if (new_row !== {}) {
            new_val.push(new_row);
        }
    });
    //console.log({function: "save_split_payment", new_val: new_val});
    field.value = JSON.stringify(new_val);
}

// Set Dynamic Event Listener For Save Split Payment
function init_save_split_payment(nth) {
//    console.log("INIT: init_save_split_payment: " + nth);
    document.querySelectorAll('#split-payment-table' + nth + ' tbody tr').forEach((row, index) => {
        row.querySelectorAll('input').forEach((field, jndex) => {
            if (!field.classList.contains('init')) {
                field.classList.add('init');
                field.addEventListener('change', function (e) {
                    save_split_payment(e);
                });
            }
        });
    });
}

// Set Dynamic Event Listener For Delete Split Payment
function init_delete_split_payment(nth) {
//    console.log("INIT: init_delete_split_payment: " + nth);
    document.querySelectorAll('#split-payment-table' + nth + '.delete-row').forEach(button => {
        if (!button.classList.contains('init')) {
            button.classList.add('init');
            button.addEventListener('click', function (e) {
                delete_split_payment_row(e, this);
            });
        }
    });
}

// Append Split Payment Row to Split Payment Table
function append_split_payment_row(e, nth) {
    e.preventDefault();
    let tbody = document.querySelector('#split-payment-table' + nth + ' tbody');
    let row = `<tr>
              <td><input data-name="card" type="text" class="split-cc-card" placeholder="CC Last-4" value="" data-nth="${nth}" /></td>
              <td><input data-name="amount" type="number" min="0" max="10000" step="0.01" class="split-cc-amount" placeholder="$$$" value="" data-nth="${nth}" /></td>
              <!-- <td><input data-name="date" type="date" min="0" max="100" step="0.01" class="split-cc-pay-date" placeholder="%" value="" data-nth="${nth}" /></td> -->
              <td><button type="button" class="delete-row smallBtn" style="width:40px;">-</button></td>
            </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
}

// Delete Split Payment Row
function delete_split_payment_row(e, $this) {
    e.preventDefault();
    let row = $this.parentNode.parentNode;
    let tbody = row.parentNode;
    row.remove();
}


var pmData = {};

// BEGIN Payment Method Engine
function PaymentMethodEngine(nth, pmData, index) {
//    console.log({in_nth: {nth, pmData, index}});
    pmData[nth] = {};
    pmData[nth].row_cpo = document.getElementById("row-cpo" + nth);
    pmData[nth].row_cpm = document.getElementById("row-cpm" + nth);
    pmData[nth].row_sp = document.getElementById("row-sp" + nth);
    pmData[nth].choose_payment_option = document.getElementById("choose-payment-option" + nth);
    pmData[nth].choose_payment_method = document.getElementById("choose-payment-method" + nth);
    pmData[nth].cpm_split_option = document.getElementById("split-option" + nth);
    pmData[nth].add_split_payment = document.getElementById("add-split-payment" + nth);


    if (!(pmData[nth].choose_payment_option === null)) {

//        console.log(pmData[nth]);

        // Choose Payment Option Engine
        pmData[nth].choose_payment_option.addEventListener('change', function (e) {
            //e.preventDefault();
            let selected = this.options[this.selectedIndex].value;
//            console.log({selected: selected, this: this});
            switch (selected) {
                case "pay_in_full":
                    pmData[nth].row_cpm.classList.remove('hidden');
                    pmData[nth].cpm_split_option.classList.remove('hidden');
                    break;
                case "do_not_charge":
                    if (!pmData[nth].row_cpm.classList.contains('hidden')) {
                        pmData[nth].row_cpm.classList.add('hidden');
                    }
                    if (!pmData[nth].row_sp.classList.contains('hidden')) {
                        pmData[nth].row_sp.classList.add('hidden');
                    }
                    pmData[nth].cpm_split_option.classList.add('hidden');
                    break;
                case "payment_plan":
                    pmData[nth].row_cpm.classList.remove('hidden');
                    pmData[nth].cpm_split_option.classList.remove('hidden');
                    break;
            }
        });

        // Choose Payment Method Engine
        pmData[nth].choose_payment_method.addEventListener('change', function (e) {
            //e.preventDefault();
            let selected = this.options[this.selectedIndex].value;
            var cc = document.getElementById('cc');
            //console.log({selected: selected, this: this});
            switch (selected) {
                case "ccof":
                    pmData[nth].row_sp.classList.add('hidden');
                    cc.style.background = "yellow";
                    window.scrollTo(0, Math.abs(cc.getBoundingClientRect().top));
                    break;
                case "new_cc":
                    pmData[nth].row_sp.classList.add('hidden');
                    cc.style.background = "yellow";
                    window.scrollTo(0, Math.abs(cc.getBoundingClientRect().top));
                    break;
                case "split":
                    pmData[nth].row_sp.classList.remove('hidden');
                    cc.style.background = "white";
                    break;
            }
        });

        // Add Split Payment Method Engine
        pmData[nth].add_split_payment.addEventListener('click', function (e) {
            e.preventDefault();
            append_split_payment_row(e, nth);
            init_save_split_payment(nth);
            init_delete_split_payment(nth);
        });

        init_save_split_payment(nth);
        init_delete_split_payment(nth);
    }
} // END: PaymentMethodEngine(nth)

// Edit Payment Method Engine
if (window.location.href.split('editorder.php').length > 1) {
    function EditPaymentMethodEngine() {
        var nth = "";
        var row_cpo = document.getElementById("row-cpo" + nth);
        var row_cpm = document.getElementById("row-cpm" + nth);
        var row_sp = document.getElementById("row-sp" + nth);
        var choose_payment_option = document.getElementById("choose-payment-option" + nth);
        var choose_payment_method = document.getElementById("choose-payment-method" + nth);
        var cpm_split_option = document.getElementById("split-option" + nth);
        var add_split_payment = document.getElementById("add-split-payment" + nth);

//        console.log(pmData[nth]);

        // Choose Payment Option Engine
        choose_payment_option.addEventListener('change', function (e) {
            e.preventDefault();
            let selected = this.options[this.selectedIndex].value;
//            console.log({selected: selected, this: this});
            switch (selected) {
                case "pay_in_full":
                    row_cpm.classList.remove('hidden');
                    cpm_split_option.classList.remove('hidden');
                    break;
                case "do_not_charge":
                    if (!row_cpm.classList.contains('hidden')) {
                        row_cpm.classList.add('hidden');
                    }
                    if (!row_sp.classList.contains('hidden')) {
                        row_sp.classList.add('hidden');
                    }
                    cpm_split_option.classList.add('hidden');
                    break;
                case "payment_plan":
                    row_cpm.classList.remove('hidden');
                    cpm_split_option.classList.remove('hidden');
                    break;
            }
        });

        // Choose Payment Method Engine
        choose_payment_method.addEventListener('change', function (e) {
            e.preventDefault();
            let selected = this.options[this.selectedIndex].value;
            var cc = document.getElementById('cc');
            //console.log({selected: selected, this: this});
            switch (selected) {
                case "ccof":
                    row_sp.classList.add('hidden');
                    cc.style.background = "yellow";
                    window.scrollTo(0, Math.abs(cc.getBoundingClientRect().top));
                    break;
                case "new_cc":
                    row_sp.classList.add('hidden');
                    cc.style.background = "yellow";
                    window.scrollTo(0, Math.abs(cc.getBoundingClientRect().top));
                    break;
                case "split":
                    row_sp.classList.remove('hidden');
                    cc.style.background = "white";
                    break;
            }
        });

        // Add Split Payment Method Engine
        add_split_payment.addEventListener('click', function (e) {
            e.preventDefault();
            append_split_payment_row(e, nth);
            init_save_split_payment(nth);
            init_delete_split_payment(nth);
        });

        init_save_split_payment(nth);
        init_delete_split_payment(nth);
    } // END: EditPaymentMethodEngine()
    EditPaymentMethodEngine();
} // END: IF()











// Select Order Template Engine
if (document.getElementById('select-order-template')) {
    document.getElementById('select-order-template').addEventListener('change', function (e) {
        //e.preventDefault();
        var data_id = this.value;

        var ot_selected = this.options[this.selectedIndex];
        var active_template = ot_selected.getAttribute('data-template');
        var hidden_storage = document.getElementById('renew-emr-hidden-form');
        var selected_form_id = ot_selected.getAttribute('data-form-id');

        selected_pharmacy = ot_selected.getAttribute('data-pharmacy');

        var set_form_id = document.getElementById('setFormId');
        var order_templates = document.getElementById('order-templates').querySelectorAll('.order-template');

        set_form_id.setAttribute('value', selected_form_id);
        set_form_id.setAttribute('data-key', selected_form_id);

        var current_order_template = document.getElementById('iorder_template');
        var ot_selected_text = this.options[this.selectedIndex].text;
        current_order_template.setAttribute('value', ot_selected_text);


        if (order_templates.length > 0) {
            order_templates.forEach(order_template => {

                order_template.classList.remove('active');
                order_template.setAttribute('style', 'display:none;');
                order_template.querySelectorAll('*').forEach(elem => {
                    elem.classList.add('data_skip');
                });

                hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
            });
        }

        document.getElementById('order-templates').innerHTML = "";


        var order_templates = document.getElementById('order-templates' + data_id).querySelectorAll('.order-template');
        if (order_templates.length > 0) {
            order_templates.forEach(order_template => {
                order_template.classList.remove('active');
                order_template.setAttribute('style', 'display:none;');
                order_template.querySelectorAll('*').forEach(elem => {
                    elem.classList.add('data_skip');
                });

                hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
            });
        }

        document.getElementById('order-templates' + data_id).innerHTML = "";


        var order_templates = document.getElementById('order-templates_2_' + data_id).querySelectorAll('.order-template');
        if (order_templates.length > 0) {
            order_templates.forEach(order_template => {
                order_template.classList.remove('active');
                order_template.setAttribute('style', 'display:none;');
                order_template.querySelectorAll('*').forEach(elem => {
                    elem.classList.add('data_skip');
                });

                hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
            });
        }

        document.getElementById('order-templates_2_' + data_id).innerHTML = "";


        var at_selector = hidden_storage.querySelector(active_template);

        at_selector.classList.add('active');
        at_selector.setAttribute('style', 'display:block;');
        at_selector.querySelectorAll('*').forEach(elem => {
            elem.classList.remove('data_skip');
        });
        document.getElementById('order-templates').insertAdjacentHTML('beforeend', at_selector.outerHTML);
        hidden_storage.removeChild(hidden_storage.querySelector(active_template));


        // Execute PaymentMethodEngine
        document.querySelectorAll('.order-template').forEach((template, index) => {
            let nth = template.getAttribute('data-order-template-id');
            PaymentMethodEngine(nth, pmData, index);
        });

/*
        $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
        $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
*/

        var is_cold = 0;

        $('#medForm' + selected_form_id + ' .change_common_med').each(function () {
            $(this).closest('tr').find('.medication_name').hide();
            var s_c = $(this).val().trim().split('|');

            if(s_c[5] == 1) {
                is_cold = 1;
            }

            var row = $(this).closest('tr').find('.med' + s_c[0]);
            $(row).show();
            var row1 = $(this).closest('tr').find('.change_select');
            $(row1).each(function () {

                var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                var row2 = $(this).find('.med' + s_c[0]);
                var numItems = $(row2).length;
                if (numItems == 2) {
                    var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                }
//                $(this).val(m_v);
            });
            recalculate_med_price();
        });
        if(is_cold == 1) {
            $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
            $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
            var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
            var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
            $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
            $('.order-template.active #shipping-price' + selected_form_id ).val(d);
            
        } else {
            $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
            $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
        }






        $('#medForm' + selected_form_id + ' .change_med_disp').each(function () {
            var tek_val = 1;
            if (!($(this).val().trim() == 'Open')) {
                tek_val = $(this).val().trim();
            }
            let row_change_common_med = $(this).closest('tr').find('.change_common_med');
            let s_c = $(row_change_common_med).val().split('|');

            $(this).data('custom', s_c[4]);

//            if (!($(this).data('custom') == 1)) {
                var row = $(this).closest('tr').find('.med_cost_class');
                var n_val = tek_val * $(row).data('cost');
                $(row).val(parseFloat(n_val).toFixed(2));
                var row2 = $(this).closest('tr').find('.med_cost2_class');
                var n_val2 = tek_val * $(row2).data('cost');
                $(row2).val(parseFloat(n_val2).toFixed(2));
//            }

            if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
            
                let n_val = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price');
                let n_val1 = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price2');
                $(row).val(parseFloat(n_val).toFixed(2));
                $(row2).val(parseFloat(n_val1).toFixed(2));
            }

            $(row2).prop('type', 'hidden');
            var row3 = $(this).closest('tr').find('.change_manual_med_disp');
            $(row3).hide();
            if ($(this).val().trim() == 'Open') {
                $(row3).show();
                $(row3).val('1');
//                $(row2).prop('type', 'number');
            }
            
            recalculate_med_price();
        });


        $(".change_med_disp").on("change", function () {
            var tek_val = 1;
            if (!($(this).val().trim() == 'Open')) {
                tek_val = $(this).val().trim();
            }

            var row = $(this).closest('tr').find('.med_cost_class');
            var n_val = tek_val * $(row).data('cost');
            $(row).val(parseFloat(n_val).toFixed(2));
            var row2 = $(this).closest('tr').find('.med_cost2_class');
            var n_val2 = tek_val * $(row2).data('cost');
            $(row2).val(parseFloat(n_val2).toFixed(2));

            if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
                var n_val = $(this).find(':selected').data('price');
                var n_val1 = $(this).find(':selected').data('price2');
                $(row).val(parseFloat(n_val).toFixed(2));
                $(row2).val(parseFloat(n_val1).toFixed(2));
            }

            $(row2).prop('type', 'hidden');
            var row3 = $(this).closest('tr').find('.change_manual_med_disp');
            $(row3).hide();
            if ($(this).val().trim() == 'Open') {
                $(row3).show();
                $(row3).val('1');
//                $(row2).prop('type', 'number');
            }

            recalculate_med_price();
        });


        $(".change_manual_med_disp").on("change", function () {
            var row = $(this).closest('tr').find('.med_cost_class');
            var n_val = $(this).val().trim() * $(row).data('cost');
            $(row).val(parseFloat(n_val).toFixed(2));

            var row = $(this).closest('tr').find('.med_cost2_class');
            var n_val = $(this).val().trim() * $(row).data('cost');
            $(row).val(parseFloat(n_val).toFixed(2));
        });


        $(".change_common_med").on("change", function () {

            $(this).closest('tr').find('.medication_name').hide();
            var s_c = $(this).val().trim().split('|');

            if(s_c[5] == 1) {
                $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                $('.order-template.active #shipping-price' + selected_form_id ).val(d);
            } else {
                $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
            }

            var row = $(this).closest('tr').find('.med' + s_c[0]);
            $(row).show();

            var row1 = $(this).closest('tr').find('.change_select');
            $(row1).each(function () {

                var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                var row2 = $(this).find('.med' + s_c[0]);
                var numItems = $(row2).length;
                console.log('numItems: ' + numItems);
                if (numItems == 2) {
                    var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                }
               $(this).val(m_v);
            });


            var row_disp = $(this).closest('tr').find('.change_med_disp');
            var tek_val = 1;
            if (!($(row_disp).val() == 'Open')) {
                tek_val = $(row_disp).val();
            }
            $(row_disp).data('custom', s_c[4]);

            var row_price = $(this).closest('tr').find('.med_cost_class');
            $(row_price).val(parseFloat(s_c[2] * tek_val).toFixed(2));
            $(row_price).data('cost', s_c[2]);

            var row_manual_disp = $(this).closest('tr').find('.change_manual_med_disp');
            $(row_manual_disp).hide();
            if ($(row_disp).val() == 'Open') {
                $(row_manual_disp).show();
                $(row_manual_disp).val('1');
            }

            var row_price2 = $(this).closest('tr').find('.med_cost2_class');
            $(row_price2).val(parseFloat(s_c[3] * tek_val).toFixed(2));
            $(row_price2).data('cost', s_c[3]);


            if (($(row_disp).data('custom') == 1) && !($(row_disp).val() == '')) {
                let n_val = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price');
                let n_val1 = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price2');
                $(row_price).val(parseFloat(n_val).toFixed(2));
                $(row_price2).val(parseFloat(n_val1).toFixed(2));
            }



            $(row_price2).prop('type', 'hidden');
            if ($(row_disp).val() == 'Open') {
//                $(row_price).prop('type', 'number');
            }

            recalculate_med_price();

        });


// On template change
        $('.orderFeeNum').on('change', function () {
            $('.vicoordcom').html(($(this).val().trim() * 15) / 100);
            $('.icoordcom').val(($(this).val().trim() * 15) / 100);
//            console.log(($(this).val().trim() * 15) / 100);
        });


        //        recalculate_med_price();


// On a Medication price change
        $(".med_cost_class").on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change
        $('input[name="alcSwabs' + $('#setFormId').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change add template
        $('input[name="alcSwabs' + $('#setFormId_add').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change add2 template
        $('input[name="alcSwabs' + $('#setFormId_add_2').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change price
        $('input[name="alc_cost' + $('#setFormId').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change price add template
        $('input[name="alc_cost' + $('#setFormId_add').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On Alcohol Swabs change price add2 template
        $('input[name="alc_cost' + $('#setFormId_add_2').val() + '"]').on("change", function () {
            recalculate_med_price();
        });


// On shipping change
        $('#choose-shipping' + $('#setFormId').val()).on("change", function () {
            recalculate_med_price();
        });


// On shipping change add template
        $('#choose-shipping' + $('#setFormId_add').val()).on("change", function () {
            recalculate_med_price();
        });


// On shipping change add2 template
        $('#choose-shipping' + $('#setFormId_add_2').val()).on("change", function () {
            recalculate_med_price();
        });


// On order process fee change
        $('#orderprocess-fee' + $('#setFormId').val()).on("change", function () {
            recalculate_med_price();
        });







        $('.pharm').hide();


        $('#choose-pharmacy-add' + data_id).on("change", function () {
            $('.pharm').hide();
            $('.none').hide();
//          console.log('selected pharm: ' + $(this).val().trim());
            $('#select-order-template-add' + data_id).val($(this).val().trim())
            $('.' + $('#choose-pharmacy-add' + data_id).val()).show();

//            $('#addblock' + data_id + ' .shipping').hide();
//            $('#addblock' + data_id + ' .' + $(this).val().trim()).show();

        });


        $('#append' + data_id).on("click", function () {
            $(this).hide();
            $('#addbotton_2_' + data_id).show();
            $('#addblock' + data_id).show();
        });


        $('#remove' + data_id).on("click", function () {
            $('#append' + data_id).show();
            $('#addbotton_2_' + data_id).hide();

// $('#order' + data_id + ' .order-template').remove();

            var order_templates = document.getElementById('order-templates' + data_id).querySelectorAll('.order-template');
            if (order_templates.length > 0) {
                order_templates.forEach(order_template => {
                    order_template.classList.remove('active');
                    order_template.setAttribute('style', 'display:none;');
                    order_template.querySelectorAll('*').forEach(elem => {
                        elem.classList.add('data_skip');
                    });

                    hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
                });
            }

            document.getElementById('order-templates' + data_id).innerHTML = "";

            $('#setFormId_add').val('');
            $('#iorder_template_add').val('');
            $('#addblock' + data_id + ' select').val('none');
            $('#addblock' + data_id).hide();

            recalculate_med_price();

        });


        $('#choose-pharmacy-add_2_' + data_id).on("change", function () {
            $('.pharm').hide();
            $('.none').hide();
            console.log('selected pharm_2: ' + $(this).val().trim());
            $('#select-order-template-add_2_' + data_id).val($(this).val().trim())
            $('.' + $('#choose-pharmacy-add_2_' + data_id).val()).show();

//            $('#addblock' + data_id + ' .shipping').hide();
//            $('#addblock' + data_id + ' .' + $(this).val().trim()).show();

        });


        $('#append_2_' + data_id).on("click", function () {
            $(this).hide();
            $('#addblock_2_' + data_id).show();
        });


        $('#remove_2_' + data_id).on("click", function () {
            $('#append_2_' + data_id).show();

// $('#order' + data_id + ' .order-template').remove();

            var order_templates = document.getElementById('order-templates_2_' + data_id).querySelectorAll('.order-template');
            if (order_templates.length > 0) {
                order_templates.forEach(order_template => {
                    order_template.classList.remove('active');
                    order_template.setAttribute('style', 'display:none;');
                    order_template.querySelectorAll('*').forEach(elem => {
                        elem.classList.add('data_skip');
                    });

                    hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
                });
            }

            document.getElementById('order-templates_2_' + data_id).innerHTML = "";

            $('#setFormId_add_2').val('');
            $('#iorder_template_add_2').val('');
            $('#addblock_2_' + data_id + ' select').val('none');
            $('#addblock_2_' + data_id).hide();

            recalculate_med_price();

        });











        if (document.getElementById('select-order-template-add' + data_id)) {
            document.getElementById('select-order-template-add' + data_id).addEventListener('change', function (e) {
                //e.preventDefault();

                var ot_selected = this.options[this.selectedIndex];
                var active_template = ot_selected.getAttribute('data-template');
                var hidden_storage = document.getElementById('renew-emr-hidden-form');
                var selected_form_id = ot_selected.getAttribute('data-form-id');

                selected_pharmacy = ot_selected.getAttribute('data-pharmacy');

                var set_form_id = document.getElementById('setFormId_add');
                var order_templates = document.getElementById('order-templates' + data_id).querySelectorAll('.order-template');

                set_form_id.setAttribute('value', selected_form_id);
                set_form_id.setAttribute('data-key', selected_form_id);

//          $('#iorder_template_add').val($(this).find("option:selected").text());

                var current_order_template = document.getElementById('iorder_template_add');
                var ot_selected_text = this.options[this.selectedIndex].text;
                current_order_template.setAttribute('value', ot_selected_text);


                if (order_templates.length > 0) {
                    order_templates.forEach(order_template => {

                        order_template.classList.remove('active');
                        order_template.setAttribute('style', 'display:none;');
                        order_template.querySelectorAll('*').forEach(elem => {
                            elem.classList.add('data_skip');
                        });

                        hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
                    });
                }

                document.getElementById('order-templates' + data_id).innerHTML = "";


                var at_selector = hidden_storage.querySelector(active_template);

                at_selector.classList.add('active');
                at_selector.setAttribute('style', 'display:block;');
                at_selector.querySelectorAll('*').forEach(elem => {
                    elem.classList.remove('data_skip');
                });
                document.getElementById('order-templates' + data_id).insertAdjacentHTML('beforeend', at_selector.outerHTML);
                hidden_storage.removeChild(hidden_storage.querySelector(active_template));


                $('#order-templates' + data_id + ' #orderFee').remove();
                $('#paymentsandsubmit' + selected_form_id).remove();

                $('#addblock' + selected_form_id).remove();
                $('#addbotton' + selected_form_id).remove();
                $('#addblock_2_' + selected_form_id).remove();
                $('#addbotton_2_' + selected_form_id).remove();

                $('#orderprocess-fee' + selected_form_id).remove();

/*
                $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
*/


                recalculate_med_price();

                var is_cold = 0;

                $('#medForm' + selected_form_id + ' .change_common_med').each(function () {

                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        is_cold = 1;
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
//                        $(this).val(m_v);
                    });

                    recalculate_med_price();
                });
                if(is_cold == 1) {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                    $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                } else {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                }
                
                
                
                
                $('#medForm' + selected_form_id + ' .change_med_disp').each(function () {
                    var tek_val = 1;
                    if (!($(this).val().trim() == 'Open')) {
                        tek_val = $(this).val().trim();
                    }

                    let row_change_common_med = $(this).closest('tr').find('.change_common_med');
                    let s_c = $(row_change_common_med).val().split('|');

                    $(this).data('custom', s_c[4]);

//            if (!($(this).data('custom') == 1)) {
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = tek_val * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                    var row2 = $(this).closest('tr').find('.med_cost2_class');
                    var n_val2 = tek_val * $(row2).data('cost');
                    $(row2).val(parseFloat(n_val2).toFixed(2));
//            }

                    if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
                        let n_val = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price');
                        let n_val1 = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price2');
                        $(row).val(parseFloat(n_val).toFixed(2));
                        $(row2).val(parseFloat(n_val1).toFixed(2));
                    }


                    $(row2).prop('type', 'hidden');
                    var row3 = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row3).hide();
                    if ($(this).val().trim() == 'Open') {
                        $(row3).show();
                        $(row3).val('1');
//                        $(row2).prop('type', 'number');
                    }
                    
                    recalculate_med_price();
                    
                });


                $(".change_med_disp").on("change", function () {
                    var tek_val = 1;
                    if (!($(this).val().trim() == 'Open')) {
                        tek_val = $(this).val().trim();
                    }
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = tek_val * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                    var row2 = $(this).closest('tr').find('.med_cost2_class');
                    var n_val2 = tek_val * $(row2).data('cost');
                    $(row2).val(parseFloat(n_val2).toFixed(2));

                    if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
                        var n_val = $(this).find(':selected').data('price');
                        var n_val1 = $(this).find(':selected').data('price2');
                        $(row).val(parseFloat(n_val).toFixed(2));
                        $(row2).val(parseFloat(n_val1).toFixed(2));
                    }

                    $(row2).prop('type', 'hidden');
                    var row3 = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row3).hide();
                    if ($(this).val().trim() == 'Open') {
                        $(row3).show();
                        $(row3).val('1');
//                        $(row2).prop('type', 'number');
                    }

                    recalculate_med_price();
                });


                $(".change_manual_med_disp").on("change", function () {
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = $(this).val().trim() * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));

                    var row = $(this).closest('tr').find('.med_cost2_class');
                    var n_val = $(this).val().trim() * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                });


                var is_cold = 0;

                $('#medForm' + selected_form_id + ' .change_common_med').each(function () {

                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        is_cold = 1;
                    }

                        var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
//                        $(this).val(m_v);
                    });

                    recalculate_med_price();

                });
                if(is_cold == 1) {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                    $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                } else {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                }


                $(".change_common_med").on("change", function () {


                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                        var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                        var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                        $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                        $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                    } else {
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        console.log('numItems: ' + numItems);
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
                        $(this).val(m_v);

                    });

                    var row_disp = $(this).closest('tr').find('.change_med_disp');
                    var tek_val = 1;
                    if (!($(row_disp).val() == 'Open')) {
                        tek_val = $(row_disp).val();
                    }
                    $(row_disp).data('custom', s_c[4]);

                    var row_price = $(this).closest('tr').find('.med_cost_class');
                    $(row_price).val(parseFloat(s_c[2] * tek_val).toFixed(2));
                    $(row_price).data('cost', s_c[2]);

                    var row_manual_disp = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row_manual_disp).hide();
                    if ($(row_disp).val() == 'Open') {
                        $(row_manual_disp).show();
                        $(row_manual_disp).val('1');
                    }

                    var row_price2 = $(this).closest('tr').find('.med_cost2_class');
                    $(row_price2).val(parseFloat(s_c[3] * tek_val).toFixed(2));
                    $(row_price2).data('cost', s_c[3]);


                    if (($(row_disp).data('custom') == 1) && !($(row_disp).val() == '')) {
                        let n_val = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price');
                        let n_val1 = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price2');
                        $(row_price).val(parseFloat(n_val).toFixed(2));
                        $(row_price2).val(parseFloat(n_val1).toFixed(2));
                    }



                    $(row_price2).prop('type', 'hidden');
                    if ($(row_disp).val() == 'Open') {
//                        $(row_price).prop('type', 'number');
                    }

                    recalculate_med_price();

                });


            });
        }


        if (document.getElementById('select-order-template-add_2_' + data_id)) {
            document.getElementById('select-order-template-add_2_' + data_id).addEventListener('change', function (e) {
                //e.preventDefault();

                var ot_selected = this.options[this.selectedIndex];
                var active_template = ot_selected.getAttribute('data-template');
                var hidden_storage = document.getElementById('renew-emr-hidden-form');
                var selected_form_id = ot_selected.getAttribute('data-form-id');

                selected_pharmacy = ot_selected.getAttribute('data-pharmacy');

                var set_form_id = document.getElementById('setFormId_add_2');
                var order_templates = document.getElementById('order-templates_2_' + data_id).querySelectorAll('.order-template');

                set_form_id.setAttribute('value', selected_form_id);
                set_form_id.setAttribute('data-key', selected_form_id);

//          $('#iorder_template_add_2').val($(this).find("option:selected").text());

                var current_order_template = document.getElementById('iorder_template_add_2');
                var ot_selected_text = this.options[this.selectedIndex].text;
                current_order_template.setAttribute('value', ot_selected_text);


                if (order_templates.length > 0) {
                    order_templates.forEach(order_template => {

                        order_template.classList.remove('active');
                        order_template.setAttribute('style', 'display:none;');
                        order_template.querySelectorAll('*').forEach(elem => {
                            elem.classList.add('data_skip');
                        });

                        hidden_storage.insertAdjacentHTML('beforeend', order_template.outerHTML);
                    });
                }

                document.getElementById('order-templates_2_' + data_id).innerHTML = "";


                var at_selector = hidden_storage.querySelector(active_template);

                at_selector.classList.add('active');
                at_selector.setAttribute('style', 'display:block;');
                at_selector.querySelectorAll('*').forEach(elem => {
                    elem.classList.remove('data_skip');
                });
                document.getElementById('order-templates_2_' + data_id).insertAdjacentHTML('beforeend', at_selector.outerHTML);
                hidden_storage.removeChild(hidden_storage.querySelector(active_template));


                $('#order-templates_2_' + selected_form_id + ' #orderFee').remove();
                $('#paymentsandsubmit' + selected_form_id).remove();

                $('#addblock' + selected_form_id).remove();
                $('#addbotton' + selected_form_id).remove();
                $('#addblock_2_' + selected_form_id).remove();
                $('#addbotton_2_' + selected_form_id).remove();

                $('#orderprocess-fee' + selected_form_id).remove();

/*
                $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
*/



                recalculate_med_price();

                var is_cold = 0;

                $('#medForm' + selected_form_id + ' .change_common_med').each(function () {

                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        is_cold = 1;
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
//                        $(this).val(m_v);
                    });

                    recalculate_med_price();
                });
                if(is_cold == 1) {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                    $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                } else {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                }


                
                $('#medForm' + selected_form_id + ' .change_med_disp').each(function () {
                    var tek_val = 1;
                    if (!($(this).val().trim() == 'Open')) {
                        tek_val = $(this).val().trim();
                    }

                    let row_change_common_med = $(this).closest('tr').find('.change_common_med');
                    let s_c = $(row_change_common_med).val().split('|');

                    $(this).data('custom', s_c[4]);

//            if (!($(this).data('custom') == 1)) {
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = tek_val * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                    var row2 = $(this).closest('tr').find('.med_cost2_class');
                    var n_val2 = tek_val * $(row2).data('cost');
                    $(row2).val(parseFloat(n_val2).toFixed(2));
//            }

                    if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
                        let n_val = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price');
                        let n_val1 = $(this).find('option[value="'+$(this).val().trim()+'"].med' + s_c[0]).data('price2');
                        $(row).val(parseFloat(n_val).toFixed(2));
                        $(row2).val(parseFloat(n_val1).toFixed(2));
                    }


                    $(row2).prop('type', 'hidden');
                    var row3 = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row3).hide();
                    if ($(this).val().trim() == 'Open') {
                        $(row3).show();
                        $(row3).val('1');
//                        $(row2).prop('type', 'number');
                    }
                    
                    recalculate_med_price();
                    
                });


                $(".change_med_disp").on("change", function () {
                    var tek_val = 1;
                    if (!($(this).val().trim() == 'Open')) {
                        tek_val = $(this).val().trim();
                    }
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = tek_val * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                    var row2 = $(this).closest('tr').find('.med_cost2_class');
                    var n_val2 = tek_val * $(row2).data('cost');
                    $(row2).val(parseFloat(n_val2).toFixed(2));

                    if (($(this).data('custom') == 1) && !($(this).val().trim() == '')) {
                        var n_val = $(this).find(':selected').data('price');
                        var n_val1 = $(this).find(':selected').data('price2');
                        $(row).val(parseFloat(n_val).toFixed(2));
                        $(row2).val(parseFloat(n_val1).toFixed(2));
                    }

                    $(row2).prop('type', 'hidden');
                    var row3 = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row3).hide();
                    if ($(this).val().trim() == 'Open') {
                        $(row3).show();
                        $(row3).val('1');
//                        $(row2).prop('type', 'number');
                    }

                    recalculate_med_price();
                });


                $(".change_manual_med_disp").on("change", function () {
                    var row = $(this).closest('tr').find('.med_cost_class');
                    var n_val = $(this).val().trim() * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));

                    var row = $(this).closest('tr').find('.med_cost2_class');
                    var n_val = $(this).val().trim() * $(row).data('cost');
                    $(row).val(parseFloat(n_val).toFixed(2));
                });


                var is_cold = 0;

                $('#medForm' + selected_form_id + ' .change_common_med').each(function () {

                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        is_cold = 1;
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
//                        $(this).val(m_v);
                    });
                    recalculate_med_price();
                });
                if(is_cold == 1) {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                    $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                } else {
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                    $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                }



                $(".change_common_med").on("change", function () {


                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if(s_c[5] == 1) {
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').show();
                        var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                        var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');
                        $('.order-template.active #choose-shipping' + selected_form_id ).val(с);
                        $('.order-template.active #shipping-price' + selected_form_id ).val(d);
                    } else {
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .shipping').hide();
                        $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy).show();
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
                    $(row).show();

                    var row1 = $(this).closest('tr').find('.change_select');
                    $(row1).each(function () {

                        var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                        var row2 = $(this).find('.med' + s_c[0]);
                        var numItems = $(row2).length;
                        console.log('numItems: ' + numItems);
                        if (numItems == 2) {
                            var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                        }
                        $(this).val(m_v);

                    });

                    var row_disp = $(this).closest('tr').find('.change_med_disp');
                    var tek_val = 1;
                    if (!($(row_disp).val() == 'Open')) {
                        tek_val = $(row_disp).val();
                    }
                    $(row_disp).data('custom', s_c[4]);

                    var row_price = $(this).closest('tr').find('.med_cost_class');
                    $(row_price).val(parseFloat(s_c[2] * tek_val).toFixed(2));
                    $(row_price).data('cost', s_c[2]);

                    var row_manual_disp = $(this).closest('tr').find('.change_manual_med_disp');
                    $(row_manual_disp).hide();
                    if ($(row_disp).val() == 'Open') {
                        $(row_manual_disp).show();
                        $(row_manual_disp).val('1');
                    }

                    var row_price2 = $(this).closest('tr').find('.med_cost2_class');
                    $(row_price2).val(parseFloat(s_c[3] * tek_val).toFixed(2));
                    $(row_price2).data('cost', s_c[3]);


                    if (($(row_disp).data('custom') == 1) && !($(row_disp).val() == '')) {
                        let n_val = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price');
                        let n_val1 = $(row_disp).find('option[value="'+$(row_disp).val()+'"]').data('price2');
                        $(row_price).val(parseFloat(n_val).toFixed(2));
                        $(row_price2).val(parseFloat(n_val1).toFixed(2));
                    }



                    $(row_price2).prop('type', 'hidden');
                    if ($(row_disp).val() == 'Open') {
//                        $(row_price).prop('type', 'number');
                    }

                    recalculate_med_price();

                });


            });
        }


    });
}







$('#renew-emr-order-form').on('submit', function (e) {

 let m = $('#renew-emr-order-form .orderFeeNum').eq(0).val() * 1;
 let s = $('#renew-emr-order-form .orderFeeNumMin').eq(0).val() * 1;

 if(m < s) {
     return confirm("Are you sure set Order Fee value: $" + m + " ?\nIt's less then minimal value: $" + s);
 }




let zero_price = 0;
let zero_string = '';
$('#renew-emr-order-form .med_cost_class').each(function () {
 if($(this).val().trim() == '' || $(this).val().trim() == '0' || $(this).val().trim() == '0.00') {
  zero_price = 1;
   
  let x = $(this).closest('tr').find('.change_common_med').val().split('|');
  let y = x[1];
  y = y.replace("_", " ");
  
  zero_string = zero_string + y + ';';

 }
});

if (zero_price == 1) {
 alert('You have zero price in order: ' + zero_string);
 return false;
}


    var blank_value = 0;
    $('.change_select').each(function () {
        if ($(this).val().trim() == '') {
            blank_value = 1;
        }

        var s_c = $(this).closest('tr').find('.change_common_med').val().split('|');
        var row2 = $(this).find('.med' + s_c[0]);
        var numItems = $(row2).length;
        if (numItems == 0) {
            blank_value = 0;
            $(this).val('');
        }else if (numItems > 1) {
            if ($(this).val() == '') {
                blank_value = 1;
            }
        }
    });

    if (blank_value == 1) {
        alert('You must set all medication options!');
        return false;
    } else {
        $('#renew-emr-order-form input[type="submit"].smallBtn').prop('disabled', true);
        $('#renew-emr-order-form input[type="submit"].smallBtn').val('Submiting ...');
    }
});


// Execute PaymentMethodEngine
if (document.querySelectorAll('.order-template')) {
    document.querySelectorAll('.order-template').forEach((template, index) => {
        let nth = template.getAttribute('data-order-template-id');
        PaymentMethodEngine(nth, pmData, index);
    });
}








function setShippingPrice($this) {
//    console.log({$this: $this.options, se: $this.selectedIndex});
    var shipping_price = $this.options[$this.selectedIndex];
    var price_field = $this.getAttribute('data-shipping-price');
    document.querySelector(price_field).value = shipping_price.getAttribute('data-price');
//    console.log({sp: shipping_price, pf: price_field});
}

// Initiate
$('.choose-shipping').each(function () {
    setShippingPrice(this);
});

function shippingSigReq($this) {
    let sigCost = $($this).data('sig-cost');
    let shippingInput = $($this).data('shipping-target');
    let fee = parseInt($(shippingInput).val());
    let status = $this.getAttribute('data-checked');
    if (status === '0') {
        $this.setAttribute('data-checked', '1');
        $this.setAttribute('value', '1');
        $this.setAttribute('checked', 'checked');
        $(shippingInput).val(fee + sigCost);
    } else {
        $this.setAttribute('data-checked', '0');
        $this.setAttribute('value', '0');
        $this.setAttribute('checked', 'false');
        $(shippingInput).val(fee - sigCost);
    }
    console.log({shippingSigReq: status});
}










