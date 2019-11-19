// Requiring path to use relative routes to our views
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // Routes
  app.get("/", function (req, res) {
    res.render("index");
  });

  // app.get("/search", function (req, res) {
  //   res.render("search");
  // });

  app.get("/guest", function (req, res) {
    res.render("guest");
  }); 

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  //isAuthenticated middleware to
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
  });
}


