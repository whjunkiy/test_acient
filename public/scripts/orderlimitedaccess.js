document.getElementsByClassName('viewOrderEditOrderButton')[0].setAttribute('style', 'display:none;');
document.getElementsByClassName('viewOrderPrintOrderButton')[0].setAttribute('style', 'display:none;');
document.getElementsByClassName('viewOrderCostHeader')[0].setAttribute('style', 'display:none;');
document.getElementsByClassName('viewOrderTotal')[0].setAttribute('style', 'display:none;');
document.getElementsByClassName('viewOrderShippingCost')[0].setAttribute('style', 'display:none;');

if(document.getElementsByClassName('viewOrderWaterCost')[0] === undefined) {
} else {
 document.getElementsByClassName('viewOrderWaterCost')[0].setAttribute('style', 'display:none;');
}

document.getElementsByClassName('viewOrderProcessingFeeCost')[0].setAttribute('style', 'display:none;');

document.getElementsByClassName('viewOrderAlcCost')[0].setAttribute('style', 'display:none;');
document.getElementsByClassName('viewOrderBlankCost')[0].setAttribute('style', 'display:none;');
var medCosts = document.getElementsByClassName('viewOrderMedCost');

for (var i = medCosts.length - 1; i >= 0; i--) {
	medCosts[i].setAttribute('style', 'display:none;');
}


