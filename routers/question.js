const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const questionController = require('../controller/question');

router.get('/category/:id', questionController.findSome);

router.get('/add', auth.authorizationConnection, questionController.add)

module.exports = router;