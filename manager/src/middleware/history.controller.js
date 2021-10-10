const HistoryValidator = require('../service/history.validator');
const HistoryHandler = require('../service/history.handler')

class HistoryController {

  static async insert (req, res) {

    try {
			HistoryValidator.canInsert(req.body);

      return res.json(await HistoryHandler.insert(req.body));
    }
    catch (e) {
      return res.json({success:false});
    }
  } 

  static async recover (req, res) {

    try {
			HistoryValidator.canRecover(req.params);

      return res.json(await HistoryHandler.recover(req.params));
    }
    catch (e) {
      return res.json({success:false});
    }
  } 
}

module.exports = HistoryController;
