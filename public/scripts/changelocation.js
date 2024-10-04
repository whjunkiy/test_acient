
//When the Change Location button is clicked, display the list of locations
function showLocations() {
    document.getElementById("locationDropdown").setAttribute('style', 'display:block;position: absolute;background-color: #f1f1f1;min-width: 160px;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);z-index: 1;left: 225px;top: 75px;');
}

//If user clicks anywhere besides the button, the list of locations closes
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {


if(document.getElementById("locationDropdown")){
 document.getElementById("locationDropdown").setAttribute('style', 'display:none;');
}
    

  }
});