var express = require('express');
var router = express.Router();
var db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
var passport = require("../config/passport");


module.exports = function (app) {

  // Using the passport.authenticate middleware with local strategy.
  // If the user has valid login credentials, send them to the members page.
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

  // Get all recipes list === this works
  // app.get("/api/search/", (req, res) => 
  //   db.Post.findAll()
  //   .then(posts => res.render("search", {
  //     posts
  //   }))
  //   .catch(err => console.log(err)));


  // Search function for members page
  app.get('/api/members', (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();

    db.Post.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
      .then(results => res.render('members', { results }))
      .catch(err => console.log(err));
  });


// Search function for guest page
app.get('/api/guest', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  db.Post.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
    .then(search => res.render('guest', { search }))
    .catch(err => console.log(err));
});




  // Add a recipe
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
        // .then(posts => res.redirect('/members'))
        .catch(err => console.log(err));
    }
  });

// Add a recipe in Guest modal
app.post('/api/guest', (req, res) => {
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
    res.render('guest', {
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
      .then(posts => res.render('guest'))
      // alert("Your recipes has been added"))
      // .then(posts => res.redirect('/members'))
      .catch(err => console.log(err))
  }
});
  //===================================================================//

  //unused routes:

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

};

