const moment = require('moment');

class HandShaker {
  
  static registerLog (req) {
    console.warn(' ');
    console.warn(`==> new request :: from [${req.ip}] (${moment().utcOffset("-03:00").format('DD/MMM/YYYY HH:mm:ss')})`);
    console.warn(`${this.name} :: ${req.body}:${req.params}:${req.headers}:${req.method}:${req.path}:${req.ip}:${req.ips}`);
    return ;
  }

  static isAuthorized (req, res, next) {

    if (!req || !req.body || !req.headers || !req.headers.apikey || (req.headers.apikey != process.env.HANDSHAKER_SHA1))
      return HandShaker.registerLog(req);
		
		console.warn(`${req.method}:${req.path}`);
    next();
  }

  static async notAllowed (req, res) {
    console.warn(`Trying to access not allowed EndPoint :: ${req.ips} : ${req.ip} : ${req.path} : ${req.method}`);
  }
}

module.exports = HandShaker;
