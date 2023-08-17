const express = require('express');
const orderController = require('../controllers/OrderController');

const router = new express.Router();
router.get('', (req, res) => {
  res.json({status: 200});
});
router.post('/orders', (req, res) => orderController.handleOrderCreation(req, res));

module.exports = router;
