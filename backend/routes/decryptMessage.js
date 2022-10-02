const express = require('express');

const router = express.Router();

const { decryptMessage } = require('../controllers/decryptionController');

router.route('/decryptMessage').post(decryptMessage);

module.exports = router;
