// Dependencies
const sequelize = require("sequelize");

const Op = sequelize.Op;

// require("dotenv").config();
// // Export the function

const db = require("../models")

// // Exported function
module.exports = function (app) {
    app.get("/api/search/:name", function (req, res) {
        db.Post.findAll({
            where: {
                name: {
                    [Op.like]: "%" + req.params.name + "%"
                }
            }
        })
            .then(function (dbPost) {
                res.json(dbPost);
            })
    })

    // GET route for getting all of the posts
    app.get("/api/search/", function (req, res) {
        db.Post.findAll({})
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });
 // Get route for returning posts of a specific category
 app.get("/api/search/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/search/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/search", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/search/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/search", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};


