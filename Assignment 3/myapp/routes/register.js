// Project 3
// Mohini Salunke
// Red ID: 822049248
// Route page for register

var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
        user: 'agsroot',
        password: 'ags',
        host: process.env.DATABASE_HOST,
        database: 'ags_03',
        port: '3306'
    });


/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});


/* POST register page. */
router.post('/', function(req, res, next) {
	var form_data = req.body;
	fname = form_data.fname;
	lname = form_data.lname;
	email = form_data.email;
	username = form_data.uname;
	dob = new Date(form_data.dob).toMysqlFormat();;
	favgame = form_data.favouriteGame;
	phone = form_data.phone;
	phoneType = form_data.phoneType;
	password = form_data.password;
	cpassword = form_data.cpassword;
	encryptedPassword = password;

	//Check if the username or email exists in database
  var sql = " \
	SELECT 1 \
	FROM `players` \
	WHERE `screenName`='" + username + "' OR email='"+ email +"' \
	LIMIT 1;";

	connection.connect(function (err) {
        // if (err) {
        //     console.error("Error in connection\n" + err.stack);
        //     return null;
        // }
        // console.log("Connected successfully");
      connection.query(sql, function(err, result, fields) {
				if(err) {
					res.send({
				      "code":400,
				      "failed":"Database error"
				    });
				} 
				else if (result.length > 0) {
					var error = 'UserName or Email exists';
					res.render('register', {error: error});
					return;
				}
				else {
					// Insert the data in database
					var insert_query = "INSERT INTO players(screenName, firstName,lastName,email,dob, encryptedPassword, dateJoined, lastLogin) \
		         VALUES('"+username+"','"+fname+"','"+lname+"','"+email+"','"+dob+"','"+encryptedPassword+"',now(),now())";
		         
				  console.log(insert_query);
				  connection.query(insert_query, function (err, result, fields) {
				 		if(err) {
							res.send({
						      "code":400,
						      "failed":"Database error"
						    });
						}
						else {
							req.session.logged_in = true;
							req.session.uname = username;
							res.redirect('/');
						}
				 	});
				}
			});
  });  
});

// Reference: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}


module.exports = router;
