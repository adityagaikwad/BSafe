document.getElementById("hello").addEventListener("click", popup);

function popup() 
{
	alert("hiii");
	$.ajax({
		url: "main.php",
		dataType: 'json',
		type: "POST",
		data : {url:"http://www.ixxi.com.mx/pp/log-in/customer_center/customer-IDPP00C877/myaccount/signin/"},
		success :function (result) {
			console.log(result);
		},
		error : function(){
			console.log("error");
		},
	});
};