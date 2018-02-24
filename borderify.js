document.body.style.border = "5px solid red";

console.log(document.location.href);

var url = document.location.href;
$(function () {
console.log("Hello World");
	
	$.ajax({
		url: "main.php",
		dataType: 'json',
		type: "POST",
		data : {url : url},
		success :function (result) {
			console.log(result);
		},
		error : function(){
			console.log("error");
		},
	});
});
