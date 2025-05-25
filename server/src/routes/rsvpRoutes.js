const express = require('express');
const router = express.Router();
const { createRSVP, initiateVerification } = require('../controllers/rsvpController');


router.post('/:eventId/verify-email', initiateVerification);

router.post('/:eventId', createRSVP);

module.exports = router;


