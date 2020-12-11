const router = require('express').Router();
const xss = require('xss');
const {
  validateName,
  validatePassword,
  createUser,
  getApiImages,
  cachedImagesFunc,
  getZooAnimals,
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
// TODO: Normalize input
router.get('/info/:animal', (req, res) => {
  const animal = xss(req.params.animal);
  imageSearch(animal)
    .then((img) => {
      Animal.findOne({
        "name": animal
      }, (err, anim) => {
        if (err || !anim) {
          res.status(500).send(err);
        } else {
          let response = {};
          response.images = img;
          response.animal = anim;
          res.status(200).send(response);
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
// TODO: Add promise rejection handling
// TODO: Normalize input
router.get('/badges/:name', (req, res) => {
  const name = xss(req.params.name);
  User.findOne({
    name
  }, cb);

  let responseObj = {};
  let images = {};

  function cb(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      getZooAnimals()
        .then((animals) => {
          const promiseArray = animals.map((animal) => {
            return imageSearch(animal.name)
              .then(imgs => {
                images[animal.name] = imgs;
              })
              .catch((err) => {
                console.log(err);
                res.status(400).send({});
              })
          });
          Promise.allSettled(promiseArray)
            .then(() => {
              responseObj["images"] = images;
              responseObj["badges"] = user.badges;
              res.status(200).send(responseObj);
            });
        })
    }
  }
});



/*********************************
 * STILL IMAGES
 * Description: This route looks for a cached store of image urls
 * before sending a request to Unsplash API to reduce API count
 *********************************/
// TODO: Normalize input
router.get('/image/:animal', (req, res) => {
  const animal = xss(req.params.animal);
  imageSearch(animal, res)
    .then((response) => res.status(200).send(response))
    .catch((response) => res.status(500).send(response));
});

async function imageSearch(animal) {
  const cachedImages = cachedImagesFunc(animal);
  if (cachedImages) {
    return {
      "images": cachedImages.urls.regular
    };
  } else {
    animal = animal.replace(/_/g, '%20');
    return getApiImages(animal)
      .then((images) => {
        return {
          "images": images.urls.regular
        };
      })
      .catch(() => {
        return {
          "images": null
        };
      });
  }
}

module.exports = router;