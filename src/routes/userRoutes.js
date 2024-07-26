const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// router.get('/user/:id', userController.getUser);
router.get('/users/:id', userController.getUser);
router.post('/userLogin/', userController.getUserbyMail);
router.post('/forgetPassword/', userController.forgetPasswordByEmail);
router.put('/changePassword/', userController.ChangePasswordByUserId);
router.put('/users/:id', userController.updateUserById);
router.put('/users/updateAdd/:id', userController.updateAddressById);
router.post('/users/addAddress/', userController.insertUserAddress);
module.exports = router;
