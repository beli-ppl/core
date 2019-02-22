require('dotenv').config();

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Step = require('./app/models/Step.js');
var User = require('./app/models/User.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/step_counter', require('./app/controllers/step_counter.js'));

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'hooray welcome to our api!',
    data: {
      'env_user': process.env.HOST_DATABASE,
    }
  });
})

router.get('/coba', (req, res) => {
  console.log(Database);
  database = new Database();
  database.doQuery('SELECT * FROM user');

  res.json({
    message: 'mantap jiwa',
  })
})

app.listen(port);
console.log('Magic happens on port ' + port);
