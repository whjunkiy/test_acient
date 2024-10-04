var order_templates = document.querySelectorAll('.order-template');
var add_more_buttons = document.querySelectorAll('.btnAddMore');
var selected_pharmacy = '';


function disable_first_shipping(data_id) {
    $('.order-template.active #choose-shipping' + data_id).attr('disabled', true);
    $('.order-template.active #shipping-price' + data_id).addClass('zero');
}

function allowed_second_shipping(selected_form_id) {
    $('.order-template.active #choose-shipping' + selected_form_id).attr('disabled', false);
    $('.order-template.active #shipping-price' + selected_form_id).removeClass('zero');
}

function disable_second_shipping(selected_form_id) {
    $('.order-template.active #choose-shipping' + selected_form_id).attr('disabled', true);
    $('.order-template.active #shipping-price' + selected_form_id).addClass('zero');
}

function allowed_first_shipping(data_id) {
    $('.order-template.active #choose-shipping' + data_id).attr('disabled', false);
    $('.order-template.active #shipping-price' + data_id).removeClass('zero');
}

function disable_third_shipping(selected_form_id_2) {
    $('.order-template.active #choose-shipping' + selected_form_id_2).attr('disabled', true);
    $('.order-template.active #shipping-price' + selected_form_id_2).addClass('zero');
}

function allowed_third_shipping(selected_form_id_2) {
    $('.order-template.active #choose-shipping' + selected_form_id_2).attr('disabled', false);
    $('.order-template.active #shipping-price' + selected_form_id_2).removeClass('zero');
}

function max_shipping(data_id, selected_form_id, selected_form_id_2) {
    // Check for previous template of same pharmacy as this
    let first_pharm = $('#choose-pharmacy').val();
    let second_pharm = $('#choose-pharmacy-add' + data_id).val();
    let third_pharm = $('#choose-pharmacy-add_2_' + data_id).val();
    console.log('First pharmacy: ' + first_pharm + '; second pharmacy: ' + second_pharm + '; third pharmacy: ' + third_pharm);

    let first_shipping = $('#shipping-price' + data_id).val();
    let second_shipping = $('#shipping-price' + selected_form_id).val();
    if (second_shipping === undefined) {
        second_shipping = 0;
    }
    let third_shipping = $('#shipping-price' + selected_form_id_2).val();
    if (third_shipping === undefined) {
        third_shipping = 0;
    }

    if ((first_pharm == second_pharm) && (first_pharm == third_pharm)) {
        if ((first_shipping > 0) && (first_shipping >= second_shipping) && (first_shipping >= third_shipping)) {
            allowed_first_shipping(data_id);
            if (second_shipping > 0) {
                disable_second_shipping(selected_form_id);
            }
            if (third_shipping > 0) {
                disable_third_shipping(selected_form_id_2);
            }
        }
        if ((second_shipping > 0) && (second_shipping > first_shipping) && (second_shipping >= third_shipping)) {
            allowed_second_shipping(selected_form_id);
            if (first_shipping > 0) {
                disable_first_shipping(data_id);
            }
            if (third_shipping > 0) {
                disable_third_shipping(selected_form_id_2);
            }
        }
        if ((third_shipping > 0) && (third_shipping > first_shipping) && (third_shipping > second_shipping)) {
            allowed_third_shipping(selected_form_id_2);
            if (first_shipping > 0) {
                disable_first_shipping(data_id);
            }
            if (second_shipping > 0) {
                disable_second_shipping(selected_form_id);
            }
        }
    }

    if ((first_pharm == second_pharm) && !(first_pharm == third_pharm)) {
        if ((first_shipping > 0) && (first_shipping >= second_shipping)) {
            if (second_shipping > 0) {
                disable_second_shipping(selected_form_id);
            }
            allowed_first_shipping(data_id);
        }
        if ((second_shipping > 0) && (second_shipping > first_shipping)) {
            if (first_shipping > 0) {
                disable_first_shipping(data_id);
            }
            allowed_second_shipping(selected_form_id);
        }
        allowed_third_shipping(selected_form_id_2);
    }

    if ((first_pharm == third_pharm) && !(first_pharm == second_pharm)) {
        if ((first_shipping > 0) && (first_shipping >= third_shipping)) {
            if (third_shipping > 0) {
                disable_third_shipping(selected_form_id_2);
            }
            allowed_first_shipping(data_id);
        }
        if ((third_shipping > 0) && (third_shipping > first_shipping)) {
            if (first_shipping > 0) {
                disable_first_shipping(data_id);
            }
            allowed_third_shipping(selected_form_id_2);
        }
        allowed_second_shipping(selected_form_id);
    }

    if ((second_pharm == third_pharm) && !(second_pharm == first_pharm)) {
        if ((second_shipping > 0) && (second_shipping >= third_shipping)) {
            if (third_shipping > 0) {
                disable_third_shipping(selected_form_id_2);
            }
            allowed_second_shipping(selected_form_id);
        }
        if ((third_shipping > 0) && (third_shipping >= second_shipping)) {
            if (second_shipping > 0) {
                disable_second_shipping(selected_form_id);
            }
            allowed_third_shipping(selected_form_id_2);
        }
        allowed_first_shipping(data_id);
    }

    console.log('First shipping price: ' + first_shipping + '; second shipping price: ' + second_shipping + '; third shipping price: ' + third_shipping);

}


function allowed_first_swabs(data_id) {
    $('input[name="alcSwabs' + data_id + '"]').prop('disabled', false);
    $('input[name="alcSwabs' + data_id + '"]').prop('checked', true);
    $('input[name="alcSwabs' + data_id + '"]').val(1);
    $('input[name="alcSwabsAm' + data_id + '"]').prop('disabled', false);
    $('input[name="alcSwabsAm' + data_id + '"]').val(1);
    $('input[name="alc_cost' + data_id + '"]').prop('disabled', false);
//    $('input[name="alc_cost' + data_id + '"]').val(2);
}

function disabled_first_swabs(data_id) {
    $('input[name="alcSwabs' + data_id + '"]').prop('disabled', true);
    $('input[name="alcSwabs' + data_id + '"]').prop('checked', false);
    $('input[name="alcSwabs' + data_id + '"]').val(0);
    $('input[name="alcSwabsAm' + data_id + '"]').prop('disabled', true);
    $('input[name="alcSwabsAm' + data_id + '"]').val(0);
    $('input[name="alc_cost' + data_id + '"]').prop('disabled', true);
    $('input[name="alc_cost' + data_id + '"]').val(0);
}

function disabled_second_swabs(selected_form_id) {
    $('input[name="alcSwabs' + selected_form_id + '"]').prop('disabled', true);
    $('input[name="alcSwabs' + selected_form_id + '"]').prop('checked', false);
    $('input[name="alcSwabs' + selected_form_id + '"]').val(0);
    $('input[name="alcSwabsAm' + selected_form_id + '"]').prop('disabled', true);
    $('input[name="alcSwabsAm' + selected_form_id + '"]').val(0);
    $('input[name="alc_cost' + selected_form_id + '"]').prop('disabled', true);
    $('input[name="alc_cost' + selected_form_id + '"]').val(0);
}

function allowed_second_swabs(selected_form_id) {
    $('input[name="alcSwabs' + selected_form_id + '"]').prop('disabled', false);
    $('input[name="alcSwabs' + selected_form_id + '"]').prop('checked', true);
    $('input[name="alcSwabs' + selected_form_id + '"]').val(1);
    $('input[name="alcSwabsAm' + selected_form_id + '"]').prop('disabled', false);
    $('input[name="alcSwabsAm' + selected_form_id + '"]').val(1);
    $('input[name="alc_cost' + selected_form_id + '"]').prop('disabled', false);
//    $('input[name="alc_cost' + selected_form_id + '"]').val(2);
}

function disabled_third_swabs(selected_form_id_2) {
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').prop('disabled', true);
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').prop('checked', false);
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').val(0);
    $('input[name="alcSwabsAm' + selected_form_id_2 + '"]').prop('disabled', true);
    $('input[name="alcSwabsAm' + selected_form_id_2 + '"]').val(0);
    $('input[name="alc_cost' + selected_form_id_2 + '"]').prop('disabled', true);
    $('input[name="alc_cost' + selected_form_id_2 + '"]').val(0);
}

function allowed_third_swabs(selected_form_id_2) {
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').prop('disabled', false);
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').prop('checked', true);
    $('input[name="alcSwabs' + selected_form_id_2 + '"]').val(1);
    $('input[name="alcSwabsAm' + selected_form_id_2 + '"]').prop('disabled', false);
    $('input[name="alcSwabsAm' + selected_form_id_2 + '"]').val(1);
    $('input[name="alc_cost' + selected_form_id_2 + '"]').prop('disabled', false);
//    $('input[name="alc_cost' + selected_form_id_2 + '"]').val(2);
}

function control_swabs(data_id, selected_form_id, selected_form_id_2) {
    let first_pharm = $('#choose-pharmacy').val();
    let second_pharm = $('#choose-pharmacy-add' + data_id).val();
    let third_pharm = $('#choose-pharmacy-add_2_' + data_id).val();

    if (((first_pharm == 'Elevation') && (second_pharm == 'Elevation') && (third_pharm == 'Elevation')) || !(first_pharm == 'Elevation')) {
        allowed_first_swabs(data_id);
        disabled_second_swabs(selected_form_id);
        disabled_third_swabs(selected_form_id_2);
    }
    if ((first_pharm == 'Elevation') && !(second_pharm == 'none') && !(second_pharm == 'Elevation')) {
        disabled_first_swabs(data_id);
        allowed_second_swabs(selected_form_id);
        disabled_third_swabs(selected_form_id_2);
    }
    if ((first_pharm == 'Elevation') && (second_pharm == 'Elevation') && !(third_pharm == 'none') && !(third_pharm == 'Elevation')) {
        disabled_first_swabs(data_id);
        disabled_second_swabs(selected_form_id);
        allowed_third_swabs(selected_form_id_2);
    }

    if ((first_pharm == 'Elevation') && (second_pharm == 'Elevation') && (third_pharm == 'none')) {
        allowed_first_swabs(data_id);
        disabled_second_swabs(selected_form_id);
    }


    console.log('First pharmacy swabs: ' + first_pharm + '; second pharmacy: ' + second_pharm + '; third pharmacy: ' + third_pharm);

}


function total_fee() {
    let alert = '';
    let fee = $('#renew-emr-order-form .orderFeeNum').eq(0).val() * 1;
    if (!($('textarea[name="order_notes' + $('#setFormId').val() + '"]').val() == '')) {
        alert = $('textarea[name="order_notes' + $('#setFormId').val() + '"]').val() + '; ';
    }
    let multiorder = 0;
    if ($('#renew-emr-order-form .orderFeeNum').eq(1).length > 0) {
        fee = fee + $('#renew-emr-order-form .orderFeeNum').eq(1).val() * 1;
        if (!($('textarea[name="order_notes' + $('#setFormId_add').val() + '"]').val() == '')) {
            alert = alert + $('textarea[name="order_notes' + $('#setFormId_add').val() + '"]').val() + '; ';
        }
        multiorder = 1;
    }
    if ($('#renew-emr-order-form .orderFeeNum').eq(2).length > 0) {
        fee = fee + $('#renew-emr-order-form .orderFeeNum').eq(2).val() * 1;
        if (!($('textarea[name="order_notes' + $('#setFormId_add_2').val() + '"]').val() == '')) {
            alert = alert + $('textarea[name="order_notes' + $('#setFormId_add_2').val() + '"]').val() + '; ';
        }
        multiorder = 1;
    }
    $('#all_total_fee').html(parseFloat(fee).toFixed(2));

    let tm = 0;
    let tm2 = 0;
    let tm3 = 0;

    let tm1 = $('#suborder_pharmacy' + $('#setFormId').val()).val() * 1;
    if ($('#suborder_pharmacy' + $('#setFormId_add').val()).val() > 0) {
        tm2 = $('#suborder_pharmacy' + $('#setFormId_add').val()).val() * 1;
    }
    if ($('#suborder_pharmacy' + $('#setFormId_add_2').val()).val() > 0) {
        tm3 = $('#suborder_pharmacy' + $('#setFormId_add_2').val()).val() * 1;
    }
    tm = tm1 + tm2 + tm3;
    $('#all_total_pharmacy').html(parseFloat(tm).toFixed(2));

    if (!(alert == '')) {
        $('#all_total_alert').html('ALERT: ' + alert);
    } else {
        $('#all_total_alert').html('');
    }

    return multiorder;
}

function safari_options_init(s_c, el) {
    let selected_val = $(el).closest('tr').find('.change_med_amount').val();
    let h_amount = $(el).closest('tr').find('.hidden_amount');
    $(h_amount).html('');
    $(h_amount).append($(el).closest('tr').find('.change_med_amount .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_amount').val(selected_val);

    selected_val = $(el).closest('tr').find('.change_med_unit').val();
    let h_unit = $(el).closest('tr').find('.hidden_unit');
    $(h_unit).html('');
    $(h_unit).append($(el).closest('tr').find('.change_med_unit .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_unit').val(selected_val);

    selected_val = $(el).closest('tr').find('.change_med_route').val();
    let h_route = $(el).closest('tr').find('.hidden_route');
    $(h_route).html('');
    $(h_route).append($(el).closest('tr').find('.change_med_route .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_route').val(selected_val);

    selected_val = $(el).closest('tr').find('.change_med_freq').val();
    let h_freq = $(el).closest('tr').find('.hidden_freq');
    $(h_freq).html('');
    $(h_freq).append($(el).closest('tr').find('.change_med_freq .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_freq').val(selected_val);

    selected_val = $(el).closest('tr').find('.change_med_disp').val();
    let h_disp = $(el).closest('tr').find('.hidden_disp');
    $(h_disp).html('');
    $(h_disp).append($(el).closest('tr').find('.change_med_disp .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_disp').val(selected_val);

    selected_val = $(el).closest('tr').find('.change_med_disp_unit').val();
    let h_disp_unit = $(el).closest('tr').find('.hidden_disp_unit');
    $(h_disp_unit).html('');
    $(h_disp_unit).append($(el).closest('tr').find('.change_med_disp_unit .medication_name').not('.med' + s_c[0]));
    $(el).closest('tr').find('.change_med_disp_unit').val(selected_val);
}


function safari_options_after_change(s_c, el) {
    let h_amount = $(el).closest('tr').find('.hidden_amount');
    $(h_amount).append($(el).closest('tr').find('.change_med_amount .medication_name'));
    $(el).closest('tr').find('.change_med_amount').append($(h_amount).find('.med' + s_c[0]));

    let h_unit = $(el).closest('tr').find('.hidden_unit');
    $(h_unit).append($(el).closest('tr').find('.change_med_unit .medication_name'));
    $(el).closest('tr').find('.change_med_unit').append($(h_unit).find('.med' + s_c[0]));

    let h_route = $(el).closest('tr').find('.hidden_route');
    $(h_route).append($(el).closest('tr').find('.change_med_route .medication_name'));
    $(el).closest('tr').find('.change_med_route').append($(h_route).find('.med' + s_c[0]));

    let h_freq = $(el).closest('tr').find('.hidden_freq');
    $(h_freq).append($(el).closest('tr').find('.change_med_freq .medication_name'));
    $(el).closest('tr').find('.change_med_freq').append($(h_freq).find('.med' + s_c[0]));

    let h_disp = $(el).closest('tr').find('.hidden_disp');
    $(h_disp).append($(el).closest('tr').find('.change_med_disp .medication_name'));
    $(el).closest('tr').find('.change_med_disp').append($(h_disp).find('.med' + s_c[0]));

    let h_disp_unit = $(el).closest('tr').find('.hidden_disp_unit');
    $(h_disp_unit).append($(el).closest('tr').find('.change_med_disp_unit .medication_name'));
    $(el).closest('tr').find('.change_med_disp_unit').append($(h_disp_unit).find('.med' + s_c[0]));


}


function doctor_license_in_patient_state() {
    let patient_state = $('#sstate').val();
    let patient_location = $('#patient_location').val();
    let doctor_name = $("input[name='physician_order']:checked").val().split('|');
    let ret = '';

//console.log('doctor_name=' + doctor_name[0] + '; patient_state=' + patient_state + '; location=' + patient_location);

    $.ajax({
        url: "/ajax/get_doctors_license.php",
        async: false,
        type: "POST",
        dataType: "json",
        data: {'doctor_name': doctor_name[0], 'patient_state': patient_state, 'location': patient_location},
        success: function (d) {
            if (d.status) {

//                console.log('d.result: ' + JSON.stringify(d.result));

                if (!(d.result === null)) {
                    ret = d.result;
                }
            }
        },
        error: function (d) {
            console.log('error: ' + d.status);
        }
    });
    return ret;
}


function encounter_medication(en_medication_id, plan_id, plan_generic, plan_name) {
    let pid = $('#patientid').val();
    let patient_location = $('#patient_location').val();
    let ret = '';
    $.ajax({
        url: "/ajax/get_medication_options_from_patient_encounter.php",
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            'patient_id': pid,
            'medication_id': en_medication_id,
            'location': patient_location,
            'plan_id': plan_id,
            'plan_generic': plan_generic,
            'plan_name': plan_name
        },
        success: function (d) {
            if (d.status) {

                console.log('d.result: ' + JSON.stringify(d.result));
                console.log('test: ' + d.test);

                if (!(d.result === null)) {
                    ret = d.result.amount + '|' + d.result.unit + '|' + d.result.route + '|' + d.result.freq + '|' + d.result.plan_type;
                }
            }
        },
        error: function (d) {
            console.log('error: ' + d.status);
        }
    });
    return ret;
}


function encounter_medication_options(s, p, el, g, n) {
// Set medication options by encounters parameters
    let option_value = encounter_medication(s, p, g, n);
    if (!(option_value == '')) {
        option_value_parts = option_value.split('|');
        console.log('Function return: ' + option_value + ' medication_id: ' + s);

        let encounter_options = $(el).closest('tr').find('.change_med_amount');
        $(encounter_options).val(option_value_parts[0]);
        $(encounter_options).css('pointer-events', 'none');
        $(encounter_options).attr('tabindex', '-1');
        $(encounter_options).attr('disabled', false);
        encounter_options = $(el).closest('tr').find('.change_med_unit');
        $(encounter_options).val(option_value_parts[1]);
        $(encounter_options).css('pointer-events', 'none');
        $(encounter_options).attr('tabindex', '-1');
        $(encounter_options).attr('disabled', false);
        encounter_options = $(el).closest('tr').find('.change_med_route');
        $(encounter_options).val(option_value_parts[2]);
        $(encounter_options).css('pointer-events', 'none');
        $(encounter_options).attr('tabindex', '-1');
        $(encounter_options).attr('disabled', false);
        encounter_options = $(el).closest('tr').find('.change_med_freq');
        $(encounter_options).val(option_value_parts[3]);
        $(encounter_options).css('pointer-events', 'none');
        $(encounter_options).attr('tabindex', '-1');
        $(encounter_options).attr('disabled', false);


        encounter_options = $(el).closest('tr').find('.change_common_med');
        $(encounter_options).attr('disabled', false);
        encounter_options = $(el).closest('tr').find('.change_select');
        $(encounter_options).attr('disabled', false);

        encounter_options = $(el).closest('tr').find('.med_cost_class');
        $(encounter_options).attr('disabled', false);

        $(el).closest('tr').find('.warning').remove();


    } else {
        let encounter_options = $(el).closest('tr').find('.change_select');
        $(encounter_options).css('pointer-events', 'all');
        $(encounter_options).removeAttr('tabindex');
    }
}


function recalculate_med_price() {
    let tm = 0;

    /*
        $('.order-template.active .med_cost_class').each(function (i, obj) {
            var v = $(this).val().trim();
            if (!(v > 0)) {
                v = 0;
            }
            tm = tm + parseFloat(v) * 1;
        });
    */
    let tm1 = 0;
    let tm2 = 0;
    let tm3 = 0;

    $('#medForm' + $('#setFormId').val() + ' .med_cost_class').each(function (i, obj) {
        var v = $(this).val().trim();
        if (!(v > 0)) {
            v = 0;
        }
        tm1 = tm1 + parseFloat(v) * 1;
    });
    if ($('#setFormId_add').val() > 0) {
        $('#medForm' + $('#setFormId_add').val() + ' .med_cost_class').each(function (i, obj) {
            var v = $(this).val().trim();
            if (!(v > 0)) {
                v = 0;
            }
            tm2 = tm2 + parseFloat(v) * 1;
        });
    }
    if ($('#setFormId_add_2').val() > 0) {

        $('#medForm' + $('#setFormId_add_2').val() + ' .med_cost_class').each(function (i, obj) {
            var v = $(this).val().trim();
            if (!(v > 0)) {
                v = 0;
            }
            tm3 = tm3 + parseFloat(v) * 1;
        });
    }


// add shipping price
    tm1 = tm1 + parseFloat($('#shipping-price' + $('#setFormId').val()).val());

    if ($('#setFormId_add').val() > 0) {
        tm2 = tm2 + parseFloat($('#shipping-price' + $('#setFormId_add').val()).val());
    }
    if ($('#setFormId_add_2').val() > 0) {
        tm3 = tm3 + parseFloat($('#shipping-price' + $('#setFormId_add_2').val()).val());
    }


// Control shipping options for multitemplates
    max_shipping($('#setFormId').val(), $('#setFormId_add').val(), $('#setFormId_add_2').val());

//Alcohol Swabs logic
    control_swabs($('#setFormId').val(), $('#setFormId_add').val(), $('#setFormId_add_2').val());


// add Alcohol Swabs are checked and add shipping prices
    if ($('input[name="alcSwabs' + $('#setFormId').val() + '"]').is(':checked')) {
        tm1 = tm1 + parseFloat($('input[name="alc_cost' + $('#setFormId').val() + '"]').val());
    }
    if ($('#setFormId_add').val() > 0) {
        if ($('input[name="alcSwabs' + $('#setFormId_add').val() + '"]').is(':checked')) {
            tm2 = tm2 + parseFloat($('input[name="alc_cost' + $('#setFormId_add').val() + '"]').val());
        }
    }
    if ($('#setFormId_add_2').val() > 0) {
        if ($('input[name="alcSwabs' + $('#setFormId_add_2').val() + '"]').is(':checked')) {
            tm3 = tm3 + parseFloat($('input[name="alc_cost' + $('#setFormId_add_2').val() + '"]').val());
        }
    }


// add order process fee
    tm1 = tm1 + parseFloat($('#orderprocess-fee' + $('#setFormId').val()).val());

    $('#suborder_pharmacy' + $('#setFormId').val()).val(tm1);
    $('#csuborder_pharmacy' + $('#setFormId').val()).html(parseFloat(tm1).toFixed(2));
    if ($('#setFormId_add').val() > 0) {
        $('#suborder_pharmacy' + $('#setFormId_add').val()).val(tm2);
        $('#csuborder_pharmacy' + $('#setFormId_add').val()).html(parseFloat(tm2).toFixed(2));
    }
    if ($('#setFormId_add_2').val() > 0) {
        $('#suborder_pharmacy' + $('#setFormId_add_2').val()).val(tm3);
        $('#csuborder_pharmacy' + $('#setFormId_add_2').val()).html(parseFloat(tm3).toFixed(2));
    }

    console.log('tm1 = ' + tm1 + '; tm2 = ' + tm2 + '; tm3 = ' + tm3);
    /*
        $('.ctmedcost').html(parseFloat(tm).toFixed(2));
        $('.totmeds').val(parseFloat(tm).toFixed(2));
    */


}

function deleteThisRow() {

    event.target.classList.toggle('clicked');

    let parentNode = event.target.parentNode.parentNode.parentNode
    let children = parentNode.childNodes;

    let notDisabledTrCount = 0;
    let disabledTrCount = 0;
    let trCount = 0
    for (let i = 0; i < children.length; i++) {
        if (children[i].nodeName === 'TR' && !children[i].hasAttribute('disabled')) {
            notDisabledTrCount++;
        }
        if (children[i].nodeName === 'TR' && children[i].hasAttribute('disabled')) {
            disabledTrCount++;
        }
        if (children[i].nodeName === 'TR') {
            trCount++;
        }
    }

    if (trCount > 1) {
        if (event.target.closest('tr').hasAttribute('disabled') || !event.target.closest('tr').hasAttribute('disabled') && notDisabledTrCount > 1) {
            let newtotmeds = $('.totmeds').val() - event.target.previousElementSibling.value;
            $('.totmeds').val(parseFloat(newtotmeds).toFixed(2));
            $('.ctmedcost').html(parseFloat(newtotmeds).toFixed(2));
            console.log('delete med: ' + newtotmeds);

            parentNode.removeChild(event.target.parentNode.parentNode);
            recalculate_med_price();
        }
    }

}

function addMedRow() {
    let data_id = event.target.getAttribute('data-id');
    let med_form = document.getElementById('medForm' + data_id);
    let last_row = med_form.querySelector('tr:not([disabled])');

    if (last_row) {
        let clone = last_row.cloneNode(true);
        med_form.querySelector('tbody').appendChild(clone);
    } else {
        let blocked_row = med_form.querySelector('tr');
        let clone = blocked_row.cloneNode(true);

        let clonedElement = $(clone);
        clonedElement.attr('disabled', false);

        let clonedSelect = clonedElement.find('.change_common_med');
        let firstEnabledOption = clonedSelect.find('option:not(:disabled)').first();

        if (firstEnabledOption.length) {
            clonedSelect.removeAttr('disabled');
            clonedSelect.val(firstEnabledOption.val());

            let medication_options = clonedElement.find('.change_select');
            let medication_cost = clonedElement.find('.med_cost_class');
            let medication_warnings = clonedElement.find('.warning');

            $(medication_options).attr('disabled', false);
            $(medication_cost).attr('disabled', false);
            $(medication_warnings).remove()
        }

        med_form.querySelector('tbody').appendChild(clone);
    }

    var last_row1 = $('#medForm' + data_id).find('tr').last();
    var row = $(last_row1).find('.change_common_med');
    var s_c = $(row).val().split('|');

    let selected_shipping_val = $('#choose-shipping' + data_id).val();
    let hidden_shipping = $('.hidden-shipping' + data_id);
    $(hidden_shipping).append($('#choose-shipping' + data_id + ' .shipping'));
    if (s_c[5] == 1) {
        $('#choose-shipping' + data_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));
        var с = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
        var d = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

        $('.order-template.active #choose-shipping' + data_id).val(с);
        $('.order-template.active #shipping-price' + data_id).val(d);
    } else {
        $('#choose-shipping' + data_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
    }
    $('#choose-shipping' + data_id).val(selected_shipping_val);


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

//            $(this).closest('tr').find('.medication_name').hide();

            var s_c = $(this).val().trim().split('|');

            let selected_shipping_val = $('#choose-shipping' + data_id).val();
            let hidden_shipping = $('.hidden-shipping' + data_id);
            $(hidden_shipping).append($('#choose-shipping' + data_id + ' .shipping'));
            if (s_c[5] == 1) {
                $('#choose-shipping' + data_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                var с = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                var d = $('.order-template.active #choose-shipping' + data_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                $('.order-template.active #choose-shipping' + data_id).val(с);
                $('.order-template.active #shipping-price' + data_id).val(d);
            } else {
                $('#choose-shipping' + data_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
            }
            $('#choose-shipping' + data_id).val(selected_shipping_val);


            var row = $(this).closest('tr').find('.med' + s_c[0]);
//            $(row).show();

            safari_options_after_change(s_c, $(this));

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

            encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

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
//            $(this).closest('tr').find('.medication_name').hide();
            var s_c = $(this).val().trim().split('|');

            if (s_c[5] == 1) {
                is_cold = 1;
            }

            let row = $(this).closest('tr').find('.med' + s_c[0]);
//            $(row).show();

            safari_options_init(s_c, $(this));

            var row1 = $(this).closest('tr').find('.change_select');
            $(row1).each(function () {
                var m_v = $(this).find('.med' + s_c[0]).eq(0).val();

                var row2 = $(this).find('.med' + s_c[0]);
                var numItems = $(row2).length;

                if (numItems == 2) {
                    var m_v = $(this).find('.med' + s_c[0]).eq(1).val();
                }
// Not select single option because of template rule
//                $(this).val(m_v);
            });

            encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

            recalculate_med_price();
        });


        let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
        let hidden_shipping = $('.hidden-shipping' + selected_form_id);
        $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
        if (is_cold == 1) {
            $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

            var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
            var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

            $('.order-template.active #choose-shipping' + selected_form_id).val(с);
            $('.order-template.active #shipping-price' + selected_form_id).val(d);
        } else {
            $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
        }
        $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


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
                let n_val = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price');
                let n_val1 = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price2');
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

//            $(this).closest('tr').find('.medication_name').hide();
            var s_c = $(this).val().trim().split('|');

            let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
            let hidden_shipping = $('.hidden-shipping' + selected_form_id);
            $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
            if (s_c[5] == 1) {
                $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                $('.order-template.active #choose-shipping' + selected_form_id).val(с);
                $('.order-template.active #shipping-price' + selected_form_id).val(d);
            } else {
                $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
            }
            $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


            var row = $(this).closest('tr').find('.med' + s_c[0]);
//            $(row).show();

            safari_options_after_change(s_c, $(this));


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
                let n_val = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price');
                let n_val1 = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price2');
                $(row_price).val(parseFloat(n_val).toFixed(2));
                $(row_price2).val(parseFloat(n_val1).toFixed(2));
            }


            $(row_price2).prop('type', 'hidden');
            if ($(row_disp).val() == 'Open') {
//                $(row_price).prop('type', 'number');
            }

            encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

            recalculate_med_price();

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


        let hidden_order_templates = $('.hidden-order-templates' + data_id);
        $(hidden_order_templates).append($('#select-order-template-add' + data_id + ' .pharm'));

        $('#choose-pharmacy-add' + data_id).on("change", function () {
            hidden_order_templates = $('.hidden-order-templates' + data_id);
            $(hidden_order_templates).append($('#select-order-template-add' + data_id + ' .pharm'));
            if ($(this).val() == 'none') {
                $('#select-order-template-add' + data_id).append('<option value="none" class="none" data-pharmacy="none">Please Choose an Order Template');
            } else {
                $('#select-order-template-add' + data_id + ' .none').remove();
            }
            $('#select-order-template-add' + data_id).val($(this).val().trim())
            $('#select-order-template-add' + data_id).append($(hidden_order_templates).find('.' + $('.ph2').not('.data_skip').val()));
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

            if (total_fee() == 1) {
                $('#all_total_order_fee').show();
            } else {
                $('#all_total_order_fee').hide();
            }

        });


        hidden_order_templates = $('.hidden-order-templates_2' + data_id);
        $(hidden_order_templates).append($('#select-order-template-add_2_' + data_id + ' .pharm'));

        $('#choose-pharmacy-add_2_' + data_id).on("change", function () {

            hidden_order_templates = $('.hidden-order-templates_2' + data_id);
            $(hidden_order_templates).append($('#select-order-template-add_2_' + data_id + ' .pharm'));
            $('#select-order-template-add_2_' + data_id + ' .none').remove();
            if ($(this).val() == 'none') {
                $('#select-order-template-add_2_' + data_id).append('<option value="none" class="none" data-pharmacy="none">Please Choose an Order Template');
            } else {
                $('#select-order-template-add_2_' + data_id + ' .none').remove();
            }
            $('#select-order-template-add_2_' + data_id).val($(this).val().trim())
            $('#select-order-template-add_2_' + data_id).append($(hidden_order_templates).find('.' + $('.ph3').not('.data_skip').val()));
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


        $('#choose-pharmacy').on('change', function () {
            console.log('selected pharmacy: ' + $('#choose-pharmacy').val());
            $('#all_total_order_fee').hide();
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


//                $('#order-templates' + data_id + ' #orderFee').remove();
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

//                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if (s_c[5] == 1) {
                        is_cold = 1;
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
//                    $(row).show();

                    safari_options_init(s_c, $(this));

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

                    encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

                    recalculate_med_price();
                });


                let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
                let hidden_shipping = $('.hidden-shipping' + selected_form_id);
                $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
                if (is_cold == 1) {
                    $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                    $('.order-template.active #choose-shipping' + selected_form_id).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id).val(d);
                } else {
                    $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
                }
                $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


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
                        let n_val = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price');
                        let n_val1 = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price2');
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


                $(".change_common_med").on("change", function () {


//                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');


                    let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
                    let hidden_shipping = $('.hidden-shipping' + selected_form_id);
                    $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
                    if (s_c[5] == 1) {
                        $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                        var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                        var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                        $('.order-template.active #choose-shipping' + selected_form_id).val(с);
                        $('.order-template.active #shipping-price' + selected_form_id).val(d);
                    } else {
                        $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
                    }
                    $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


                    var row = $(this).closest('tr').find('.med' + s_c[0]);
//                    $(row).show();

                    safari_options_after_change(s_c, $(this));

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
                        let n_val = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price');
                        let n_val1 = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price2');
                        $(row_price).val(parseFloat(n_val).toFixed(2));
                        $(row_price2).val(parseFloat(n_val1).toFixed(2));
                    }


                    $(row_price2).prop('type', 'hidden');
                    if ($(row_disp).val() == 'Open') {
//                        $(row_price).prop('type', 'number');
                    }

                    encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

                    recalculate_med_price();

                });


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


                if (total_fee() == 1) {
                    $('#all_total_order_fee').show();
                } else {
                    $('#all_total_order_fee').hide();
                }

                // On template change
                $('.orderFeeNum').on('change', function () {
                    if (total_fee() == 1) {
                        $('#all_total_order_fee').show();
                    } else {
                        $('#all_total_order_fee').hide();
                    }
                });
                $('.order_note').on('change', function () {
                    if (total_fee() == 1) {
                        $('#all_total_order_fee').show();
                    } else {
                        $('#all_total_order_fee').hide();
                    }
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


//                $('#order-templates_2_' + selected_form_id + ' #orderFee').remove();
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

//                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');

                    if (s_c[5] == 1) {
                        is_cold = 1;
                    }

                    var row = $(this).closest('tr').find('.med' + s_c[0]);
//                    $(row).show();

                    safari_options_init(s_c, $(this));

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

                    encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

                    recalculate_med_price();
                });


                let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
                let hidden_shipping = $('.hidden-shipping' + selected_form_id);
                $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
                if (is_cold == 1) {
                    $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                    var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                    var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                    $('.order-template.active #choose-shipping' + selected_form_id).val(с);
                    $('.order-template.active #shipping-price' + selected_form_id).val(d);
                } else {
                    $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
                }
                $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


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
                        let n_val = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price');
                        let n_val1 = $(this).find('option[value="' + $(this).val().trim() + '"].med' + s_c[0]).data('price2');
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


                $(".change_common_med").on("change", function () {


//                    $(this).closest('tr').find('.medication_name').hide();
                    var s_c = $(this).val().trim().split('|');


                    let selected_shipping_val = $('#choose-shipping' + selected_form_id).val();
                    let hidden_shipping = $('.hidden-shipping' + selected_form_id);
                    $(hidden_shipping).append($('#choose-shipping' + selected_form_id + ' .shipping'));
                    if (s_c[5] == 1) {
                        $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy + '.cold'));

                        var с = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).val();
                        var d = $('.order-template.active #choose-shipping' + selected_form_id + ' .ph-' + selected_pharmacy + '.cold').eq(0).data('price');

                        $('.order-template.active #choose-shipping' + selected_form_id).val(с);
                        $('.order-template.active #shipping-price' + selected_form_id).val(d);
                    } else {
                        $('#choose-shipping' + selected_form_id).append($(hidden_shipping).find('.ph-' + selected_pharmacy));
                    }
                    $('#choose-shipping' + selected_form_id).val(selected_shipping_val);


                    var row = $(this).closest('tr').find('.med' + s_c[0]);
//                    $(row).show();

                    safari_options_after_change(s_c, $(this));

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
                        let n_val = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price');
                        let n_val1 = $(row_disp).find('option[value="' + $(row_disp).val() + '"]').data('price2');
                        $(row_price).val(parseFloat(n_val).toFixed(2));
                        $(row_price2).val(parseFloat(n_val1).toFixed(2));
                    }


                    $(row_price2).prop('type', 'hidden');
                    if ($(row_disp).val() == 'Open') {
//                        $(row_price).prop('type', 'number');
                    }

                    encounter_medication_options(s_c[0], s_c[6], $(this), s_c[7], s_c[8]);

                    recalculate_med_price();

                });


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


                if (total_fee() == 1) {
                    $('#all_total_order_fee').show();
                } else {
                    $('#all_total_order_fee').hide();
                }

                // On template change
                $('.orderFeeNum').on('change', function () {
                    if (total_fee() == 1) {
                        $('#all_total_order_fee').show();
                    } else {
                        $('#all_total_order_fee').hide();
                    }
                });
                $('.order_note').on('change', function () {
                    if (total_fee() == 1) {
                        $('#all_total_order_fee').show();
                    } else {
                        $('#all_total_order_fee').hide();
                    }
                });


            });
        }


    });
}


$('#sstate_doctor').html(doctor_license_in_patient_state());


$('input[name="physician_order"]').on('change', function () {
    $('#sstate_doctor').html('Searching for the doctor license states ...');
    $('#sstate_doctor').html(doctor_license_in_patient_state());
});


$('#renew-emr-order-form').on('submit', function () {


    if ($('.ship_state').val() == '') {

        if (!($("#renew-emr-order-form input[type=submit]:focus").val() == 'Save as a Proposal')) {
            alert('Select Patient Shipping State please!');
            $('.ship_state').focus();
            return false;
        }
    }


    $('#renew-emr-order-form .shipping-price.zero').each(function () {
        $(this).val(0);
    });


    if ($('#renew-emr-order-form .warning').length > 0) {
        alert('Please deleter medications not approved by the Practitioner.');
        return false;
    }


    let zero_price = 0;
    let zero_string = '';
    $('#renew-emr-order-form .med_cost_class').each(function () {
        if ($(this).val().trim() == '' || $(this).val().trim() == '0' || $(this).val().trim() == '0.00') {
            zero_price = 1;

            let x = $(this).closest('tr').find('.change_common_med').val().split('|');
            let y = x[1];
            y = y.replace("_", " ");

            zero_string = zero_string + y + ';';

            console.log(y);
        }
    });

    if (zero_price == 1) {
        alert('You have zero price in order: ' + zero_string);
        return false;
    }


    var blank_value = 0;
    $('#renew-emr-order-form .change_select').each(function () {

        var s_c = $(this).closest('tr').find('.change_common_med').val().split('|');
        var row2 = $(this).find('.med' + s_c[0]);
        var numItems = $(row2).length;

        if (numItems > 1) {
            if ($(this).val() == '') {
                blank_value = 1;
            }
        }

    });


// Control min fee for templates
    var m1 = $('#orderFeeNum' + $('#setFormId').val()).val() * 1;
    var s1 = $('#orderFeeNumMin' + $('#setFormId').val()).val() * 1;
    var m2 = $('#orderFeeNum' + $('#setFormId_add').val()).val() * 1;
    var s2 = $('#orderFeeNumMin' + $('#setFormId_add').val()).val() * 1;
    var m3 = $('#orderFeeNum' + $('#setFormId_add_2').val()).val() * 1;
    var s3 = $('#orderFeeNumMin' + $('#setFormId_add_2').val()).val() * 1;

    var tn1 = $('#renew-emr-order-form #select-order-template option:selected').text();
    var tn2 = $('#renew-emr-order-form #select-order-template-add' + $('#setFormId').val() + ' option:selected').text();
    var tn3 = $('#renew-emr-order-form #select-order-template-add_2_' + $('#setFormId').val() + ' option:selected').text();


    if ($('#ilow_fee_price_reason').val() == '') {
        if (m1 < s1) {
            $('select[name="lowfee"]').val('')
            can_pass = confirm(tn1 + "\nAre you sure set Order Fee value: $" + m1 + " ?\nIt's less then minimal value: $" + s1);

            if (can_pass === true) {
                $('#bg_window').show();
                $('#low_fee_reason').show();
                $("html, body").animate({scrollTop: 0}, "slow");
            }
            return false;
        }
    }

// Check for second suborder fee
    if ($('#ilow_fee_price_reason_add').val() == '') {
        if ($('#orderFeeNum' + $('#setFormId').val()).length > 0) {
            if (m2 < s2) {
                $('select[name="lowfee"]').val('')
                can_pass_add = confirm(tn2 + "\nAre you sure set Order Fee value: $" + m2 + " ?\nIt's less then minimal value: $" + s2);

                $('#low_fee_submit').data('templ', '_add');

                if (can_pass_add === true) {
                    $('#bg_window').show();
                    $('#low_fee_reason').show();
                    $("html, body").animate({scrollTop: 0}, "slow");
                    console.log('showen window');
                }
                return false;

            }
        }
    }
// Check for third suborder fee
    if ($('#ilow_fee_price_reason_add_2').val() == '') {
        if ($('#orderFeeNum' + $('#setFormId_add_2').val()).length > 0) {
            if (m3 < s3) {
                $('select[name="lowfee"]').val('')
                can_pass_add_2 = confirm(tn3 + "\nAre you sure set Order Fee value: $" + m3 + " ?\nIt's less then minimal value: $" + s3);

                $('#low_fee_submit').data('templ', '_add_2');

                if (can_pass_add_2 === true) {
                    $('#bg_window').show();
                    $('#low_fee_reason').show();
                    $("html, body").animate({scrollTop: 0}, "slow");
                }
                return false;

            }
        }
    }


    if (blank_value == 1) {
        alert('You must set all medication options!');
        return false;
    } else {
        $('#renew-emr-order-form input[type="submit"].smallBtn').prop('disabled', true);
        $('#renew-emr-order-form input[type="submit"].smallBtn').val('Submiting ...');
    }


});


$('#low_fee_submit').on('click', function () {

    let ntemplate = $('#low_fee_submit').data('templ');

    if ($('select[name="lowfee"]').val() == '') {
        alert('Please, select low fee price reason');
        return false;
    } else {
        $('#bg_window').hide();
        $('#low_fee_reason').hide();
        $('#ilow_fee_price_reason' + ntemplate).val($('select[name="lowfee"]').val());
    }

});


$('.rclose').on('click', function () {
    $('#bg_window').hide();
    $('#low_fee_reason').hide();
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

