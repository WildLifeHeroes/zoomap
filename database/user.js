const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  name: String,
  password: String,
  badges: [{
    animal: String,
    imageURL: String,
    amountDonated: Number,
  }]
}, {
  timestamps: true,
});

schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT), null);
};

schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports.User = mongoose.model('User', schema);