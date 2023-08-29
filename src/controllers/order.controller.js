const {postScalapayOrder} = require('../services/order.service');

const createOrder = async (req, res) => {
  const response = await postScalapayOrder(req);
  res.status(201).send(response);
};

module.exports = {
  createOrder,
};
