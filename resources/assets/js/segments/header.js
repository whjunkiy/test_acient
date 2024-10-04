let showLocations = () => {
    document.getElementById("locationDropdown").classList.add('show');
};
let showPhysicians = () => {
    //document.getElementById("physicianDropdown").setAttribute('style', 'display:block;position: absolute;background-color: #f1f1f1;min-width: 160px;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);z-index: 99;left: 225px;top: 37px; padding: 12px 0 12px 0;');
    document.getElementById("physicianDropdown").classList.add('show');
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('locationShow').addEventListener('click', function () {
        showLocations();
    });

    document.getElementById('physiciansShow').addEventListener('click', function () {
        showPhysicians();
    });

    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropbtn')) {
            if (document.getElementById("locationDropdown")) {
                document.getElementById("locationDropdown").classList.remove('show')
            }
        }
        if (!event.target.matches('.dropbtn2')) {
            if (document.getElementById("physicianDropdown")) {
                document.getElementById("physicianDropdown").classList.remove('show')
            }
        }
    });
});
