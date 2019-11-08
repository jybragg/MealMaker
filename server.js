// const express = require("express");
// const Sequelize = require("sequelize");
// const path = require("path");
// const fs = require("fs");
// var bodyParser = require("body-parser");
// const router = require("router");

// // import the models folder
// const db = require("./models")
// var session = require("express-session");
// const app = express();

// const PORT = process.env.PORT || 8080;

// // Requiring passport as it's configured it
// var passport = require("./config/passport");

// // Body Parser
// // app.use(express.urlencoded({ extended: true }));

// // app.use(express.json());
// // app.use(express.static("public"));//Check to see if we need this folder in place of the home file. 

// // app.get("/", function(req, res) {
// //   // If the user already has an account send them to the members page
// //   if (req.user) {
// //     res.redirect("/member");
// //   }
// // res.sendFile(path.join(__dirname, "../Project2/public/signUp.html"));

// // res.render(path.join(__dirname, "../Project2/views/pages/index.ejs"));
// // });
// app.use(bodyParser.urlencoded({ extended: false })); //For body parser
// app.use(bodyParser.json());
// app.use(express.static("public"));
// //
// //we are doing a GET to test if our server is working fine
// app.get('/', function (req, res) {
//   res.send('Welcome to Passport with Sequelize and without HandleBars');
// });

// // create account page 
// app.get('/createaccount', function (req, res) {
//   res.render('pages/createaccount');
// });

// // We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// require("./routes/htmlRoutes.js")(app);
// require("./routes/search-apiroutes.js")(app);
// require("./routes/api-routes")(app);

// // var routes = require("./controllers/burgers_controller.js");
// // app.use("/", routes);

// // Syncing our sequelize models and then starting our Express app
// db.sequelize.sync().then(function () {
//   app.listen(PORT, function () {
//     console.log("App listening on PORT " + PORT);
//   });
// });
//===============================================================================================================//
// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
const Sequelize = require("sequelize");
const path = require("path");
const router = require("router");
// Requiring passport as we've configured it
var passport = require("./config/passport");
//
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");
//
// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});