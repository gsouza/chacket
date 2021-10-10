const RoomModel = require('../business/room.model');
const RoomOcupation = require('../business/roomOcupation.model');
const LoggerHandler = require('./logger.handler');

class RoomService {

	static async create(data) {

		let args = {
			type: data.type,
			userId: data.userId,
			roomName: data.roomName.toUpperCase().trim(),
		}

		let res = await RoomModel.getRoomByName({roomName: args.roomName})
		
		if (res && res.id) {
			return { success: false, data: 'Não foi possivel criar, pois ja existe sala criada com mesmo nome!'};
		}

		res = await RoomModel.insert(args);

		let success = res.affectedRows > 0;

		args.evidence = `[${success} - ${res.insertId}]`;
		args.destination = args.roomName;

		await LoggerHandler.createRoom(args);

		return { success: success, data: success ? {insertId: res.insertId} : null};
	}

	static async getAllRooms( ) {

		let res = await RoomModel.getAllRoomsByType({type: 'PUBLIC'});

		if (!res)
			return { success: false, data: 'Something went wrong!'};

		let data = [];
		res.forEach(element => {
				data.push({
					roomName : element.room_name,
					created_at : element.created_at
				})
		});

		return { success: true, data: data};
	}

	static async joinRoom (data) {
		
		let room = await RoomModel.getRoomByName(data);
		
		if (!room)
			return { success: false };

		let res = await RoomOcupation.insert({
			roomId : room.id,
			userId: data.userId,
			socketId : data.socketId,
		});
		let success = res.affectedRows > 0;

		await LoggerHandler.userActivity({
			userId : data.userId,
			destination: room.room_name,
			evidence : `JOIN ROOM - ${success}`,
		});
		
		return { success: success};
	}

	static async leaveRoom (data) {
	
		let room = await RoomOcupation.getRoomBySocketId(data)
		if (!room)
			return { success: false };

		let res = await RoomOcupation.delete(data);

		await LoggerHandler.userActivity({
				userId : room.user_id,
				destination: ret.nUser <= 1 ? "TERMINATED ROOM" : "LEAVE",
				evidence : res.affectedRows > 0
			});
		
		return { success:  res.affectedRows > 0};
	}

	static async getUsersOfRoom(data) {

		let res = await RoomOcupation.getUsersByRoomName(data);

		if (!res)
			return {success: false, data: 'Something went wrong!'};

		let _data = [];
		res.forEach(element => {
				_data.push({
					uid: element.user_id,
					uname: element.name,
				})
		});

		return { success: true, data: _data};
	}

	static async getUserBySocketId(data) {

		let res = await RoomOcupation.getUserBySocketId({socketId: data.socketId});
		if (!res)
			return { success: false, data: 'Something went wrong!'};

		return { success: true, data: {
			userName: res.name,
			roomName: res.room_name
		}};
	}

	static async getUserByUserId(data) {

		let res = await RoomOcupation.getUserByUserId({uid: data.uid});
		if (!res)
			return { success: false, data: 'Something went wrong!'};

		return { success: true, data: {
			userName: res.name,
			socketId: res.socket_id
		}};
	}
}

module.exports = RoomService;