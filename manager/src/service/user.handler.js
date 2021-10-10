const LoggerHandler = require('./logger.handler');
const UserModel = require('../business/user.model');
const bcrypt		= require('bcrypt');
const crypto		= require('crypto');
const SALT 			= 10;

class UserHandler {

	static async login (data) {
		
		let res = await UserModel.getByEmail({email: data.email});

		if (!res)
			return {success: false, data: 'Credenciais inválidas!'};
			
		let isAllow = bcrypt.compareSync(data.pass, res.pass);
		
		let token = await this._updateToken(res.id);
		
		let r = {
			success: isAllow,
			token	 : isAllow ? token : null,
			data	 : isAllow ? { uid: res.id, uname: res.name }:'Credenciais inválidas!',
		};
		
		await LoggerHandler.userActivity({userId: res.id, destination: `LOGIN`, evidence: res.name });

		return r;
	}

	static async addNew (data) {
		
		let res = await UserModel.getByEmail({email: data.email});
		if (res && res.id)
			return {success: false, data: 'Email já em uso'};

		data.token = this._genToken();

		data.pass = bcrypt.hashSync(data.pass, bcrypt.genSaltSync(SALT));

		res = await UserModel.save(data);
		
		let success = res.affectedRows > 0;
		if (!success)
			return {success: false, data: null};

		await LoggerHandler.userActivity({userId: res.insertId, destination: `ADDNEW`, evidence: data.name });

		return ({
			success: true,
			data: { 
				lastId : res.insertId,
			},
			token : data.token
		});
	}

	static async update (data, params) {
		
		let res = await UserModel.getById({id: params.id});
		
		if (!res || !res.id)
			return {success: false, data: 'Usuário não encontrado'};

		if (data.email != res.email) {
			res = await UserModel.getByEmail({email: data.email});
			if (res && res.id)
				return {success: false, data: 'Email já em uso'};
		}

		data.id = params.id;
		data.token = this._genToken();
		data.pass = bcrypt.hashSync(data.pass, bcrypt.genSaltSync(SALT));

		res = await UserModel.update(data);
		
		let success = res.affectedRows > 0;
		
		await LoggerHandler.userActivity({userId: res.id, destination: `${data.name} - UPDATE`, success});

		return ({
			success: success,
			token : success ? data.token : null
		});
	}

	static async getByName (data) {
		
		let res = await UserModel.getByName({name: data.name});
		if (!res)
			return {success: false, data: 'Usuário não encontrado'};
		
		let _data = []
		res.forEach(element => {
			_data.push({
				email: element.email,
				name: element.name,
				id: element.id,
			});
		});
		
		return ({
			success: true, 
			data: _data,
			token : await this._updateToken(res.id)
		});
	}

	static async delete (data) {

		let res = await UserModel.getByEmail({email: data.email});
		if (!res.id)
			return {success: false, data: 'Usuário não encontrado'};
		
		res = await UserModel.delete({id: res.id});

		let success = res.affectedRows > 0;

		await LoggerHandler.userActivity({userId: res.lastInsertedId, destination: `${data.name} - DELETE`, success});
		return ({
			success: success, 
			token : success ? await this._updateToken(res.id) : null
		});
	}

	static _genToken() {
		return crypto.randomBytes(30).toString('hex');
	}

	static async _updateToken(id) {
		
		let token = this._genToken();

		let res = await UserModel.updateToken({ id , token });
		
		return res.affectedRows > 0 ? token : null;
	}
}

module.exports = UserHandler;