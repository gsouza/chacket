const HandShaker = require("./handshaker");
const RoomController = require("./room.controller");
const UserController = require("./user.controller");
const HistoryController = require("./history.controller");

class Routes {

  static configureRoutes(app) {

    app.post 	("/chatman/"					, [HandShaker.isAuthorized, RoomController.create]);
		app.post 	("/chatman/join"			, [HandShaker.isAuthorized, RoomController.joinRoom]);
		app.post 	("/chatman/leave"			, [HandShaker.isAuthorized, RoomController.leaveRoom]);
		app.get 	("/chatman/"					,	[HandShaker.isAuthorized, RoomController.getAllRooms]);
		
		app.post 	("/chatman/hist/"						,	[HandShaker.isAuthorized, HistoryController.insert]);
		app.get 	("/chatman/hist/:from/:to"	,	[HandShaker.isAuthorized, HistoryController.recover]);
		
		app.get 	("/chatman/gubuid/:uid"			, [HandShaker.isAuthorized, RoomController.getUserByUserId]);
		app.get 	("/chatman/gubsi/:socketId"	, [HandShaker.isAuthorized, RoomController.getUserBySocketId]);
		app.get 	("/chatman/guof/:roomName"	,	[HandShaker.isAuthorized, RoomController.getUsersOfRoom]);

		app.post 	("/login"							, [HandShaker.isAuthorized, UserController.login]);

    app.post 	("/user"							, [HandShaker.isAuthorized, UserController.addNew]);
		app.get 	("/user/:name"				, [HandShaker.isAuthorized, UserController.getByName]);
    app.put 	("/user/:id"					, [HandShaker.isAuthorized, UserController.update]);
    app.delete("/user/:id"					, [HandShaker.isAuthorized, UserController.delete]);

    app.all 	("*"									, [HandShaker.notAllowed]);
  }
}

module.exports = Routes;
