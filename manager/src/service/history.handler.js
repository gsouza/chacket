const HistoryModel = require('../business/history.model')
const RoomOcupation = require('../business/roomOcupation.model');
const moment = require('moment');

class HistoryHandler {

	static async insert(data) {

		if (data.type === 'public')
			return await this._insertLogPublic(data);
		
		else if (data.type === 'private')
			return await this._insertLogPrivate(data);
  }

  static async _insertLogPublic(data) {

		let res = await RoomOcupation.getUserBySocketId({socketId: data.socketId});

		if (!res)
			return console.log('error on getting user by socket', res);

		let arg = {
			to: data.to,
			msg : data.msg,
			type : data.type,
			fromId: res.user_id,
		};
    
		let inserted = await HistoryModel.insert(arg);
		
		return { success: inserted.affectedRows > 0 };
  }

  static async _insertLogPrivate(data) {

		let arg = {
			to: data.to,
			msg : data.msg,
			type : data.type,
			fromId: data.userId,
		};
    
		let res = await HistoryModel.insert(arg);
		
		return { success: res.affectedRows > 0 };
  }

	static async recover(data) {
		
		let res = await HistoryModel.recoverByUserId(data);

		if (!res)
			return { success: false };

		let _data = [];
		res.forEach(element => {
				_data.push({
					username: element.name,
					text: element.msg,
					time: moment(element.created_at).utcOffset("-03:00").format('HH:mm:ss'),
				})
		});

		return { success: true, data: _data};
	}

}

module.exports = HistoryHandler;