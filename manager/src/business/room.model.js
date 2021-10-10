
const db = require('../database/mysql');
const TABLE = 'rooms';
const PREFIX= 'room_';

const ROOM_TYPE = {
  public: 'PUBLIC',
  private: 'PRIVATE',
}

class RoomModel {

	static async insert (data) {

		let query = `INSERT INTO ${TABLE} SET ${PREFIX}name=?, ${PREFIX}userid_creation=?, ${PREFIX}type=?;`;
		
		return await db.query(query, [data.roomName, data.userId, data.type]);		
	}

	static async delete (data) {

		let query = `DELETE FROM ${TABLE} WHERE ${PREFIX}name=?`;
		
		return await db.query(query, [data.roomName]);
	}

	static async getAllRoomsByType (data) {

		let query = `SELECT * FROM ${TABLE} WHERE ${PREFIX}type=?`;
		
		return await db.query(query, [ROOM_TYPE.public]);
	}

	static async getRoomByName (data) {

		let query = `SELECT * FROM ${TABLE} WHERE ${PREFIX}name=?`;
		
		let res = await db.query(query, [data.roomName]);
		
		return res && res[0] ? res[0] : null;
	}

	static getRoomTypes() {
		return ROOM_TYPE;
	}

}

module.exports = RoomModel;