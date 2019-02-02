// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route page for logout

var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
	 req.session.destroy(function(err) {
	      
	   });
	 res.redirect('/');
});

module.exports = router;
