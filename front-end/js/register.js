

function addNew() {
	let params = {};
	let data = $("#registrerForm").serializeArray();

	for (let item of data) {
		if (item.value == '')
			return alert(`O campo: ${item.name} não pode ficar em branco!`);
		
			params[item.name] = item.value;
	}

	if (params.pass != params.cfpass) {
		return alert(`As senhas devem ser iguais!`);
	}

	ApiHandler.post(`user`, params, (result) => {
		
		if (!result.success)
			return alert(result.data?result.data:'Algo deu errado, por favor tente novamente')
		
		alert('Usuario registrado com sucesso')
		window.location.href = 'index.html';		
	});
}