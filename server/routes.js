const express = require('express');
const router = express.Router();

/*********************************
 * LOGIN PAGE
 *********************************/
router.get('/login', (req, res) => {

});

// Expects {name: '', password:''}
router.post('/login', (req, res) => {

});
/*********************************
 * INFO PAGE
 *********************************/
router.get('/info/:animal', (req, res) => {

});
/*********************************
 * VIDEOS PAGE
 *********************************/
router.get('/videos/:animal', (req, res) => {

});
/*********************************
 * BADGES PAGE
 *********************************/
router.get('/badges/:name', (req, res) => {

});

module.exports.router = router;