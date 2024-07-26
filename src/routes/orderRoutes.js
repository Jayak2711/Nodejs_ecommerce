const express = require('express');
const oderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', oderController.getAllOrderAdmin);
router.get('/:id', oderController.getAllOrderWithUserId);
router.post('/orderDate/', oderController.getorderWithDate);
router.post('/addorder/', oderController.insertOrderRec);
router.post('/addAllorder/', oderController.insertAllCartRec);
router.post('/oderPayment/', oderController.getOrderIdForPayment);
router.post('/addPayment/', oderController.insertIntoPaymentWithUSerId);
router.get('/paymentHistory/:id', oderController.paymentWithUserId);
console.log()
module.exports = router;