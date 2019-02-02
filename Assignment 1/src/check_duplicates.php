<?php
// Checks if the player with Username and email is already present in DB.
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'ags_03';
if(!($db = mysqli_connect($host, $user, $password, $database))) {
     write_error_page('SQL ERROR: Connection failed: '.mysqli_error($db));
}
$uname =$_GET['uname'];
$email =$_GET['email'];

$sql = "select screenName, email from players where screenName = '$uname' or email='$email';";
$result = mysqli_query($db, $sql);
$count = mysqli_affected_rows($db);
mysqli_close($db);
if($count > 0){
     while($row=mysqli_fetch_row($result)) {
          $i=1;
          $output="";
          foreach(array_slice($row,0) as $item){
               if($i===1&&$uname===$item){
                    $output="uname";
               }
               else if($i==2&&$email===$item){
                    $output=$output."email";
               }
               $i++;
          }
     }
  echo "$output";

}
else if($count == 0)
    echo "OK";
else
    echo "ERROR, failure ".$count;
?>
