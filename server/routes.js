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
  imageSearch(animal, res)
    .then(() => {
      Animal.findOne({
        animal
      }, (err, animal) => {
        if (err || !animal) {
          res.status(500).send(err);
        } else {
          res.status(200).send(animal);
        }
      });
    })
    .catch((err) => res.status(500).send(err));
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
  const name = xss(req.params.name);

  User.findOne({
    name
  }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(user.badges);
    }
  })

});

/*********************************
 * STILL IMAGES
 * Description: This route looks for a cached store of image urls
 * before sending a request to Unsplash API to reduce API count
 *********************************/
// TODO: Retest this route after refactor
router.get('/image/:animal', (req, res) => {
  const animal = xss(req.params.animal);
  imageSearch(animal, res)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
});

async function imageSearch(animal, res) {
  const cachedImages = cachedImagesFunc(animal);
  if (cachedImages) {
    res.data.images = cachedImages;
  } else {
    return getApiImages(animal)
      .then((images) => {
        res.data.images = images;
        return res;
      })
      .catch((error) => {
        res.data.images = {
          "error": error
        };
        return res;
      });
  }
}


module.exports = router;