console.log("signup.js connected")

$(document).ready(function () {

  let emailSign_up;
  let passwordSign_up;

  $("#signUpBtn").on("click", function (event) {
    console.log("register was clicked");
    event.preventDefault()
    emailSign_up = $("#emailSign_up").val().trim()
    passwordSign_up = $("#passwordSign_up").val().trim()

    var user_data = {
      email: emailSign_up,
      password: passwordSign_up,
    }

    if (!user_data.email || !user_data.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(user_data.password, user_data.email);

    $("#emailSign_up").val("");
    $("#passwordSign_up").val("");

  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
      
     
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});