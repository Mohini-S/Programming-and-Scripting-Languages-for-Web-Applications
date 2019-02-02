<?php
// Header to be displayed when player is logged in
echo ('<!DOCTYPE html>
<html>
<head>
     <meta charset="utf-8">
     <title>AGS Inc</title>
     <link rel = "stylesheet" href = "../resources/font-awesome-4.7.0/css/font-awesome.min.css">
     <link rel = "stylesheet" href = "../resources/bootstrap-3.3.7-dist/css/bootstrap.min.css">
     <script src = "../resources/js/jquery-3.3.1.min.js"></script>
     <script src = "../resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
     <link rel="stylesheet" href="../resources/css/mycss.css">
     <script src="../resources/js/my_js.js"></script>
</head>
<body>
     <div class="site-wrapper">
          <header class="site-header">
               <nav class="navbar navbar-default navbar-fixed-top">
                    <div class="navbar-header">
                         <a class="navbar-brand" id="home" href="/index.php">Aztec Game Studios</a>
                    </div>
                    <ul class="nav navbar-nav">
                         <li><a href="/index.php">Home</a></li>
                         <li><a class="aboutPage" id="home" href="/src/about.php">About</a></li>
                         <!-- <li><a class="registerPage" id="home" href="/index.html">Registration</a></li> -->
                         <li><a class="gameReleasePage" id="home" href="/src/gameRelease.php">Game Release</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">

                         <li><a class = "logout" id = "logout" href="/src/logout.php"><span class="glyphicon glyphicon-user blue"></span>Logout</a></li>
                    </ul>
               </nav>
          </header>');

?>
