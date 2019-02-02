// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route for index page

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
