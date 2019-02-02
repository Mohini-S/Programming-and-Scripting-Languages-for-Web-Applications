<?php
// Checks if session in progress and accordingly include the appropriate header
session_start();
if(isset($_SESSION["key"])) {
     include 'loggedInHeader.php';
}
else{
     include 'loginRegisterHeader.php';
}
?>
