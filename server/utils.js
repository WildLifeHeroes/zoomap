const {
  User
} = require('../database/user');
const {
  Animal
} = require('../database/animal');
const {
  db
} = require('../database');

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

module.exports = {
  validatePassword,
  validateName,
  createUser,
}