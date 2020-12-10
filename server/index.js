require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routes');

const morgan = require('morgan'); // dev only

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev')); // dev only
app.use(express.json());
app.use('/', express.static(PUBLIC_DIR));

app.all('*', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. `);
})