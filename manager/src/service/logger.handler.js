const LoggerModel = require('../business/logger.model')

const EVIDENCE_TYPES = {
	updating: 'ROOM UPDATING',
  creation: 'ROOM CREATION',
  deletion: 'ROOM DELETION',
	private	: 'PRIVATE MSG' ,
	public	: 'PUBLIC MSG',
	user		: 'USER ACTIVITY',
}

class LoggerHandler {

	static async createRoom(data) {

		data.evidence = `${EVIDENCE_TYPES.creation}:: ${data.type} - ${data.evidence}`;

    return await this._insertLog(data)
  }

	static async updateRoom(data) {

		data.evidence = `${EVIDENCE_TYPES.updating}:: ${data.evidence}`;

    return await this._insertLog(data)
  }

	static async deleteRoom(data) {

		data.evidence = `${EVIDENCE_TYPES.deletion}:: ${data.evidence}`;

    return await this._insertLog(data)
  }

	static async deleteLog(data) {

    let res = await LoggerModel.delete(data);
		
		return { success: res.affectedRows > 0 };
  }
	
	static async userActivity(data) {

		data.evidence = `${EVIDENCE_TYPES.user}:: ${data.evidence}`;

    return await this._insertLog(data)
	}

  static async _insertLog(data) {

    let res = await LoggerModel.insert(data);
		
		return { success: res.affectedRows > 0 };
  }
}

module.exports = LoggerHandler;