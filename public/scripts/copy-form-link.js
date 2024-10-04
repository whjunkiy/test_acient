function copyFormLink() {

  /* Get the text field */
  var copyText = document.getElementById("patient-form-link-hidden");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied patient link to clipboard";

} 

function copyFormLinkMouseOut(){
	 var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy patient link to clipboard";
}

function copyFormLink2() {

  /* Get the text field */
  var copyText = document.getElementById("patient-form-link-hidden2");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  var tooltip = document.getElementById("myTooltip2");
  tooltip.innerHTML = "Copied admin link to clipboard";

} 

function copyFormLinkMouseOut2(){
	 var tooltip = document.getElementById("myTooltip2");
  tooltip.innerHTML = "Copy admin link to clipboard";
}