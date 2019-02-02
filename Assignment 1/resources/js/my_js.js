$(document).ready(function() {
     clearErrors();
     //Countdown timer for game release
     //learned about countdown timer from W3schools https://www.w3schools.com/howto/howto_js_countdown.asp
     var countDownDate = new Date("Oct 31, 2018 18:00:00").getTime();
     var x = setInterval(function() {
          var now = new Date().getTime();
          var distance = countDownDate - now;
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          $('.row-timer').html(days + " : " + hours + " : " + minutes + " : " + seconds);
          if (distance < 0) {
               $('.gameRelease').hide();
          }
     }, 1000);

     //Clear errors on registration page
     function clearErrors() {
          $(".required+span").css("display","none");
          $('.duplicateEmail').hide();
          $(".invalidEmail").hide();
          $(".passwordmismatch").hide();
          $(".invalidDob").hide();
          $(".invalidPhone").hide();
          $(".requiredDropDown+span").css("display", "none");
     }

     $('#reset').click(function () {
       clearErrors();
     });

     $('#register').click(function () {
       clearErrors();
     });

     //Validate Email
     $("#email").blur(function () {
          $("#email").next('span').hide();
          $(".invalidEmail").hide();
          validateEmail();
     });

     function validateEmail() {
          var emailRegex = new RegExp(/^[._%+-A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
          var playerEmail =$("#email").val().toLowerCase();
          if (!emailRegex.test(playerEmail) & playerEmail.trim().length!=0) {
               $(".invalidEmail").show();
               return false;
          }
          else if(playerEmail.trim().length==0){
               $("#email").next('span').show();
               $(".invalidEmail").hide();
               return false;
          }
          else if(emailRegex.test(playerEmail)){
               $(".invalidEmail").hide();
               $("#email").next('span').hide();
               return true;
          }
     }

     //Validate passwords
     $("#cpassword").blur(function () {
          $(".passwordmismatch").hide();
          matchPassword();
     });

     function matchPassword() {
          if($("#password").val() !== $("#cpassword").val())
          {
               $(".passwordmismatch").show();
               return false;
          }
          else
               return true;
     }
     //Validate DOB
     $("#dob").blur(function () {
          validateDob();
     });

    function validateDob() {
         $(".invalidDob").hide();
         if ($('#dob').val().length==10) {
              var date= $('#dob').val();
              var playerDob=new Date(date);
              if ( isNaN(playerDob.valueOf()) ) {
                   $(".invalidDob").show();
                   return false;
              }
         }
         else if($('#dob').val().length<10&&$('#dob').val().length!=0){
              $(".invalidDob").show();
              return false;
         }
         return true;
    }

    $('#phone').blur(function () {
         validatePhone();
    });

    function validatePhone(){
         $(".invalidPhone").hide();
         if($('#phone').val().length == 0){
              $(".invalidPhone").show();
              return false;
         }
         else{
              var phoneRegEx = new RegExp(/^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/); //(###)-###-####
              if(!phoneRegEx.test($('#phone').val())){
                   $(".invalidPhone").show();
                   return false;
              }
              else
              return true;
         }
    }

    $(".required").blur(function () {
         length = $(this).val().trim().length;
         if(length==0)
               $(this).next('span').show();
          else
               $(this).siblings('span').hide;
     });

    $('.required').keydown(function(key) {
         length = $(this).val().trim().length;
         if(length==0)
              $(this).siblings('span').hide();
     });

    $(document).on('click', '#submit',function (e) {
         e.preventDefault();
         $(".duplicateEmail").hide();
         if($("#fname").val().trim()==""){
              $("#fname+span").show();
              return false;
         }
         else if($("#lname").val().trim()==""){
              $("#lname+span").show();
              return false;
         }
         else  if($("#email").val().trim()==""){
              $("#email+span").show();
              return false;
         }
         else if(!validateEmail()){
              return false;
         }
         else if($("#dob").val().trim()==""){
              $("#dob+span").show();
              return false;
         }
         else if(!validateDob()){
              return false;
         }
         validateForm();

         //Check for duplicates ie if player with same email and username already exists
         e.preventDefault();
         var params = "uname=" + $('#uname').val() + "&email=" + $('#email').val();
         var url = "check_duplicates.php?"+params;
         var dup_response = $.get(url, duplicate_handler);
         function duplicate_handler(dup_response){
              clearErrors();
              if(dup_response == "email"){
                   $('.duplicateUname').hide();
                   $('.duplicateEmail').show();
              }
              else if(dup_response == "uname"){
                   $('.duplicateUname').show();
                   $('.duplicateEmail').hide();
              }
              else if(dup_response == "OK"){
                   validateForm();
              }
              else{
                   $('.duplicateUname').show();
                   $('.duplicateEmail').show();
              }
         }

         function validateForm() {
              var form_data = new FormData($('form')[1]);
              $.ajax( {
                   url: "../../src/validateRegistrationPage.php",
                   type: "post",
                   data: form_data,
                   processData: false,
                   contentType: false,
                   success: function(response) {
                        showPhpErrors(response);
                        showSuccess(response);
                   },
                   error: function(response) {
                        alert("Error occured");}
               });
          }
          function showSuccess(response){
               $('.container').hide();
               $('.successContainer').show();
               $('.onSuccess').html("You are Successfully registed on Aztec Game Studios. Please log-in to continue using your account.");
          }

          function showPhpErrors(response) {
               clearErrors();
               if (response.indexOf("fname") >=0)  $("#fname+span").show();
               if (response.indexOf("lname") >=0) $("#lname+span").show();
               if (response.indexOf("phone") >=0) $("#phone+span").show();
               else if (response.indexOf("pin") >=0)  $(".invalidPhone").show();
               if (response.indexOf("email") >=0)  $("#email+span").show();
               else if (response.indexOf("inmail") >=0)  $(".invalidEmail").show();
               if (response.indexOf("dob") >=0)   $("#dob+span").show();
               else if (response.indexOf("ind") >=0)  $(".invalidDob").show();
               if (response.indexOf("phntype") >=0)  $("#phoneType+span").show();
               $('#myFormloader').show();
          }
          return false;
     });


      $(document).on('click', '#loginbtn',function (e) {
           e.preventDefault();
           if($("#username").val().trim()==""){
                $("#username+span").show();
                return false;
           }
           else if($("#pass").val().trim()==""){
                $("#pass+span").show();
                return false;
           }
           validateLogin();


      function validateLogin(){
           var form_data = new FormData($('form')[0]);
           $.ajax( {
                url: "../../src/validateLoginDetails.php",
                type: "post",
                data: form_data,
              processData: false,
              contentType: false,
              success: function(response) {
                   console.log(response);
                   if(response == "Invalid"){
                         $("#validityCheck").innerHTML = "Login Unsuccessful. Make sure the username and password is correct.";
                         alert("Login Unsuccessful. Make sure the username and password is correct.");
                    }
                    else if(response == "Valid"){
                         console.log(response);
                         // $("#validityCheck").innerHTML = "Login Successful";
                         window.location = "/src/login.php";
                         return true;
                    }
              },
              error: function(response) {
                   alert("Invalid User");
              }
          });
          return false;
      }
      });

});  //closing of $(document).ready(function()
