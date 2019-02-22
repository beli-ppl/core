var mysql = require('mysql');

class Database {
  constructor() {
    this.username = process.env.USER_DATABASE;
    this.password = process.env.PASSWORD_DATABASE;
    this.host = process.env.HOST_DATABASE;
    this.port = process.env.PORT_DATABASE;
    this.database_name = process.env.DATABASE_NAME;
  }

  doQuery(query) {
    var connection = mysql.createConnection({
      host: this.host,
      port: this.port,
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

  insertStepCount(step) {
    let connection = mysql.createConnection({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.database_name,
    })

    let query = 'INSERT INTO step (user_id, timestamp, count_step) VALUES (?, ?, ?)';
    let items = [step.user_id, step.timestamp, step.count_step];

    connection.query(query, items, function(error, results, fields) {
      if (error) {
        let response = {
          message: 'Insert jumlah langkah gagal',
          code: 400,
          data: null
        }

        return response;
      } else {
        let response = {
          message: 'Insert jumlah langkah berhasil',
          code: 200,
          data: step
        }

        console.log(response)
        return response;
      }
    })

    connection.end(function(error) {
      if (error) {
        throw error;
      }
    })
  }

  getLatestStepCount(user) {
    let connection = mysql.createConnection({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.database_name,
    })

    let query = 'SELECT * FROM step WHERE user_id = ? ORDER BY DESC LIMIT 1';
    let items = [user.id];

    connection.query(query, items, function(error, results, fields) {
      if (error) {
        let response = {
          message: 'Get jumlah langkah gagal',
          code: 400,
          data: null
        }

        this.response = response;
      } else {
        let response = {
          message: 'Get jumlah langkah berhasil',
          code: 200,
          data: results
        }

        this.response = response;
      }
    })

    connection.end(function(error) {
      if (error) {
        throw error;
      }
    })
  }
}

module.exports = Database;
