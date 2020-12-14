const router = require('express').Router();
const xss = require('xss');
const util = require('./utils').util;
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
  const name = util.validateName(xss(req.body.name));
  const password = util.validatePassword(xss(req.body.password));
  if (name && password) {
    User.findOne({
      name
    }, (err, user) => {
      if (err || !user) {
        util.createUser(name, password)
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
router.get('/info/:animal', (req, res) => {
  const animal = req.params.animal.toLowerCase();
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
  const animal = req.params.animal.toLowerCase();
  util.fetchVideos(animal)
    .then(videos => {
      res.status(200).send(videos);
    })
    .catch(err => res.status(400).send(err));
});
/*********************************
 * BADGES PAGE
 *********************************/
router.get('/badges/:name', (req, res) => {
  const name = req.params.name.toLowerCase();;
  User.findOne({
    name
  }, cb);

  let responseObj = {};
  let images = {};

  function cb(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      util.getZooAnimals()
        .then((animals) => {
          const promiseArray = animals.map((animal) => {
            return imageSearch(animal.name)
              .then(imgs => {
                images[animal.name] = imgs;
              })
              .catch(() => {
                res.status(400).send({});
              })
          });
          Promise.allSettled(promiseArray)
            .then(() => {
              responseObj["images"] = images;
              responseObj["badges"] = user.badges;
              res.status(200).send(responseObj);
            })
            .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
    }
  }
});
/*********************************
 * DONATE
 *********************************/
router.patch('/donate/:name/:animal/:amount', (req, res) => {
  const name = req.params.name;
  const animal = req.params.animal.toLowerCase();
  const amount = parseInt(req.params.amount);

  User.findOne({
      name
    })
    .then((user) => {
      let badgeFound = false;
      user.badges.forEach((badge) => {
        console.log(badge);
        if (badge.animal === animal) {
          badge.amountDonated ? badge.amountDonated += amount : badge.amountDonated = amount;
          badgeFound = true;
        }
      })
      if (!badgeFound) {
        user.badges.push({
          animal,
          amountDonated: amount
        })
      }
      User.findOneAndUpdate({
          name
        }, {
          badges: user.badges
        }, {
          new: true
        })
        .then((user) => res.send(user.badges))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(401).send(err));
});

/*********************************
 * STILL IMAGES
 * Description: This route looks for a cached store of image urls
 * before sending a request to Unsplash API to reduce API count
 *********************************/
router.get('/image/:animal', (req, res) => {
  const animal = req.params.animal.toLowerCase();
  imageSearch(animal)
    .then((response) => res.status(200).send(response))
    .catch((response) => res.status(500).send(response));
});

async function imageSearch(animal) {
  const cachedImages = util.cachedImagesFunc(animal);
  if (cachedImages) {
    return {
      "images": cachedImages.urls.regular
    };
  } else {
    animal = animal.replace(/_/g, '%20');
    return util.getApiImages(animal)
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