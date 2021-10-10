const UserValidator = require('../service/user.validator');
const UserHandler = require('../service/user.handler');

class UserController {

  static async login (req, res) {

    try {
			UserValidator.canLogin(req.body);

      return res.json(await UserHandler.login(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }

  static async addNew (req, res) {

    try {
			UserValidator.canAddNew(req.body);

      res.json(await UserHandler.addNew(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }

  static async getByName (req, res) {

    try {
			UserValidator.canGetByName(req.body);

      res.json(await UserHandler.getByName(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }

  static async update (req, res) {

    try {
			UserValidator.canUpdate(req.body, req.params);

      res.json(await UserHandler.update(req.body, req.params));
    }
    catch (e) {
      return res.json({success:false});
    }
  }
  
  static async delete (req, res) {

    try {
			UserValidator.canDelete(req.body);

      res.json(await UserHandler.delete(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  }
}

module.exports = UserController;
