const axios = require('axios');
require('dotenv').config();

const scalapayReqHeader = {
  'Accept': 'application/json', // required by Scalapay
  'Content-Type': 'application/json', // required by Scalapay
  'Authorization': process.env.SCALAPAY_BEARER_TOKEN, // required by Scalapay
  'Connection': 'Keep-Alive',
};

const postScalapayOrder = async ({body}) => {
  const {data}= await axios.post(`${process.env.SCALAPAY_DOMAIN}/v2/orders`, body, {headers: scalapayReqHeader});
  return data;
};

module.exports = {
  postScalapayOrder,
};
