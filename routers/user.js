const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const userController = require('../controller/user');

router.get('/trophies/:id_user', auth.authorizationConnection, userController.yourTrophies);
router.patch('/level/:id_user', auth.authorizationConnection,userController.levelUp);
router.post('/:id_user', auth.authorizationConnection,userController.one);
router.put('/update/:id_user', auth.authorizationConnection,userController.update);
router.delete('/remove/:id_user',auth.authorizationConnection, userController.remove );

module.exports = router;