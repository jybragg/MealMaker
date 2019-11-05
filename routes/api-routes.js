var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    app.post("/api/posts", function(req, res) {
        console.log(req.body);
        db.Post.create({
          title: req.body.title,
          body: req.body.body,
          ingredients: req.body.Ingredients,
          instructions: req.body.instructions,
        })
          .then(function(dbPost) {
            res.json(dbPost);
          });
      });

      // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      res.json("/member");
  });
// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
      console.log(req.body);
      db.User.create({
          username: req.body.username,
          password: req.body.password,
          user_identifier: req.body.user_identifier

      }).then(function () {
          res.redirect(307, "/api/login");
      }).catch(function (err) {
          console.log(err);
          res.json(err);
          //   res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/");
  });

};