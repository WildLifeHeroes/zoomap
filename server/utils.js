const {
  User
} = require('../database/user');
const {
  Animal
} = require('../database/animal');
const {
  db
} = require('../database');
const axios = require('axios');

const validateName = (name) => {
  if (typeof name === 'string' && name.length > 5) {
    return name;
  }
  return null;
};

const validatePassword = (password) => {
  if (typeof password === 'string' && password.length > 5) {
    return password;
  }
  return null;
}

const createUser = async function (name, password) {
  const newUser = new User({
    name
  });
  newUser.password = newUser.generateHash(password);
  newUser.save()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const cache = {};

function cachedImagesFunc(name) {
  if (name in cache) {
    return cache.name;
  } else {
    return null;
  }
}

/******************************************************
 * gets the Image URL from the Unsplash API
 * if there is an error, the default image is sent
 * a default key is added to signify whether the default
 * was sent.
 ******************************************************/
async function getApiImages(name) {
  const url = `https://api.unsplash.com/photos/random/?query=${name}`;
  const images = await axios.get(url, {
      "headers": {
        "Accept-Version": "v1",
        "Authorization": `Client-ID ${process.env.unSplashKey}`
      }
    })
    .then(res => {
      cache.name = res.data;
      cache.name.default = false;
      return cache.name;
    })
    .catch((error) => {
      const defaultResponse = {
        "image": "public/assets/images/brian-mcgowan-weY3ecoNSZw-unsplash.jpg",
        "default": true
      }
      return defaultResponse;
    });
  return images;
}

module.exports = {
  validatePassword,
  validateName,
  createUser,
  getApiImages,
  cachedImagesFunc,
}