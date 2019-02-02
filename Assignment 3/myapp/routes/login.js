// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route file for login page

var express = require('express');
var router = express.Router();

// Establish connection with database
var mysql = require("mysql");
var connection = mysql.createConnection({
        user: 'agsroot',
        password: 'ags',
        host: process.env.DATABASE_HOST,
        database: 'ags_03',
        port: '3306'
    });

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* POST login page. */
router.post('/', function(req, res, next) {
	var form_data = req.body;

	var username = form_data.username;
	var password = form_data.password;

	var encrypted_pass = password;

	var sql = " \
	SELECT 1 \
	FROM `players` \
	WHERE `screenName`='" + username + "' AND encryptedPassword='"+ encrypted_pass +"' \
	LIMIT 1;";
	
	//Check is the username and password are valid 
	console.log(sql);
	connection.connect(function (err) {
        // if (err) {
        //     console.error("Error in connection\n" + err.stack);
        //     return null;
        // }
        // console.log("Connected successfully");
        connection.query(sql, function(err, result, fields) {
        	console.log()
		if(err) {
			res.send({
		      "code":400,
		      "failed":"Database Error"
		    });
		}
		else if (result.length > 0) {
			req.session.logged_in = true;
			req.session.uname = username;
			res.redirect('/');
		}
		else {
			var error = 'Error: Invalid username or Password';
			res.render('login', {error: error});
		}
	});
    });
});

module.exports = router;
