<?php
// Start a new session after successful login of player 
session_start();
$_SESSION["key"] = "789456123";
include 'loggedInHeader.php';
include 'home.php';
include 'footer.php';
?>
