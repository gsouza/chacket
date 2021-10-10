
const mysql = require("mysql");
require('dotenv').config();

let connection = null;

class SqlHandler {

  static query (query, params) {
		
		return new Promise((resolve, reject) => {
			
			connection.query(query, params, (err, res) => {  
				if (err) {
					reject({status: false, error: err});
				}
				else {
					let data = [];
					let result = (JSON.parse(JSON.stringify(res)));
					if (!Object.is(result))
						return resolve(result);
					
					for (let re of result)
						data.push(re);

					return resolve(data);
				}
			});
		});
  }

	static connect () {

		if (!connection) {
			let conn = {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE
			}
			connection = mysql.createConnection(conn);
		
			connection.connect(error => {
				if (error)
					return console.log("Error: ", error);
				
				console.log("Successfully connected to the database.");
			});
		}		
		return this;
	}

	static disconnect () {
		if (connection) {
			connection.end();
			connection = null;
		}
	}
}

module.exports = SqlHandler.connect();