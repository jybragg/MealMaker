const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const router = require("router");

// import the models folder
const db = require("./models")
var session = require("express-session");
const app = express();

const PORT = process.env.PORT || 8080;

// Requiring passport as it's configured it
var passport = require("./config/passport");

// Body Parser
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static("public"));//Check to see if we need this folder in place of the home file. 

app.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/member");
  }
  // res.sendFile(path.join(__dirname, "../Project2/public/signUp.html"));

  // res.render(path.join(__dirname, "../Project2/views/pages/index.ejs"));
});

//
// create account page 
app.get('/createaccount', function(req, res) {
  res.render('pages/createaccount');
});

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/htmlRoutes.js")(app);
require("./routes/search-apiroutes.js")(app);
require("./routes/api-routes")(app);

// var routes = require("./controllers/burgers_controller.js");
// app.use("/", routes);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
