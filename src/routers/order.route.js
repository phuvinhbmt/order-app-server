const express = require('express');
const orderController = require('../controllers/OrderController');

const {createOrder} = require('../controllers/order.controller');

const router = new express.Router();
router.get('', (req, res) => {
  res.json({status: 200});
});
router.post('/orders', (req, res) => orderController.handleOrderCreation(req, res));
router.route('/v2/orders').post(createOrder);

module.exports = router;
