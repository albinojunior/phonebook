'use strict';

const express    = require('express');
const router     = express.Router();
const auth       = require('../auth');
const controller = require('../src/controllers/authController')();

router.post('/login',     controller.authenticate);
router.get('/user', auth, controller.getUserAuthenticated);

module.exports = router;
