const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  habitatImageUrl: String,
  info: String,
  moreInfoUrl: String,
}, {
  timestamps: true,
});

schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT), null);
};

schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports.Animal = mongoose.model('Animals', schema);