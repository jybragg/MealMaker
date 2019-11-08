var express = require('express');
var router = express.Router();
// var models = require('../models');
var db = require("../models");
var passport = require("../config/passport");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,

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

//======================================================================================================================//

//we import passport packages required for authentication
// var passport = require("passport");
// var passport = require("../config/passport");
// var LocalStrategy = require("passport-local").Strategy;
// //
// //We will need the models folder to check passport agains
// var db = require("../models");

// module.exports = function (app) {

//   // Telling passport we want to use a Local Strategy. In other words,
//   //we want login with a username/email and password
//   passport.use(new LocalStrategy(
//     // Our user will sign in using an email, rather than a "username"
//     {
//       usernameField: "email"
//     },
//     function (email, password, done) {
//       // When a user tries to sign in this code runs
//       db.User.findOne({
//         where: {
//           email: email
//         }
//       }).then(function (dbUser) {
//         // If there's no user with the given email
//         if (!dbUser) {
//           return done(null, false, {
//             message: "Incorrect email."
//           });
//         }
//         // If there is a user with the given email, but the password the user gives us is incorrect
//         else if (!dbUser.validPassword(password)) {
//           return done(null, false, {
//             message: "Incorrect password."
//           });
//         }
//         // If none of the above, return the user
//         return done(null, dbUser);
//       });
//     }
//   ));
//   //
//   // In order to help keep authentication state across HTTP requests,
//   // Sequelize needs to serialize and deserialize the user
//   // Just consider this part boilerplate needed to make it all work
//   passport.serializeUser(function (user, cb) {
//     cb(null, user);
//   });
//   //
//   passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
//   });
// }
//======================================================================================================================//

// router.post('/', function(req, res) {
//   // first fill the database with this new user's information
//   console.log(JSON.stringify(req.body));
//   models.User.find({
//       where: { username: req.body.username },
//       attributes: [ 'username' ]
//     })
//     .then(function(user) {
//       if(!user) {
//         // create that user as no one by that username exists
//         models.User
//           // all go in directly, all our field names are the same
//           .create(req.body)
//           .complete(function(err, user) {
//             if(err) {
//               throw err;
//             } else {
//               // set the flash message to indicate that user was
//               // registered successfully
//               req.flash('error', 'The user was registered successfully')
//               // finally redirect to login page, so that they can login
//               // and start using our features
//               res.redirect('/login');
//             }
//           });
//       } else {
//         // there's already someone with that username
//         res.render('register', {
//           user: req.user,
//           message: "That username already exists"
//         });
//       }
//     })
//     .catch(function(err){
//       throw err;
//     })
// });

// router.get('/', function(req, res){
//   // if already authenticated, then no need to register
//   // this is a bad case where user is meddling with the URL
//   // we just send him to our home page if so
//   if(req.isAuthenticated()) {
//     res.redirect('/');
//   } else {
//     res.render('register', { user: req.user, message: req.flash('error') });
//   }
// });


// }