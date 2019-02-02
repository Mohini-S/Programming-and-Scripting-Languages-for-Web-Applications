<?php
// Add player in DB
$bad_chars = array('$','%','?','<','>','php');
$salt = "7zUT7SR7"; //Used for Encryption of Password

#Create and Check DB functions
function get_db_handle() {
     $host = 'localhost';
     $user = 'root';
     $password = '';
     $database = 'ags_03';
     if(!($db = mysqli_connect($host, $user, $password, $database))) {
          write_error_page('SQL ERROR: Connection failed: '.mysqli_error($db));
     }
     return $db;
}

# close connection
function close_connector($db) {
    mysqli_close($db);
}
#Store data in DB
function check_post_only() {
     if(!$_POST) {
          write_error_page("This scripts can only be called from a form.");
          exit;
     }
}

function processData(){
     global $bad_chars;
     $params = array();
     $params[] = trim(str_replace($bad_chars, "",$_POST['fname'])); #0
     $params[] = trim(str_replace($bad_chars, "",$_POST['lname'])); #1
     $params[] = trim(str_replace($bad_chars, "",$_POST['email'])); #2
     $params[] = trim(str_replace($bad_chars, "",$_POST['uname'])); #3
     $params[] = trim(str_replace($bad_chars, "",$_POST['dob']));#4
     $params[] = trim(str_replace($bad_chars, "",$_POST['favouriteGame'])); #5
     $params[] = trim(str_replace($bad_chars, "",$_POST['phone'])); #6
     $params[] = trim(str_replace($bad_chars, "",$_POST['phoneType'])); #7
     $params[] = trim(str_replace($bad_chars, "",$_POST['password']));#8
     $params[] = trim(str_replace($bad_chars, "",$_POST['cpassword']));#9

     return $params;
}

function validateData($params){
     $msg = "";
     if(strlen($params[0]) == 0)
     $msg .= " fname";
     if(strlen($params[1]) == 0)
     $msg .= " lname";
     if(strlen($params[2]) == 0)
     $msg .= " email";
     if(!filter_var($params[2], FILTER_VALIDATE_EMAIL))
     $msg .= " inmail";
     if(strlen($params[3]) == 0)
     $msg .= " uname";
     if(strlen($params[4]) == 0)
     $msg .= " dob";
     if(strlen($params[4]) != 0)
     {
       list($yyyy,$mm,$dd) = explode('-',$params[4]);
       if (!checkdate($mm,$dd,$yyyy)) {
             $msg .= " ind";
       }
     }
     if(strlen($params[5]) == 0)
     $msg .= " fav";
     if(strlen($params[6]) == 0)
     $msg .= " phone";
     if(!preg_match("/^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/", $params[6])) {
          $msg .= " pin";
     }
     if(strlen($params[7]) == 0)
     $msg .= " phntype";
     if(strlen($params[8]) == 0)
     $msg .= " pass";
     if(strlen($params[9]) == 0)
     $msg .= " cpass";

     if($msg) {
       echo "$msg";
       exit;
     }
}

#Insert the values in DB
function store_in_db($params){
     global $salt;
     $pass = crypt($params[8], $salt);
     $db = get_db_handle();
     $sql = "INSERT INTO players(screenName, firstName,lastName,email,dob, encryptedPassword, dateJoined, lastLogin) ".
    "VALUES('$params[3]','$params[0]','$params[1]','$params[2]','$params[4]', '$pass', now(), now());";
    mysqli_query($db,$sql);
    $count = mysqli_affected_rows($db);
    echo("There were $count rows affected ");
    close_connector($db);
}

check_post_only();
$params = processData();
validateData($params);
store_in_db($params);
?>
