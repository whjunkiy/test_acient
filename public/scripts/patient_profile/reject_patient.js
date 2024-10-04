$(document).ready(function () {
    function handleApproveRejectClick(event, action, btnNotApprovedText) {
        let patientId = $(this).data('patient-id')
        let patientLocation = $(this).data('patient-location')
        let btnContainer = $(`#book-${event}-btn`)
        let btnNotApproved =
            `
            <a href="#"  
                style="height: 38px; padding: 12px 10px 20px 10px; background: #dedede;" 
                class="medBtn">${btnNotApprovedText}<br/>
                <small>(${event.charAt(0).toUpperCase() + event.slice(1)} should be approved by Matthew, Nick or Andy first)</small>
            </a><br/>
            `

        let formData = {
            patientId,
            patientLocation,
            action
        }

        let isConfirmed = confirm(`Are you sure you want to remove the approve from this patient? (${event.toUpperCase()} orders)`)

        if (isConfirmed) {
            $.ajax({
                url: '/ajax/patient_profile/approve_reject_patient.php',
                type: 'POST',
                data: formData,
                success: function (response) {
                    alert(`${event.charAt(0).toUpperCase() + event.slice(1)} were successfully removed from "approved" status`)
                    $(`#approve-${event}`).show()
                    $(`#approve-${event}-icon`).removeClass('show')
                    btnContainer.empty().append(btnNotApproved)
                },
                error: function (e) {
                    e.responseText
                        ? alert(`${e.status} | ${e.responseText}`)
                        : alert(`HTTP Error: ${e.status}`)
                }
            });
        }
    }

    $('#approve-appointments-icon').click(function () {
        handleApproveRejectClick.call(this, 'appointments', 'reject_appointments', 'Book Appointment');
    })

    $('#approve-labs-icon').click(function () {
        handleApproveRejectClick.call(this, 'labs', 'reject_labs', 'Send assistants email');
    })
})
