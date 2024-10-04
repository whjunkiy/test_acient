$(document).ready(function () {
    function handleApproveClick(type, btnNotEmptyPhysician, bookAppointmentBtnEmptyPhysician) {
        let patientId = $(this).data('patient-id');
        let patientLocation = $(this).data('patient-location');
        let physicianIsEmpty = $(this).data('physician-is-empty');
        let btnContainer = $(`#book-${type}-btn`)
        let formData = {patientId, patientLocation, action: `approve_${type}`};
        let isConfirmed = confirm(`Are you sure you want to authorize a ${type} with this patient?`);

        if (isConfirmed) {
            $.ajax({
                url: '/ajax/patient_profile/approve_reject_patient.php',
                type: 'POST',
                data: formData,
                success: function (response) {
                    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} are authorized with the patient`);
                    $(`#approve-${type}`).hide();
                    $(`#approve-${type}-icon`).addClass('show');
                    physicianIsEmpty ? btnContainer.empty().append(bookAppointmentBtnEmptyPhysician) : btnContainer.empty().append(btnNotEmptyPhysician);
                },
                error: function (e) {
                    e.responseText ? alert(`${e.status} | ${e.responseText}`) : alert(`HTTP Error: ${e.status}`);
                }
            });
        }
    }

    $('#approve-appointments').click(function () {
        handleApproveClick.call(this, 'appointments',
            `<a href="#" style="height: 38px; padding: 12px 10px 20px 10px; background: #dedede;" class="medBtn">Book Appointment<br/><small>(Provider must be assigned)</small></a><br/>`,
            `<a href="apptdate.php?id=${$(this).data('patient-id')}&location=${$(this).data('patient-location')}" class="medBtn">Book Appointment </a><br/>`
        );
    });

    $('#approve-labs').click(function () {
        handleApproveClick.call(this, 'labs',
            `<a href="#" style="height: 38px; padding: 12px 10px 20px 10px; background: #dedede;" class="medBtn">Send assistants email<br/><small>(Provider must be assigned)</small></a><br/>`,
            `<a href="send-assistant-email.php?id=${$(this).data('patient-id')}&owner=${$(this).data('owner-name')}&location=${$(this).data('patient-location')}" class="medBtn">Send assistants email</a><br/>`
        );
    });
});
