
class ChoosePage {

	static init() {
		this._plotWelcome();
		this._getOppenedRooms();
		sessionStorage.setItem('operMode', '')
		sessionStorage.setItem('privateUid', '');
		sessionStorage.setItem('privateUname', '');
	}

	static async roomEntrance() {

		let params = {};
		let data = $("#roomForm").serializeArray();
		
		for (let item of data) {
			if (!item.value)
				continue;
			params[item.name] = item.value;
		}
		
		if (params.openedRooms == '' && params.roomName == '')
			return alert(`É necessário escolher uma sala existente ou digitar o nome de uma para cria-la!`);

		if (params.openedRooms) {
			sessionStorage.setItem('roomName', params.openedRooms);
			window.location.href = 'chat.html';
		}
		else 
		if (params.roomName) {
			params.type = 'PUBLIC';
			params.userId = sessionStorage.getItem('uid');
			params.roomName = params.roomName.toUpperCase();
			
			ApiHandler.post(`chatman`, params, (result) => {
				
				if (result.success) {
					sessionStorage.setItem('roomName', params.roomName);
					window.location.href = 'chat.html';
				}
				else {
					alert(result.data?result.data:"Erro ao criar sala");
				}
			});
		}
	}

	static _getOppenedRooms() {
		
		ApiHandler.get(`chatman`, (result) => {
			
			if (!result.success)
				return alert('Algo deu errado, por favor tente novamente');
				
			$('#openedRooms').find('option').remove();
			
			if (!result.data.length) {
				$('#openedRooms').append(`<option value="" >Não há sala abertas, experimente criar uma!</option>`);
				$("#openedRooms").attr('disabled', true);
				return;
			}
	
			$('#openedRooms').append(`<option value="" ></option>`);
			result.data.forEach(element => {
				$('#openedRooms').append(`<option value="${element.roomName}" >${element.roomName}</option>`);
			});
		});
	}

	static _plotWelcome() {
		let name = sessionStorage.getItem('uname');
		$("#welcomeLabel").text(`Olá ${name}, seja bem vindo.`)
	}

	static joinPrivate () {
		window.location.href = 'private.html';
	}
}



