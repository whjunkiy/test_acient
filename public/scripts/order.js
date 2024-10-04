var order_templates = document.querySelectorAll('.order-template');
var add_more_buttons = document.querySelectorAll('.btnAddMore');

function deleteThisRow() {
    event.target.classList.toggle('clicked');

    var newtotmeds = $('.totmeds').val() - event.target.previousElementSibling.value;
    $('.totmeds').val(parseFloat(newtotmeds).toFixed(2));
    $('.ctmedcost').html(parseFloat(newtotmeds).toFixed(2));
// console.log('delete med: ' + newtotmeds);

    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
}

function addMedRow() {
    let data_id = event.target.getAttribute('data-id');
    let med_form = document.getElementById('medForm' + data_id);
    let last_row = med_form.querySelector('tr');
    let clone = last_row.cloneNode(true);
    med_form.querySelector('tbody').appendChild(clone);

    var tm = 0;
    $('#medForm' + data_id + ' .med_cost_class').each(function (i, obj) {
        var v = $(this).val();
        tm = tm + parseFloat(v) * 1;
    });

// add Alcohol Swabs i� checked
    if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
        tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
    }
// add shipping price  
    tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
    tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

    $('.ctmedcost').html(parseFloat(tm).toFixed(2));
    $('.totmeds').val(parseFloat(tm).toFixed(2));
//  console.log('adding med: ' + tm);


    $('.change_common_med').on('change', function () {

        if ($('#medForm' + data_id + ' .change_select').length > 0) {

            $('.medication_name').hide();
            var s_c = $(this).val().split('|');
            var row = $(this).closest('tr').find('.med' + s_c[0]);
            $(row).show();

            var row1 = $(this).closest('tr').find('.change_select');
            $(row1).each(function (index) {
                var m_v = $(this).find('.med' + s_c[0]).eq(0).val();
                $(this).val(m_v);
            });

        }


        if ($(this).val() == "Custom") {
            $(this).next(".custom_common_med").show();
            $(this).next(".custom_common_med").css("opacity", "1");
            $(this).next(".custom_common_med").css("z-index", "0");
            $(this).next(".custom_common_med").children().css("background", "#e9ffbc");
            $(this).next(".custom_common_med").children().val("");
            $(this).next(".custom_common_med").children().focus();
        } else {
            $(this).next(".custom_common_med").css("opacity", "0");
            $(this).next(".custom_common_med").css("z-index", "-1");
            $(this).next(".custom_common_med").hide();
        }
    });


    $(".med_cost_class").on("change", function () {

        var tm = 0;
        $('#renew-emr-order-form .med_cost_class').each(function (i, obj) {
            var v = $(this).val();
            tm = tm + parseFloat(v) * 1;
        });
        $('.ctmedcost').html(parseFloat(tm).toFixed(2));
        $('.totmeds').val(parseFloat(tm).toFixed(2));
//   console.log('Change: ' + tm);

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
//  console.log({nth:nth, field:field, table:table});
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
// console.log("INIT: init_save_split_payment: "+nth);
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
// console.log("INIT: init_delete_split_payment: "+nth);
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

// var init_order_shipping_options = false;
// function OrderShippingOptionsEngine(ioso) {
//   if(!ioso) {
//     ioso = true;
//     // Change Order Shipping Options
//     // One Line Shipping Price Init Script
//     var shipping_selectors = document.querySelectorAll(".choose-shipping");
//     shipping_selectors.forEach(function(shipping_selector) {
//       console.log({shipping_selector: shipping_selector});
//       shipping_selector.addEventListener('change', function(e) {
//         let set_shipping = e.target.getAttribute('data-shipping-price');
//         let shipping_field = document.getElementById(set_shipping);
//         shipping_field.value = e.target.options[e.target.selectedIndex].getAttribute('data-price');
//         console.log({e:e, set_shipping: set_shipping, shipping_field: shipping_field});
//       });
//     });
//   }
// }

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

    // window["row_cpo"+nth] = pmData[nth].row_cpo;
    // window["row_cpm"+nth] = pmData[nth].row_cpm;
    // window["row_sp"+nth] = pmData[nth].row_sp;
    // window["choose_payment_option"+nth] = pmData[nth].choose_payment_option;
    // window["choose_payment_method"+nth] = pmData[nth].choose_payment_method;
    // window["cpm_split_option"+nth] = pmData[nth].cpm_split_option;
    // window["add_split_payment"+nth] = pmData[nth].add_split_payment;

//    console.log(pmData[nth]);

    // Choose Payment Option Engine
    pmData[nth].choose_payment_option.addEventListener('change', function (e) {
        //e.preventDefault();
        let selected = this.options[this.selectedIndex].value;
//      console.log({selected: selected, this: this});
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

        // window["row_cpo"+nth] = pmData[nth].row_cpo;
        // window["row_cpm"+nth] = pmData[nth].row_cpm;
        // window["row_sp"+nth] = pmData[nth].row_sp;
        // window["choose_payment_option"+nth] = pmData[nth].choose_payment_option;
        // window["choose_payment_method"+nth] = pmData[nth].choose_payment_method;
        // window["cpm_split_option"+nth] = pmData[nth].cpm_split_option;
        // window["add_split_payment"+nth] = pmData[nth].add_split_payment;

//        console.log(pmData[nth]);

        // Choose Payment Option Engine
        choose_payment_option.addEventListener('change', function (e) {
            e.preventDefault();
            let selected = this.options[this.selectedIndex].value;
//          console.log({selected: selected, this: this});
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
        var set_form_id = document.getElementById('setFormId');
        var order_templates = document.getElementById('order-templates').querySelectorAll('.order-template');
        /*
                  console.log({
                    ot_selected: ot_selected,
                    active_template: active_template,
                    hidden_storage: hidden_storage,
                    selected_form_id: selected_form_id,
                    set_form_id: set_form_id,
                    order_templates: order_templates
                  });
        */
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


        $(".change_common_med").each(function (index) {

            if ($('#medForm' + data_id + ' .change_select').length > 0) {

                $(this).closest('tr').find('.medication_name').hide();
                var s_c = $(this).val().split('|');
                var row = $(this).closest('tr').find('.med' + s_c[0]);
                $(row).show();

            }

            if ($(this).val() == "Custom") {
                $(this).next(".custom_common_med").show();
                $(this).next(".custom_common_med").css("opacity", "1");
                $(this).next(".custom_common_med").css("z-index", "0");
                $(this).next(".custom_common_med").children().css("background", "#e9ffbc");
                $(this).next(".custom_common_med").children().val("");
                $(this).next(".custom_common_med").children().focus();
            }
        });


        $(".change_common_med").on("change", function () {

            if ($('#medForm' + data_id + ' .change_select').length > 0) {

                $('.medication_name').hide();
                var s_c = $(this).val().split('|');
                var row = $(this).closest('tr').find('.med' + s_c[0]);
                $(row).show();

                var row1 = $(this).closest('tr').find('.change_select');
                $(row1).each(function (index) {
                    var m_v = $(this).find('.med' + s_c[0]).eq(0).val();
                    $(this).val(m_v);
                });

            }


            if ($(this).val() == "Custom") {
                $(this).next(".custom_common_med").show();
                $(this).next(".custom_common_med").css("opacity", "1");
                $(this).next(".custom_common_med").css("z-index", "0");
                $(this).next(".custom_common_med").children().css("background", "#e9ffbc");
                $(this).next(".custom_common_med").children().val("");
                $(this).next(".custom_common_med").children().focus();
            } else {
                $(this).next(".custom_common_med").css("opacity", "0");
                $(this).next(".custom_common_med").css("z-index", "-1");
                $(this).next(".custom_common_med").hide();
            }
        });


// On template change
        $('.orderFeeNum').on('change', function () {
            $('.vicoordcom').html(($(this).val() * 15) / 100);
            $('.icoordcom').val(($(this).val() * 15) / 100);
//   console.log(($(this).val() * 15) / 100);
        });

        var tm = 0;
        $(active_template + ' .med_cost_class').each(function (i, obj) {
            var v = $(this).val();
            tm = tm + parseFloat(v) * 1;
        });

// add Alcohol Swabs i� checked
        if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
            tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
        }
// add shipping price  
        tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
        tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

        $('.ctmedcost').html(parseFloat(tm).toFixed(2));
        $('.totmeds').val(parseFloat(tm).toFixed(2));
//  console.log(tm);


// On a Medication price change
        $(".med_cost_class").on("change", function () {

            var tm = 0;
            $('#renew-emr-order-form .med_cost_class').each(function (i, obj) {
                var v = $(this).val();
                tm = tm + parseFloat(v) * 1;
            });

// add Alcohol Swabs is checked
            if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
                tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
            }
// add shipping price  
            tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
            tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

            $('.ctmedcost').html(parseFloat(tm).toFixed(2));
            $('.totmeds').val(parseFloat(tm).toFixed(2));
//   console.log('Change: ' + tm);

        });


// On Alcohol Swabs change
        $('input[name="alcSwabs' + data_id + '"]').on("change", function () {

            var tm = 0;
            $(active_template + ' .med_cost_class').each(function (i, obj) {
                var v = $(this).val();
                tm = tm + parseFloat(v) * 1;
            });

// add Alcohol Swabs is checked
            if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
                tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
            }
// add shipping price  
            tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
            tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

            $('.ctmedcost').html(parseFloat(tm).toFixed(2));
            $('.totmeds').val(parseFloat(tm).toFixed(2));
//   console.log('Alc change: ' + tm);

        });


// On shipping change
        $('#choose-shipping' + data_id).on("change", function () {

            var tm = 0;
            $(active_template + ' .med_cost_class').each(function (i, obj) {
                var v = $(this).val();
                tm = tm + parseFloat(v) * 1;
            });

// add Alcohol Swabs is checked   
            if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
                tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
            }
// add shipping price  
            tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
            tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

            $('.ctmedcost').html(parseFloat(tm).toFixed(2));
            $('.totmeds').val(parseFloat(tm).toFixed(2));
//   console.log('Alc change: ' + tm);

        });


// On order process fee change
        $('#orderprocess-fee' + data_id).on("change", function () {

            var tm = 0;
            $(active_template + ' .med_cost_class').each(function (i, obj) {
                var v = $(this).val();
                tm = tm + parseFloat(v) * 1;
            });

// add Alcohol Swabs is checked   
            if ($('input[name="alcSwabs' + data_id + '"]').is(':checked')) {
                tm = tm + parseFloat($('input[name="alc_cost' + data_id + '"]').val());
            }
// add shipping price  
            tm = tm + parseFloat($('#choose-shipping' + data_id + ' option:selected').data('price'));
// add order process fee
            tm = tm + parseFloat($('#orderprocess-fee' + data_id).val());

            $('.ctmedcost').html(parseFloat(tm).toFixed(2));
            $('.totmeds').val(parseFloat(tm).toFixed(2));
//   console.log('Alc change: ' + tm);

        });


    });
}


// Execute PaymentMethodEngine
if (document.querySelectorAll('.order-template')) {
    document.querySelectorAll('.order-template').forEach((template, index) => {
        let nth = template.getAttribute('data-order-template-id');
        PaymentMethodEngine(nth, pmData, index);
    });
}

function setShippingPrice($this) {
//  console.log({$this: $this.options, se: $this.selectedIndex});
    var shipping_price = $this.options[$this.selectedIndex];
    var price_field = $this.getAttribute('data-shipping-price');
    document.querySelector(price_field).value = shipping_price.getAttribute('data-price');
//  console.log({sp: shipping_price, pf: price_field});
}

// Initiate
$('.choose-shipping').each(function () {
    setShippingPrice(this);
});

function shippingSigReq($this) {
    let status = $this.getAttribute('data-checked');
    if (status === '0') {
        $this.setAttribute('data-checked', '1');
        $this.setAttribute('value', '1');
        $this.setAttribute('checked', 'checked');
    } else {
        $this.setAttribute('data-checked', '0');
        $this.setAttribute('value', '0');
        $this.setAttribute('checked', 'false');
    }
//  console.log({shippingSigReq: status});
}









