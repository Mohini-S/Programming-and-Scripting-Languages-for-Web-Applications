// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route file for game release page

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//To do: Calc timeLeft and pass OR calc in JS
  res.render('gameRelease');
});

module.exports = router;
