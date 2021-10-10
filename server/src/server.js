const ChatManHandler = require('./chatman.handler');
require('dotenv').config();

const moment = require('moment');
const socketIO = require('socket.io');


const CHAT_EVENTS = {
	joinRoom 			: 'joinRoom',
  chatMessage   : 'chatMessage',
	roomUsers			: 'roomUsers',
	disconnect		: 'disconnect',
	connection		: 'connection',
	message				: 'message',
	privateMessage: 'privateMessage',
}

class ChatServer {

	constructor (server) {
		
		this.socket = socketIO(server);
		this._runInit();

		server.listen(process.env.APP_PORT, () => {
			console.log(`${process.env.APP_NAME} is listening on ${process.env.CHAT_MANAGER_URL}:${process.env.APP_PORT}`);
		});
	}

	async _getCurrentUser(socketId) {
		return await ChatManHandler.getCurrentUser({socketId});
	}

	async _getUserByUid(uid) {
		return await ChatManHandler.getUserByUid({uid});
	}
	
	async _getRoomUsers(roomName) {
		
		return await ChatManHandler.getRoomUsers({roomName: roomName});
	}

	async _addUser (socketId, roomName, userId) {		
		await ChatManHandler.joinRoom({socketId, roomName, userId});
	}

	async _removeUser (socketId) {
		return await ChatManHandler.leaveRoom({socketId});
	}

	 _putHistory(socketId, msg, data) {
		let arg = {
			msg,						
			socketId,
			to: data.to,
			type: data.type,
			userId : data.userId,
		}
		ChatManHandler.history(arg);
	}

	_sendJoinMessage(data) {
		this.socket.to(data.roomName).emit(CHAT_EVENTS.message, this._fmtMessage(process.env.APP_NAME, `${data.userName} entrou na sala!`));
	}

	_sendLeaveMessage(data) {
		this.socket.to(data.roomName).emit(CHAT_EVENTS.message, this._fmtMessage(process.env.APP_NAME, `${data.userName} saiu da sala!`));
	}

	async _updateRoomUsers(roomName) {
		let _users =  await this._getRoomUsers(roomName);
		this.socket.to(roomName).emit(CHAT_EVENTS.roomUsers, {roomName: roomName, users: _users});
	}

	_fmtMessage(username, message) {
		return {
			username,
			text : message,
			time : moment().utcOffset("-03:00").format('HH:mm:ss')
		}
	}
	_fmtPvtMessage(username, fromUid, message) {
		return {
			username,
			fromUid,
			text : message,
			time : moment().utcOffset("-03:00").format('HH:mm:ss')
		}
	}

	_runInit () {
		this.socket.on(CHAT_EVENTS.connection, (sk) => {
		
			sk.on(CHAT_EVENTS.joinRoom, async (data) => {

				await this._addUser(sk.id, data.roomName, data.userId);
				
				sk.join(data.roomName);
	
				this._sendJoinMessage(data);

				this._updateRoomUsers(data.roomName);
			});
		
			sk.on(CHAT_EVENTS.chatMessage, async (msg) => {
				
				let data = await this._getCurrentUser(sk.id);
				
				if (!data)
					return;
				this._putHistory(sk.id, msg, {
					type: 'public',
					to: data.roomName, 
					userId: data.userId, 
				});

				this.socket.to(data.roomName).emit(CHAT_EVENTS.message, this._fmtMessage(data.userName, msg));
			});

			sk.on(CHAT_EVENTS.privateMessage, async (data) => {
				
				let fromUser = await this._getUserByUid(data.from_uid);
				let toUser = await this._getUserByUid(data.to_uid);

				if (!toUser)
					return console.log('error: toUser is null', toUser);

				this._putHistory(sk.id, data.msg, {
					type: 'private',
					to: data.to_uid, 
					userId: data.from_uid, 
				});

				this.socket.to(toUser.socketId).emit(CHAT_EVENTS.privateMessage, this._fmtPvtMessage(fromUser.userName, data.from_uid, data.msg));
				this.socket.to(sk.id).emit(CHAT_EVENTS.privateMessage, this._fmtPvtMessage(fromUser.userName, data.from_uid, data.msg));
			});
			
			sk.on(CHAT_EVENTS.disconnect, async () => {
				
				let data = await this._getCurrentUser(sk.id);
				let removed = await this._removeUser(sk.id);
				
				if (removed){
					this._sendLeaveMessage(data);
					this._updateRoomUsers(data.roomName);
				}
			});
		});
	}
}

module.exports = ChatServer;