let db 			= require('../database/mysql');

const TABLE = 'users';

class UserModel {

	static async save (data) {

		let query = `INSERT INTO ${TABLE} SET name=?, email=?, pass=?, token=?`;
		
		return await db.query(query, [data.name, data.email, data.pass, data.token]);
	}

	static async update (data) {

		let query = `UPDATE ${TABLE} SET name=?, email=?, pass=?, token=? WHERE id=?`;
		
		return await db.query(query, [data.name, data.email, data.pass, data.token, data.id]);
	}

	static async updateToken (data) {

		let query = `UPDATE ${TABLE} SET token=? WHERE id=?`;
		
		return await db.query(query, [data.token, data.id]);
	}

	static async delete (data) {

		let query = `DELETE FROM ${TABLE} WHERE id=?`;
		
		return await db.query(query, [data.id]);
	}

	static async getByName (data) {

		let query = `SELECT * FROM ${TABLE} WHERE name=?`;
		
		let res = await db.query(query, [data.name]);

		return res && res[0] ? res[0] : null;
	}

	static async getByEmail (data) {

		let query = `SELECT * FROM ${TABLE} WHERE email=?`;
		
		let res = await db.query(query, [data.email]);

		return res && res[0] ? res[0] : null;
	}

	static async getById (data) {

		let query = `SELECT * FROM ${TABLE} WHERE id=?`;
		
		let res = await db.query(query, [data.id]);

		return res && res[0] ? res[0] : null;
	}
}

module.exports = UserModel;