const router = require('express').Router();
const xss = require('xss');
const {
  validateName,
  validatePassword,
  createUser,
  getApiImages,
  cachedImagesFunc,
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

/*********************************
 * LOGIN PAGE
 *********************************/
// Expects {name: '', password:''}
router.post('/login', (req, res) => {
  const name = validateName(xss(req.body.name));
  const password = validatePassword(xss(req.body.password));
  if (name && password) {
    User.findOne({
      name
    }, (err, user) => {
      if (err || !user) {
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
        if (user.validPassword(password)) {
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
// TODO: TEST THIS ROUTE
router.get('/info/:animal', (req, res) => {
  const animal = xss(req.params.animal);
  // Append response with images
  const cachedImages = cachedImagesFunc(animal);
  if (cachedImages) {
    res.data.images = cachedImages;
  } else {
    getApiImages(animal)
      .then((images) => {
        res.data.images = images;
      })
      .catch((error) => {
        res.data.images = {
          "error": error
        };
      });
  }
  // Find animal in database
  Animal.findOne({
    animal
  }, (err, animal) => {
    if (err || !animal) {
      res.status(500).send(err);
    } else {
      res.status(200).send(animal);
    }
  });

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

/*********************************
 * STILL IMAGES
 * Description: This route looks for a cached store of image urls
 * before sending a request to Unsplash API to reduce API count
 *********************************/
router.get('/image/:name', (req, res) => {
  const name = req.params.name;
  const cachedImages = cachedImagesFunc(name);
  if (cachedImages) {
    res.status(200).send(cachedImages);
  } else {
    getApiImages(name)
      .then((images) => {
        res.status(200).send(images);
      })
      .catch((error) => {
        res.status(500).send({
          "error": error
        });
      });
  }
});


module.exports = router;