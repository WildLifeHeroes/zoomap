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
  const new_user = new User({
    name,
    password,
  });
  new_user.password = new_user.generateHash(password);
  const saved = new_user.save();
  return saved;
};

module.exports = {
  validatePassword,
  validateName,
  createUser,
}