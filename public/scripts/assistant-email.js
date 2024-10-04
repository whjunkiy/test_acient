//Setting vars
var emailSelection = document.getElementById("email-selection");
var quillEditor = document.getElementsByClassName('ql-editor')[0];
var sendButton = document.getElementById("medBtn");
var emailSubject = document.getElementById("email-subject");
var emailBody = document.getElementById('email-body');
var chatnoteSubject = document.getElementById("chatnote-subject");
var emailTemplates = [

    // Bio Reference Full Panel
    {
        value: 'bio-reference-full-panel',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
        }
    },

    // Bio Reference Full Panel IGF-1
    {
        value: 'bio-reference-full-panel-igf-1',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Full Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Full Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Bio Reference Follow Up Panel
    {
        value: 'bio-reference-follow-up-panel',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Follow-up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Follow-up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Bio Reference Follow Up Panel IGF-1
    {
        value: 'bio-reference-follow-up-panel-igf-1',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Follow-up Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Follow-up Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Bio Reference Female Full Panel
    {
        value: 'bio-reference-female-full-panel',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Female Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Female Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
        }
    },

    // Bio Reference Female Follow Up Panel
    {
        value: 'bio-reference-female-follow-up-panel',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio-Reference | Female Follow Up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Female Follow Up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
        }
    },

	// Bio Reference Semaglutdie
	{
		value: 'bio-reference-semaglutdie',
		emailSubject: 'New Bio-Reference Alert',
		chatnoteSubject: 'Bio-Reference | Semaglutdie',
		innerHTML: function (firstName, lastName, patientLocation) {
			return '<p>A semaglutdie needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
		}
	},
	
	// Bio Reference Full Panel w/ Vitamins
	{
		value: 'bio-reference-full-panel-vitamins',
		emailSubject: 'New Bio-Reference Alert',
		chatnoteSubject: 'Bio Reference | Full Panel w/ Vitamins',
		innerHTML: function (firstName, lastName, patientLocation) {
			return '<p>A Full Panel w/ Vitamins needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
		}
	},

    // Bio Reference Follow up with Vitamins
    {
        value: 'bio-reference-follow-up-vitamins',
        emailSubject: 'New Bio-Reference Alert',
        chatnoteSubject: 'Bio Reference | Follow up with Vitamins',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Follow up with Vitamins needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>'
        }
    },
	
	
	
	

    // Lab Corp Full Panel
    {
        value: 'lab-corp-full-panel',
        emailSubject: 'New LabCorp Alert',
        chatnoteSubject: 'Lab Corp Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Lab Corp Full Panel IGF-1
    {
        value: 'lab-corp-full-panel-igf-1',
        emailSubject: 'New LabCorp Alert (IGF-1)',
        chatnoteSubject: 'Lab Corp Full Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Full Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Lab Corp Follow Up Panel
    {
        value: 'lab-corp-follow-up-panel',
        emailSubject: 'New LabCorp Alert',
        chatnoteSubject: 'Lab Corp Follow-up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Follow-up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Lab Corp Follow Up Panel IGF-1
    {
        value: 'lab-corp-follow-up-panel-ifg-1',
        emailSubject: 'New LabCorp Alert',
        chatnoteSubject: 'Lab Corp Follow-up Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A Follow-up Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Walk-In Full Panel
    {
        value: 'access-walk-in-full-panel',
        emailSubject: 'New Walk-In Alert',
        chatnoteSubject: 'Walk-In Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Walk-In Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Walk-In Full Panel IGF-1
    {
        value: 'access-walk-in-full-panel-igf-1',
        emailSubject: 'New Walk-In Alert',
        chatnoteSubject: 'Walk-In Full Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Walk-In Full Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Walk-In Follow Up Panel
    {
        value: 'access-walk-in-follow-up-panel',
        emailSubject: 'New Walk-In Alert',
        chatnoteSubject: 'Walk-In Follow-up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Walk-In Follow-up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },


    // Semaglutide Panel
    {
        value: 'access-semaglutide-panel',
        emailSubject: 'New Semaglutide Panel Alert',
        chatnoteSubject: 'Semaglutide Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Semaglutide Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },


    // Access Walk-In Follow Up Panel IGF-1
    {
        value: 'access-walk-in-follow-up-panel-igf-1',
        emailSubject: 'New Walk-In Alert',
        chatnoteSubject: 'Walk-In Follow-up Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Walk-In Follow-up Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Female Panel
    {
        value: 'access-female-panel',
        emailSubject: 'New Female Panel',
        chatnoteSubject: 'Female Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Female Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Mobile Full Panel
    {
        value: 'access-mobile-full-panel',
        emailSubject: 'New Access Medical Alert',
        chatnoteSubject: 'Mobile Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Mobile Draw Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },



    // Hawaii Labs - Male Panel
    {
        value: 'hawaii-labs-male-panel',
        emailSubject: 'New Hawaii Labs - Male Panel Alert',
        chatnoteSubject: 'Hawaii Labs - Male Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Hawaii Labs - Male Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },
    // Hawaii Labs - Female Panel
    {
        value: 'hawaii-labs-female-panel',
        emailSubject: 'New Hawaii Labs - Female Panel Alert',
        chatnoteSubject: 'Hawaii Labs - Female Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Hawaii Labs - Female Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },
    // Hawaii Labs - Semaglutide Panel
    {
        value: 'hawaii-labs-semaglutide-panel',
        emailSubject: 'New Hawaii Labs - Semaglutide Panel Alert',
        chatnoteSubject: 'Hawaii Labs - Semaglutide Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Hawaii Labs - Semaglutide Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },


    // Access Mobile Full Panel IGF-1
    {
        value: 'access-mobile-full-panel-igf-1',
        emailSubject: 'New Access Medical Alert',
        chatnoteSubject: 'Mobile Full Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Mobile Draw Full Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Mobile Follow Up Panel
    {
        value: 'access-mobile-follow-up-panel',
        emailSubject: 'New Access Medical Alert',
        chatnoteSubject: 'Mobile Follow-up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Mobile Draw Follow-up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Access Mobile Follow Up Panel IGF-1
    {
        value: 'access-mobile-follow-up-panel-igf-1',
        emailSubject: 'New Access Medical Alert',
        chatnoteSubject: 'Mobile Follow-up Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>An Access/Mobile Draw Follow-up Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Dynix Full Panel
    {
        value: 'dynix-full-panel',
        emailSubject: 'New DYNIX Alert',
        chatnoteSubject: 'DYNIX | Full Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A DYNIX Full Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Dynix Full Panel IGF-1
    {
        value: 'dynix-full-panel-igf-1',
        emailSubject: 'New DYNIX Alert',
        chatnoteSubject: 'DYNIX | Full Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A DYNIX Full Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Dynix Follow Up Panel
    {
        value: 'dynix-follow-up-panel',
        emailSubject: 'New DYNIX Alert',
        chatnoteSubject: 'DYNIX | Follow-up Panel',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A DYNIX Follow-up Panel needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Dynix Follow Up Panel IGF-1
    {
        value: 'dynix-follow-up-panel-igf-1',
        emailSubject: 'New DYNIX Alert',
        chatnoteSubject: 'DYNIX | Follow-up Panel (IGF-1)',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>A DYNIX Follow-up Panel <b>without IGF-1</b> needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },


    // Renew Standard with D3&B12
    {
        value: 'renew-standard-plus-vitamins',
        emailSubject: 'Renew Standard + Vitamins',
        chatnoteSubject: 'Renew Standard + Vitamins',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Renew Standard + Vitamins needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Walk In Renew Standard with D3&B12
    {
        value: 'walk-in-renew-standard-with-d3&b12',
        emailSubject: 'Walk In Renew Standard with D3&B12 Alert',
        chatnoteSubject: 'Walk In Renew Standard with D3&B12',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Walk In Renew Standard with D3&B12 needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Renew Follow Up w/D3&B12
    {
        value: 'renew-follow-up-w/d3&b12',
        emailSubject: 'Renew Follow Up w/D3&B12 Alert',
        chatnoteSubject: 'Renew Follow Up w/D3&B12',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Renew Follow Up w/D3&B12 needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Walk In Renew Follow Up w/D3&B12
    {
        value: 'walk-in-renew-follow-up-w/d3&b12',
        emailSubject: 'Walk In Renew Follow Up w/D3&B12 Alert',
        chatnoteSubject: 'Walk In Renew Follow Up w/D3&B12',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Walk In Renew Follow Up w/D3&B12 needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Comprehensive Female Panel w/D3&B12
    {
        value: 'comprehensive-female-panel-w/d3&b12',
        emailSubject: 'Comprehensive Female Panel w/D3&B12 Alert',
        chatnoteSubject: 'Comprehensive Female Panel w/D3&B12',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Comprehensive Female Panel w/D3&B12 needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Walk In Comprehensive Female Panel w/D3&B12
    {
        value: 'walk-in-comprehensive-female-panel-w/d3&b12',
        emailSubject: 'Walk In Comprehensive Female Panel w/D3&B12 Alert',
        chatnoteSubject: 'Walk In Comprehensive Female Panel w/D3&B12',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Walk In Comprehensive Female Panel w/D3&B12 needs to be processed for ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },


    // Registration Documents
    {
        value: 'registration-documents',
        emailSubject: 'New Registration Documents Alert',
        chatnoteSubject: 'Registration Documents',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Send Registration Documents to ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    },

    // Lab Results
    {
        value: 'lab-results',
        emailSubject: 'New Lab Results Alert',
        chatnoteSubject: 'Lab Results',
        innerHTML: function (firstName, lastName, patientLocation) {
            return '<p>Send Lab Results to ' + firstName + ' ' + lastName + ' in ' + patientLocation + '.</p>';
        }
    }

];

emailSelection.addEventListener("change", function () {
    //Display send email button
    sendButton.style.visibility = 'visible';
    // Loop through Email Templates, Find It, and Set It
    for (i = 0; i < emailTemplates.length; i++) {
        if (emailSelection.value === emailTemplates[i].value) {

            quillEditor.innerHTML = quillEditor.innerHTML + emailTemplates[i].innerHTML(firstName, lastName, patientLocation);
            quillEditor.innerHTML = quillEditor.innerHTML.replace("<p>Please select an email template to send.</p>", "");

            emailBody.value = quillEditor.innerHTML;

//			emailSubject.value = emailTemplates[i].emailSubject;
//			chatnoteSubject.value = emailTemplates[i].chatnoteSubject;

            emailSubject.value = emailSubject.value + emailTemplates[i].emailSubject + ' / ';
            chatnoteSubject.value = chatnoteSubject.value + emailTemplates[i].chatnoteSubject + ' / ';


        }
    }
});

