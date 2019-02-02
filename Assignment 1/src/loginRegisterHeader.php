<?php
// Header content when player is not logged in
//Common header for all webpages
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

                         <li class="nav-item">
                              <a data-toggle = "dropdown" class="nav-link dropdown-toggle" href="#"><span class="glyphicon glyphicon-log-in blue"></span> Login  </a>
                              <ul class="dropdown-menu form-wrapper">
                                   <li>
                                        <form name="login_info" id="loginform" method="post" enctype="multipart/form-data">
                                             <div class="form-group">
                                                  <input class="form-control required" type="text" name = "username" class="form-control" id = "username" placeholder="UserName">
                                                  <span>Please Enter Your First Name</span>
                                             </div>
                                             <div class="form-group">
                                                  <input class="form-control required" type="password" name = "pass" class="form-control" id = "pass" placeholder="Password">
                                                  <span>Please Enter Your Password</span>
                                             </div>
                                             <input type="submit" class="btn btn-primary btn-block" value="Login" id="loginbtn">
                                        </form>
                                   </li>
                              </ul>
                         </li>
                         <li><a class = "register" id = "register" href="/src/register.php"><span class="glyphicon glyphicon-user blue"></span>Register</a></li>
                    </ul>
               </nav>
          </header>');
?>
