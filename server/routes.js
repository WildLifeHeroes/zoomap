const express = require('express');
const xss = require('xss');
const {
  validateName,
  validatePassword,
  createUser,
} = require('./utils');
const {
  User
} = require('../database/user');
const {
  Animal
} = require('../database/animal');
const {
  db
} = require('../database');

const router = express.Router();

/*********************************
 * LOGIN PAGE
 *********************************/
router.get('/login', (req, res) => {

});

// Expects {name: '', password:''}
router.post('/login', (req, res) => {
  const name = validateName(xss(req.params.name));
  const password = validatePassword(xss(req.params.password));
  if (name && password) {
    User.findOne({
      name
    }, (err, user) => {
      if (err) {
        createUser(name, password)
          .then((user) => res.status(201).send({
            "message": "New user created",
            "user": user,
            "error": null
          }))
          .catch((error) => res.status(500).send({
            "message": "New user could not be created",
            "user": null,
            "error": error
          }));
      } else {
        if (User.generateHash(password) === user.password) {
          res.status(200).send(user);
        } else {
          res.status(400).send({
            "message": "Invalid Password",
            "error": new Error("Invalid Password")
          });
        }
      }
    });
  }
});
/*********************************
 * INFO PAGE
 *********************************/
router.get('/info/:animal', (req, res) => {

});
/*********************************
 * VIDEOS PAGE
 *********************************/
router.get('/videos/:animal', (req, res) => {

});
/*********************************
 * BADGES PAGE
 *********************************/
router.get('/badges/:name', (req, res) => {

});

module.exports.router = router;