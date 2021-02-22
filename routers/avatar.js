const express = require('express');
const avataController = require('../controller/avatar');

const router = express.Router();

router.get('/avatars',avataController.findAll);

module.exports = router;