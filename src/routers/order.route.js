const express = require('express');
const orderController = require('../controllers/OrderController');

const {createOrder} = require('../controllers/order.controller');

const router = new express.Router();
router.get('', (req, res) => {
  res.json({status: 200});
});
router.post('/orders', (req, res) => orderController.handleOrderCreation(req, res));
router.post('/orders/v2', (req, res) => createOrder(req, res));

module.exports = router;
