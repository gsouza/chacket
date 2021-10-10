const db = require('../database/mysql');
const TABLE = 'logger';

class LoggerModel {

	static async insert (data) {

		let query = `INSERT INTO ${TABLE} SET origin_uuid=?, destination=?, evidence=?; `;
		
		return await db.query(query, [data.userId, data.destination, data.evidence]);
	}

	static async delete (data) {

		let query = `DELETE FROM ${TABLE} WHERE id=?`;
		
		return await db.query(query, [data.id]);	
	}

	static async getByUserId (data) {

		let query = `SELECT * FROM ${TABLE} WHERE origin_uuid=?`;
		
		let res = await db.query(query, [data.userId]);

		return res ? res : null;
	}
}

module.exports = LoggerModel;