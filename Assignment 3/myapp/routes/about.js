// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route file for about page
  
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about');
});

module.exports = router;
