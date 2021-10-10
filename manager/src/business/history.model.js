const db = require('../database/mysql');
const TABLE = 'history';

class HistoryModel {

	static async insert (data) {

		let query = `INSERT INTO ${TABLE} SET from_id=?, \`to\`=?, msg=?, type=?; `;
		
		return await db.query(query, [data.fromId, data.to, data.msg, data.type]);
	}

	static async recoverByUserId (data) {

		let query = `SELECT * FROM ${TABLE} h
								LEFT JOIN users u on u.id=h.from_id
								WHERE (from_id=? AND \`to\`=?) OR (\`to\`=? AND from_id=?)
								AND type='PRIVATE'
								ORDER by h.created_at ASC
								LIMIT 100`;
		
		let res = await db.query(query, [data.from, data.to, data.from, data.to]);

		return res ? res : null;
	}
}

module.exports = HistoryModel;