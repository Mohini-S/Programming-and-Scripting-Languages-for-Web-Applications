// Project 2
// Mohini Salunke
// Red ID: 822049248

$(document).ready(function() {
     clearErrors();
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
         $('form').serialize();
         $('form').submit(); 
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
           $('form').submit();
      });

});  //closing of $(document).ready(function()
