console.log("login.js connected");

// code that handles user login
$(document).ready(function () {

    let emailLog;
    let passLog;
  
    $("#logInBtn").on("click", function (event) {
      console.log("login was clicked");
      event.preventDefault()
      emailLog = $("#emailLog").val().trim()
      passLog = $("#passLog").val().trim()
  
      var user_data = {
        email: emailLog,
        password: passLog
      };
  
      if (!user_data.email || !user_data.password) {
        return;
      }
  
      loginUser(user_data.email, user_data.password);
      $("#emailLog").val("");
      $("#passLog").val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function (data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function (err) {
        console.log(err);
      });
    }
  });
