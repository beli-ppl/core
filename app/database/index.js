var mysql = require('mysql');

class Database {
  constructor() {
    this.username = process.env.USER_DATABASE;
    this.password = process.env.PASSWORD_DATABASE;
    this.host = process.env.HOST_DATABASE;
    this.database_name = process.env.DATABASE_NAME;
  }

  doQuery(query) {
    var connection = mysql.createConnection({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.database_name,
    })

    connection.query(query, (error, results, fields) => {
      if (error) {
        throw error;
      }
    })

    connection.end((error) => {
      if (error) {
        throw error;
      }
    })
  }
}

module.exports = Database;