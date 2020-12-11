require('dotenv').config();
const csv = require('csvtojson');
const {
  Animal
} = require('./animal');
const {
  db
} = require('./index');


csv()
  .fromFile(__dirname + '/animals.csv')
  .then(jsonArray => {
    Animal.deleteMany({})
      .then(() => {
        Animal.create(jsonArray)
          .then(() => {
            console.log('seed success');
            process.exit();
          })
          .catch((err) => console.error(err));
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));