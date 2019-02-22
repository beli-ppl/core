var express     = require('express'),
    db          = require('./db.js'),
    mysql       = require('mysql'),
    router      = express.Router();

router.post('/', function(req, res) {
  let query = 'INSERT INTO step (user_id, timestamp, count_step) VALUES (?, ?, ?)';
  let items = [req.body.user_id, req.body.timestamp, req.body.count_step];

  db.query(query, items, function(error, results, fields) {
    if (error) {
      res.status(400).json({
        message: error
      })
    } else {
      res.status(200).json({
        message: 'success'
      })
    }
  })
})

router.get('/', function(req, res) {
  let query = 'SELECT * FROM step WHERE user_id = 1 ORDER BY id DESC LIMIT 1';
  let items = [req.body.id];

  db.query(query, items, function(error, results, fields) {
    if (error) {
      res.status(400).json(error)
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router;
