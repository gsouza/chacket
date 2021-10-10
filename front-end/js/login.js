function login() {

	let params = {};
	let data = $("#loginForm").serializeArray();

	for (let item of data) {
		if (item.value == '')
			return alert(`O campo: ${item.name} não pode ficar em branco!`);
		
		params[item.name] = item.value;
	}
	
	ApiHandler.post(`login`, params, (result) => {
		
		if (result.success) {
			sessionStorage.setItem("uemail", params.email);
			sessionStorage.setItem("uid", result.data.uid);
			sessionStorage.setItem("uname", result.data.uname);
			window.location.href = 'choose.html';
		}
		else 
		$("#userAdvice").text(result.data?result.data:"Error");
	});
	
}

function exit(msg) {
	sessionStorage.setItem("uid", '');
	sessionStorage.setItem("uname", '');
	sessionStorage.setItem("uemail", '');
	sessionStorage.setItem('roomName', '');
	
	sessionStorage.setItem('userAdvice', msg);
	window.location.href = 'index.html';
}

function checkSession(msg) {
	if ((sessionStorage.getItem("uid") == '') || (sessionStorage.getItem("uname") == '') || (sessionStorage.getItem("uemail") == ''))
		exit(msg);
}