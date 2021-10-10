const RoomModel = require('../business/room.model')

class RoomValidator {

  static canCreate(data) {
    
    if (!data.roomName || !data.userId || !data.type) {
      throw new Error('Something wrong in name providden!');
		}

		if (!Object.values(RoomModel.getRoomTypes()).includes(data.type))
			throw new Error('Invalid type providden!');

    return true;
  }

  static canJoin(data) {

		if (!data.userId || !data.roomName || !data.socketId) {
			throw new Error('Something wrong in data providden!');
		}

		return true; 
	}

  static canLeave(data) {

		if (!data.socketId)
			throw new Error('canLeave: Something wrong in data providden!');

		return true; 
	}

  static canGetUsersOfRoom(data) {
		
		if (!data.roomName) {
			throw new Error('Something wrong in roomName providden!');
		}

		return true; 
	}

  static getUserBySocketId(data) {
		
		if (!data.socketId) {
			throw new Error('Something wrong in id providden!');
		}

		return true; 
	}

  static getUserByUserId(data) {
		
		if (!data.uid) {
			throw new Error('Something wrong in parameters providden!');
		}

		return true; 
	}
}

module.exports = RoomValidator;