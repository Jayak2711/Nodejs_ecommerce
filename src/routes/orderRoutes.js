const express = require('express');
const oderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', oderController.getAllOrderAdmin);
router.get('/:id', oderController.getAllOrderWithUserId);
router.post('/orderDate/', oderController.getorderWithDate);
router.post('/addorder/', oderController.insertOrderRec);

module.exports = router;