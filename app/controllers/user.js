var express     = require('express'),
    db          = require('./db.js'),
    mysql       = require('mysql'),
    router      = express.Router();

router.post('/google', (req, res) => {
  let seletUserQuery = 'SELECT * FROM user WHERE email=?';
  let selectUserItems = [req.body.email];

  db.query(seletUserQuery, selectUserItems, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      if (results.length == 0) {
        let insertUserQuery = 'INSERT INTO user(email, password, name, height, width) VALUES (?, 06071998, ?, 100, 100)';
        let insertUserItems = [req.body.email, req.body.name];

        db.query(insertUserQuery, insertUserItems, (error, results, fields) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).json({
              status: 1,
              message: 'success login google',
              data: {
                id: results.insertId,
                email: req.body.email,
                name: req.body.name, 
                height: 100,
                width: 100,
              }
            })
          }
        })
      } else {
        res.status(200).json({
          status: 1,
          message: 'success login google',
          data: results[0],
        })
      }
    }
  })
})

module.exports = router;