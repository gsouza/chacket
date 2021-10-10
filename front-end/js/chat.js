const chatMessagesPvt = document.getElementById('chat-messages-private');
const chatMessages = document.getElementById('chat-messages');
const roomNameDiv = document.getElementById('room-name');
const userList = document.getElementById('users');

class ChatPage {
		
	static init() {
		Socket.init(this._roomUsersCallBack, this._messageCallBack, this._privateMessageCallback);
		this._sendJoinCommand();
		$(".actual-username").text(sessionStorage.getItem('uname'));
	}

	static cleanScreen () {
		chatMessages.innerHTML = '';
	}

	static cleanScreenPvt () {
		chatMessagesPvt.innerHTML = '';
	}

	static async roomExit() {
		if (confirm('Tem certeza que deseja sair da sala?')) {
			Socket.leaveRoom();
			window.location = '../choose.html';
		}
	}	

	static sendMessage(msg) {
		Socket.sendMessage({msg});
		$("#msg").val('');
	}

	static sendMessagePrivate(msg) {
		let args = {
			msg,
			to_uid : sessionStorage.getItem('privateUid'),
			from_uid : sessionStorage.getItem('uid'),
		}
		Socket.sendPrivate(args);
		$("#msgPrivate").val('');
	}

	static recoverPrivateMessages() {
		let to = sessionStorage.getItem('uid');
		let from = sessionStorage.getItem('privateUid');

		ApiHandler.get(`chatman/hist/${from}/${to}`, (result) => {
			
			if (!result.success)
				return alert('Algo deu errado, por favor tente novamente');

			result.data.forEach(element => {
				this._privateMessageCallback(element);	
			});
			
		});
	}

	static async _sendJoinCommand() {
		let args = {
			roomName : sessionStorage.getItem('roomName'),
			userName: sessionStorage.getItem('uname'), 
			userId: sessionStorage.getItem('uid'),
		}
		Socket.joinRoom(args);
	}

	static _roomUsersCallBack({ roomName, users }) {
		
		userList.innerHTML = '';

		users.forEach((user) => {
			const li = document.createElement('li');
			if (sessionStorage.getItem('uname') != user.uname)
				li.innerHTML = "<div> \
													<a href=\"javascript:selectPrivate('"+user.uid+"','"+user.uname+"')\" >"+user.uname+"</a> \
													<i class='fas fa-bell' id='newPrivateMsg_"+user.uid+"'></i> \
												</div>";
			else
			li.innerText = user.uname+" (você)";

			userList.appendChild(li);
			$(`#newPrivateMsg_${user.uid}`).hide();
		});
	
		if (roomNameDiv)
			roomNameDiv.outerHTML = "<h2><i class='fas fa-comments'></i> "+ roomName +" </h2>";
	}
	
	static _messageCallBack (message){
		const p = document.createElement('p');
		const div = document.createElement('div');
		const para = document.createElement('p');
		
		let me = sessionStorage.getItem('uname');
		
		div.classList.add(me==message.username?'message-mine':'message');
		p.classList.add('meta');
		p.innerText = message.username;
		p.innerHTML += `<span> ${message.time}</span>`;
		div.appendChild(p);
		
		para.classList.add('text');
		para.innerText = message.text;
		
		div.appendChild(para);
	
		chatMessages.appendChild(div);
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	static _privateMessageCallback (message){
		const p = document.createElement('p');
		const div = document.createElement('div');
		const para = document.createElement('p');
		
		let me = sessionStorage.getItem('uname');

		div.classList.add(me==message.username?'message-mine':'message');
		p.classList.add('meta');
		p.innerText = message.username;
		p.innerHTML += `<span> ${message.time}</span>`;
		div.appendChild(p);
		
		para.classList.add('text');
		para.innerText = message.text;
		
		div.appendChild(para);
	
		chatMessagesPvt.appendChild(div);
		chatMessagesPvt.scrollTop = chatMessagesPvt.scrollHeight;

		if (sessionStorage.getItem('operMode') == 'public')
			$(`#newPrivateMsg_${message.fromUid}`).show();
	}

}