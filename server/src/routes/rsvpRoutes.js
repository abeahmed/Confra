const express = require('express');
const router = express.Router();
const { createRSVP } = require('../controllers/rsvpController');

router.post('/:eventId', createRSVP);

module.exports = router;


