const express = require('express');
const router = express.Router();
const signController = require('../controller/sign');

router.post('/signin', signController.signIn);

router.post('/subscribe', signController.subscribe);  

router.post('/signout', signController.signOut); 

module.exports = router;