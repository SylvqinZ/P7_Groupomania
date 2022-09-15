const express = require('express');
const router = express.Router();
const password = require('../middleware/password');
const validator = require("../middleware/email");

const userCtrl = require('../controllers/user');

router.post('/signup', validator, password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

