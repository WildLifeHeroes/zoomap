const mongoose = require('mongoose');

const mongoUri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.x5em7.mongodb.net/Users?retryWrites=true&w=majority`;
const dbC = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: ')); // eslint-disable-line
dbConnection.once('open', () => console.log('connected to Users database')); // eslint-disable-line

module.exports.dbC = dbC;
module.exports.db = dbConnection;