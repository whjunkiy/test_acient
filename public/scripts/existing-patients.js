var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var phone1Input = document.getElementById('phone1');

//Run function on first name input blur
firstNameInput.addEventListener('blur', function(){

	$.ajax({
        type: "POST", // Method type GET/POST           
        url: "../include/get-existing-patients.php", //Ajax Action url
        data: {firstName: firstNameInput.value, lastName: lastNameInput.value, phone1: phone1Input.value},

        //Will call if method not exists or any error inside php file
        error: function(qXHR, textStatus, errorThrow){
            //resp.html("There are an error");
        },

        success: function(data, textStatus, jqXHR){
           console.log(data);
           document.getElementById('existing-patients-table').innerHTML = data;        
       }
    });
});

//Run function on last name input blur
lastNameInput.addEventListener('blur', function(){

	if(lastNameInput.innerHTML !== '' || lastNameInput.innerHTML !== ' '){

	$.ajax({
        type: "POST", // Method type GET/POST           
        url: "../include/get-existing-patients2.php", //Ajax Action url
        data: {firstName: firstNameInput.value, lastName: lastNameInput.value, phone1: phone1Input.value},

        //Will call if method not exists or any error inside php file
        error: function(qXHR, textStatus, errorThrow){
            //resp.html("There are an error");
        },

        success: function(data, textStatus, jqXHR){
           console.log(data);
           document.getElementById('existing-patients-table').innerHTML = data;        
       }
    });

}

});