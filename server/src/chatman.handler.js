
const rp = require('request-promise-native');
require('dotenv').config();

const BASE_URL = `${process.env.CHAT_MANAGER_URL}:${process.env.CHAT_MANAGER_PORT}`;
const headers = {
	'apikey': process.env.HANDSHAKER_SHA1
}

class ChatManHandler {

	static async joinRoom(data) {

		let options = {
			headers,
			method: 'post',
			url: `${BASE_URL}/chatman/join`, 
			json: {
				userId: data.userId,
				roomName: data.roomName,
				socketId : data.socketId
			},
		}
		return await rp(options);
	}

	static async leaveRoom(data) {

		let options = {
			headers,
			method: 'post',
			url: `${BASE_URL}/chatman/leave`, 
			json: { socketId : data.socketId },
		}
		let r =  await rp(options);

		return r.success;
	}

	static async getRoomUsers(data) {
		
		let options = {
			headers,
			method: 'get',
			url: `${BASE_URL}/chatman/guof/${data.roomName}`, 
			json: {}
		}
		let response =  await rp(options);
		if (!response)
			return null
		
		return response.success ? response.data : null;
	}

	static async getCurrentUser(data) {

		let options = {
			headers,
			method: 'get',
			url: `${BASE_URL}/chatman/gubsi/${data.socketId}`, 
			json: {}
		}
		
		let response =  await rp(options);
		if (!response)
			return null
		
		return response.success ? response.data : null;
	}

	static async getUserByUid(data) {

		let options = {
			headers,
			method: 'get',
			url: `${BASE_URL}/chatman/gubuid/${data.uid}`, 
			json: {}
		}
		
		let response =  await rp(options);
		if (!response)
			return null
		
		return response.success ? response.data : null;
	}

	static async history(data) {

		let options = {
			headers,
			method: 'post',
			url: `${BASE_URL}/chatman/hist`, 
			json: data
		}
		
		rp(options);		
	}
}

module.exports = ChatManHandler;