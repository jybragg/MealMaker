var express = require('express');
var router = express.Router();
var db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
var passport = require("../config/passport");


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
    // req.logout();
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  //===================================================================//

  // Get all recipes list === works
  // app.get("/api/search/", (req, res) => 
  //   db.Post.findAll()
  //   .then(posts => res.render("search", {
  //     posts
  //   }))
  //   .catch(err => console.log(err)));


  // Search for recipes
  app.get('/api/search', (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();

    db.Post.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
      .then(posts => res.render('search', { posts }))
      .catch(err => console.log(err));
  });


  // Add a gig
  app.post('/members', (req, res) => {
    let { name, url, ingredients, instructions } = req.body;
    let errors = [];

    // Validate Fields
    if (!name) {
      errors.push({ text: 'Please add a title' });
    }
    if (!ingredients) {
      errors.push({ text: 'Please add ingredients' });
    }
    if (!instructions) {
      errors.push({ text: 'Please add instructions' });
    }

    // Check for errors
    if (errors.length > 0) {
      res.render('members', {
        errors,
        name,
        url,
        ingredients,
        instructions,
      });
    } else {
      if (!url) {
        url = 'Unknown';
      };

      // Make lowercase and remove space after comma
      // technologies = technologies.toLowerCase().replace(/, /g, ',');

      // Insert into table
      db.Post.create({
        name,
        url,
        ingredients,
        instructions,
      })
        .then(posts => res.render('members', { posts }))
        // .then(posts => res.redirect('/gigs'))
        .catch(err => console.log(err));
    }
  });



  //===================================================================//

  // Route for getting all of the posts
  // app.get("/api/search/", function (req, res) {
  //   db.Post.findAll({})
  //     .then(function (dbPost) {
  //       // console.log(dbPost);
  //       res.json(dbPost);
  //     })
  //     .catch(err => console.log(err));
  // });

  // Route for getting all of the posts
  // app.get("/api/search", function (req, res) {
  //   const { term } = req.query;
  //   db.Post.findAll({
  //     where: {
  //       name: {
  //         [Op.like]: "%" + term + "%"
  //       }
  //     }
  //   })
  //   .then(posts => res.render("members", { posts }))
  //   .catch(err => console.log(err));
  // });

  // GET route for Searching by name
  // app.get("/api/search/:name", function (req, res) {
  //   db.Post.findAll({
  //     where: {
  //       name: {
  //         [Op.like]: "%" + req.params.name + "%"
  //       }
  //     }
  //   })
  //     .then(function (dbPost) {
  //       console.log(dbPost);
  //       // res.json(dbPost);
  //       res.render("search", {
  //         title: req.body.title,
  //             body: req.body.body,
  //             ingredients: req.body.Ingredients,
  //             instructions: req.body.instructions
  //       })
  //     })
  //     .catch(err => console.log(err));
  // });


  //POST route for saving a new post
  // app.post("/api/search", function (req, res) {
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //     .then(function (dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // //DELETE route for deleting posts
  // app.delete("/api/search/:id", function (req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function (dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  //   // PUT route for updating posts
  //   app.put("/api/search", function (req, res) {
  //     db.Post.update(req.body,
  //       {
  //         where: {
  //           id: req.body.id
  //         }
  //       })
  //       .then(function (dbPost) {
  //         res.json(dbPost);
  //       });
  //   });

  // //To insert into the database??
  // app.post("/api/posts", function (req, res) {
  //   // console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     ingredients: req.body.Ingredients,
  //     instructions: req.body.instructions,
  //   })
  //     .then(function (dbPost) {
  //       console.log(dbPost);
  //       res.json(dbPost);
  //     });
  // });

};

