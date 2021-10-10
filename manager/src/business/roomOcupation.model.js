
const db = require('../database/mysql');
const TABLE = 'room_ocupation';

class RoomOcupation {

	static async insert (data) {

		let query = `INSERT INTO ${TABLE} SET user_id=?, room_id=?, socket_id=?;`;
		
		return await db.query(query, [data.userId, data.roomId, data.socketId]);		
	}

	static async update (data) {

		let query = `UPDATE ${TABLE} SET user_id=?, room_id=?, socket_id=?;`;
		
		return await db.query(query, [data.userId, data.roomId, data.socketId]);
	}

	static async delete (data) {

		let query = `DELETE FROM ${TABLE} WHERE socket_id=?`;
		
		return await db.query(query, [data.socketId]);
	}

	static async getNumUserByRoomId (data) {

		let query = `SELECT count(user_id) as nUser FROM ${TABLE} WHERE room_id=?; `;
		
		let res = await db.query(query, [data.id]);

		console.log('res', res);
		return res && res[0] ? res[0] : null;
	}

	static async getRoomBySocketId (data) {

		let query = `SELECT * FROM ${TABLE} ro
								LEFT JOIN rooms r on r.id=ro.room_id
								WHERE ro.socket_id=?; `;
		
		let res = await db.query(query, [data.socketId]);

		return res && res[0] ? res[0] : null;
	}

	static async getUsersByRoomName (data) {

		let query = `SELECT * FROM ${TABLE} ro 
								LEFT JOIN rooms r on r.id=ro.room_id
								LEFT JOIN users u on u.id=ro.user_id
								WHERE r.room_name=?`;
		
		return await db.query(query, [data.roomName]);
	}

	static async getUserBySocketId (data) {

		let query = `SELECT * FROM ${TABLE} ro
								LEFT JOIN rooms r on r.id=ro.room_id
								LEFT JOIN users u on u.id=ro.user_id
								WHERE ro.socket_id=?`;
		
		let res = await db.query(query, [data.socketId]);
		
		return res && res[0] ? res[0] : null;
	}

	static async getUserByUserId (data) {

		let query = `SELECT * FROM ${TABLE} ro
								LEFT JOIN users u on u.id=ro.user_id
								WHERE ro.user_id=?`;
		
		let res = await db.query(query, [data.uid]);
		
		return res && res[0] ? res[0] : null;
	}
}

module.exports = RoomOcupation;