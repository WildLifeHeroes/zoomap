const mongoose = require('mongoose');

const mongoUri = process.env.dbURI;
const dbC = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    username: process.env.dbUserName,
    password: process.env.dbPassword,
  }
});
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: ')); // eslint-disable-line
dbConnection.once('open', () => console.log('connected')); // eslint-disable-line

module.exports.dbC = dbC;
module.exports.db = dbConnection;