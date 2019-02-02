<?php
//Check if Login details are correct
$bad_chars = array('$','%','?','<','>','php');
$salt = "7zUT7SR7";

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

function check_post_only() {
     if(!$_POST) {
          write_error_page("This scripts can only be called from a form.");
          exit;
     }
}
# get username and password passed
function processData(){
     global $bad_chars;
     $params = array();
     $params[] = trim(str_replace($bad_chars, "",$_POST['username'])); #0
     $params[] = trim(str_replace($bad_chars, "",$_POST['pass'])); #1

     return $params;
}

function validateData($params){
     $msg = "";
     if(strlen($params[0]) == 0)
     $msg .= " username";
     if(strlen($params[1]) == 0)
     $msg .= " pass";

     if($msg) {
       echo "$msg";
       exit;
     }
}
# Check if username password present in db
function check_in_db($params){
     global $salt;
     $pass = crypt($params[1], $salt);
     $uname = $params[0];
     $db = get_db_handle();

    $sql = "SELECT * from players where screenName = '$uname' and encryptedPassword = '$pass'";
    mysqli_query($db,$sql);
    $count = mysqli_affected_rows($db);
    if($count == 0){
          echo("Invalid");
     }
     else {
          $sql = "UPDATE players set lastLogin = now() where screenName = '$uname'";
          mysqli_query($db,$sql);
          echo("Valid");
     }
     close_connector($db);
}

check_post_only();
$params = processData();
validateData($params);
check_in_db($params);
?>
