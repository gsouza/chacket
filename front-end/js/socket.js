
const socket = io('http://177.71.204.157:5000'); 	/**PARA RODAR NO SERVER 	*/
// const socket = io(); 													/**PARA RODAR NO LOCALHOST*/

class Socket {

	static init(roomCallBack, msgCallback, pvtMsgCallBack) {
		
		socket.on('roomUsers', ({ roomName, users }) => {
			if (roomCallBack)
				roomCallBack({roomName, users});
			else
				console.log('error on roomCallBack',roomCallBack);
		});
		
		socket.on('message', (message) => {  
			if (msgCallback)
				msgCallback(message);
			else
				console.log('error on msgCallback', msgCallback);
		});

		socket.on('privateMessage', (message) => {  
			if (pvtMsgCallBack)
				pvtMsgCallBack(message);
			else
				console.log('error on pvtMsgCallBack', msgCallback);
		});
	}

	static joinRoom (data) {
		socket.emit('joinRoom', data);
	}

	static sendMessage({msg}) {
		socket.emit('chatMessage', msg);	
	}

	static sendPrivate({from_uid, to_uid, msg}) {
		socket.emit('privateMessage', {from_uid, to_uid, msg});
	}

	static leaveRoom() {
		socket.disconnect();
	}
}