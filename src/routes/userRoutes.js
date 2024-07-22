const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// router.get('/user/:id', userController.getUser);
router.get('/users/:id', userController.getUser);
router.post('/userLogin/', userController.getUserbyMail);
router.post('/forgetPassword/', userController.forgetPasswordByEmail);
router.put('/changePassword/', userController.ChangePasswordByUserId);

module.exports = router;
