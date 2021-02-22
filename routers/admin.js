const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.post('/admin', adminController.check);


module.exports = router;