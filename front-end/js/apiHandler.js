// const BASEURL = 'localhost:45000'; 		/**PARA RODAR NO LOCALHOST 	*/
const BASEURL = '177.71.204.157:45000';		/**PARA RODAR NO SERVER 		*/

class ApiHandler  {

  static assemblyAddr = (endpoint) => {
    return `http://${BASEURL}/${endpoint}`;
  }

  static getAjaxConfig(method, endPoint) {
    return {
      method  : method,
      url     : this.assemblyAddr(endPoint),
      headers : this.getHeaders(),
    }
  }

	static getHeaders () {
		let head =  { 
			apikey : '65c43929ef38a26e5535f5ed8d5c63499b66252e',
			token : sessionStorage.getItem("token"),
			uid : sessionStorage.getItem("uid"),
		}
		return head;
	}

  static _ajax(config, cb) {
    $.ajax({
      url: config.url,
      data: config.data || null,
      type: config.method,
      method: config.method,
      headers: config.headers,

      success: function(data) {
				if (data  && data.token)
					sessionStorage.setItem("token", data.token);
				if (cb)
					cb(data);
			},      
      error: function (err){
        console.log(err);
      }
    });
  }

  static get(endPoint, callback) {
    let config = {
      method  : 'GET',
      url     : this.assemblyAddr(endPoint),
      headers : this.getHeaders(),
    }
    ApiHandler._ajax(config,callback);
  }
  
  static post(endPoint, data, callback) {
    let config = {
      method  : 'POST',
      url     : this.assemblyAddr(endPoint),
      headers : this.getHeaders(),
      data    : data
    }
    ApiHandler._ajax(config,callback);
  }

  static put(endPoint, data, callback) {
    let config = {
      method  : 'PUT',
      url     : this.assemblyAddr(endPoint),
      headers : this.getHeaders(),
      data    : data
    }
    ApiHandler._ajax(config,callback);
  }

  static delete(endPoint, data, callback) {
    let config = {
      method  : 'DELETE',
      url     : this.assemblyAddr(endPoint),
      headers : this.getHeaders(),
      data    : data
    }
    ApiHandler._ajax(config,callback);
  }
}