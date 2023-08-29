const axios = require('axios');
require('dotenv').config();

/**
 * Class representing a controller to call to Scalapay API
 */
class OrderController {
  HOST_NAME = process.env.SCALAPAY_DOMAIN;
  BEARER_TOKEN = process.env.SCALAPAY_BEARER_TOKEN;

  /**
   * POST /orders
   * Send POST request to Scalapay API to create an order. Handle response and send to the frontend
   * @param {Object=} req
   * @param {Object=} res
   * @return {Promise<*>}
  */
  handleOrderCreation(req, res) {
    return axios.post(
      this.HOST_NAME + '/v2/orders',
      req.body,
      {
        headers: this.getHttpHeader(),
      })
      .then(response => res.status(200).send(response.data))
      .catch(error => {
        const rawScalapayResponse = error.response.data;
        const errorResponse = this.parseScalapayErrorIntoMessageResponse(rawScalapayResponse.message);
        res.status(errorResponse.status).send(errorResponse);
      });
  }

  /**
   * Get the appropriate request header for Scalapay API
   * @return {{Authorization: string, Accept: string, "Content-Type": string}}
   */
  getHttpHeader() {
    return {
      'Accept': 'application/json', // required by Scalapay
      'Content-Type': 'application/json', // required by Scalapay
      'Authorization': this.BEARER_TOKEN, // required by Scalapay
      'Connection': 'Keep-Alive',
    };
  }

  /**
   * Parse Scalapay error response into response consisting of error messages
   * @param {Object=} scalapayRespError raw error Http response from Scalapay API
   * @return {{status: number, messages: string[]}}
  */
  parseScalapayErrorIntoMessageResponse(scalapayRespError) {
    const statusCode = scalapayRespError?.status || 400;
    const errorMsg = scalapayRespError.errors.map(error => error.messages.reduce(
      (msgList, msg) => msgList.concat(msg),
    ));
    return {
      status: statusCode,
      messages: errorMsg,
    };
  }
}

module.exports = new OrderController;
