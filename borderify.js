document.body.style.border = "5px solid red";

console.log(document.location.href);
var url = document.location.href;

jQuery.ajax({
	type: "POST",
	url: 'main.php',
	dataType: 'json',
	data: {"url": url},

	success :function (result) {
		console.log(result);
	}, 
	error : function(){
		console.log("error");

	});
