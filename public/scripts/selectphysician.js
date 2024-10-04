//When the Select Physician button is clicked, display the list of physicians
function showPhysicians() {
    document.getElementById("physicianDropdown").setAttribute('style', 'display:block;position: absolute;background-color: #f1f1f1;min-width: 160px;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);z-index: 99;left: 225px;top: 37px; padding: 12px 0 12px 0;');
}

//If user clicks anywhere besides the button, the list of physicians closes
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn2')) {

    document.getElementById("physicianDropdown").setAttribute('style', 'display:none;');

  }
});