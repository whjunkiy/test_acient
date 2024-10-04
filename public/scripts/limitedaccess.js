
//Get the order table
var orderTable = document.getElementById('sortedtable6');

//Get all of the order links inside the cost
var orderLinks = orderTable.getElementsByTagName('a');

//Loop through all of the order links and get their URL and add them to the order date
for (var i = orderLinks.length - 1; i >= 0; i--) {
	var orderLink = orderLinks[i].getAttribute('href');
	var tableRow = orderLinks[i].parentElement.parentElement;
	var orderDate = tableRow.getElementsByTagName('td')[1].innerHTML;
	var newOrderLink = '<a href="'+orderLink+'">'+orderDate+'</a>';
	tableRow.getElementsByTagName('td')[1].innerHTML = newOrderLink;
}

//Get all order rows and hide the cost
var orderRows = document.getElementsByClassName('row6');

for (var i = orderRows.length - 1; i >= 0; i--) {
	orderRows[i].getElementsByTagName('td')[4].setAttribute('style', 'display:none');
}

orderTable.getElementsByTagName('th')[4].setAttribute('style', 'display:none');


//Remove the right side order table
document.getElementsByClassName('detailsSubHeaderRightOrders')[0].setAttribute('style', 'display:none !important;');
document.getElementsByClassName('dRightContentCenterOrders')[0].setAttribute('style', 'display:none;');

//Remove appointment costs
var apptCosts = document.getElementsByClassName('apptcost');
for (var i = apptCosts.length - 1; i >= 0; i--) {
	apptCosts[i].setAttribute('style', 'display:none;');
}
document.getElementsByClassName('apptcostheader')[0].setAttribute('style', 'display:none;');

//Remove the Create Order button
var createOrderButton = document.getElementsByClassName('patientCreateOrderButton');
for (var i = createOrderButton.length - 1; i >= 0; i--) {
	createOrderButton[i].setAttribute('style', 'display:none;');
}

//Remove the enter payment button
var enterPaymentButton = document.getElementsByClassName('patientEnterPaymentButton');
for (var i = enterPaymentButton.length - 1; i >= 0; i--) {
	enterPaymentButton[i].setAttribute('style', 'display:none;');
}

//Remove blue payments tab
document.getElementsByClassName('patientProfilePaymentsTab')[0].setAttribute('style','display:none;');