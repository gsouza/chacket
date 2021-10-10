const RoomValidator = require('../service/room.validator');
const RoomService = require('../service/room.handler');

class RoomController {

  static async create (req, res) {

    try {
			RoomValidator.canCreate(req.body);

      return res.json(await RoomService.create(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }

  static async getAllRooms (req, res) {

    try {
      res.json(await RoomService.getAllRooms());
    }
    catch (e) {
      return res.json({success:false});
    }
  }
 
  static async joinRoom (req, res) {

    try {
			RoomValidator.canJoin(req.body);

      res.json(await RoomService.joinRoom(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }

	static async leaveRoom (req, res) {
    try {
			RoomValidator.canLeave(req.body);

      res.json(await RoomService.leaveRoom(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }
	
	static async getUsersOfRoom (req, res) {
		try {
			RoomValidator.canGetUsersOfRoom(req.params);

      res.json(await RoomService.getUsersOfRoom(req.params));
    }
    catch (e) {
      return res.json({success:false});
    }
	}

	static async getUserBySocketId (req, res) {
		try {
			RoomValidator.getUserBySocketId(req.params);

      res.json(await RoomService.getUserBySocketId(req.params));
    }
    catch (e) {
      return res.json({success:false});
    }
	}

	static async getUserByUserId (req, res) {
		try {
			RoomValidator.getUserByUserId(req.params);

      res.json(await RoomService.getUserByUserId(req.params));
    }
    catch (e) {
      return res.json({success:false});
    }
	}
}

module.exports = RoomController;
