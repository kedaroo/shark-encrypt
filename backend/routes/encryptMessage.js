const express = require('express');

const router = express.Router();

const { encryptMessage } = require('../controllers/encryptionController');

router.route('/encryptMessage').post(encryptMessage);

module.exports = router;
