
class HistoryValidator {

  static canInsert(data) {

		if (!data.msg || !data.socketId || !data.to || !data.type) {
      throw new Error('Something wrong in data providden!');
		}

    return true;
  }

  static canRecover(data) {

		if (!data.from || !data.to) {
      throw new Error('Something wrong in data providden!');
		}

    return true;
  }
}

module.exports = HistoryValidator;