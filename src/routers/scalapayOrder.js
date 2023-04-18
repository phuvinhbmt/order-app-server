const express = require('express');
const scalapayAPI = require('../controllers/ScalapayAPIController');

const router = new express.Router();
router.get('', (req, res) => {
    res.json({status: 200});
});
router.post('/orders', (req, res) => scalapayAPI.handleOrderCreation(req, res));

module.exports = router;
