<?php
// Log out page. End session once logged out
include 'header.php';
session_destroy();
include '../index.php';
include 'footer.php';
?>
