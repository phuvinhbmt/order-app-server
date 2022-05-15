const axios = require('axios');

class ScalapayAPIController {
    HOST_NAME = 'https://integration.api.scalapay.com';
    BEARER_TOKEN = 'Bearer qhtfs87hjnc12kkos';

    /**
     * Send POST request to Scalapay API to create an order. Handle response and send to the frontend
     * @param req {Request<>}
     * @param res {Response<>}
     * @returns {Promise<*>}
     */
    handleOrderCreation(req, res) {
        return axios.post(
            this.HOST_NAME + '/v2/orders',
            req.body,
            {
                headers: this.getHttpHeader()
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
     * @returns {{Authorization: string, Accept: string, "Content-Type": string}}
     */
    getHttpHeader() {
        return {
            'Accept': 'application/json', // required by Scalapay
            'Content-Type': 'application/json', // required by Scalapay
            'Authorization': this.BEARER_TOKEN, // required by Scalapay
            'Connection': 'Keep-Alive'
        };
    }

    /**
     * Parse Scalapay error response into response consisting of error messages
     * @param scalapayRespError raw error Http response from Scalapay API
     * @returns {{status: number, messages: string[]}}
     */
    parseScalapayErrorIntoMessageResponse(scalapayRespError) {
        const statusCode = scalapayRespError.status;
        let errorMsg = scalapayRespError.errors.map(error => error.messages.reduce(
            (msgList, msg) => msgList.concat(msg)
        ));
        return {
            status: statusCode,
            messages: errorMsg
        };
    }
}

module.exports = new ScalapayAPIController;
