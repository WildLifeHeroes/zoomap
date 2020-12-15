require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev')); // dev only
app.use(cors()); //TODO: See about restricting cors
app.use('/', express.static(PUBLIC_DIR));

app.use('/', express.json(), router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. `);
});