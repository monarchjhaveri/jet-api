var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var refundsRequester = {};

refundsRequester.listByStatus = function(status, token, callback) {
    if (!status) {
        callback(new Error("status must be present"));
    } else if (!token) {
        callback(new Error("token must be present"));
    } else {
        var options = {
            path: Constants.URL.REFUND.LIST_BY_STATUS.replace("{status}", status),
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
};

refundsRequester.getDetails = function(refundId, token, callback) {
    if (!refundId || !token) {
        callback(new Error("refundId and token must both be present"));
    } else {
        var options = {
            path: Constants.URL.REFUND.GET_DETAILS.replace("{id}", refundId),
            method: 'GET',
            token: token
        };

        ApiRequestHelper.request(null, options, callback);
    }
};

refundsRequester.post = function(orderId, refundId, product, token, callback) {
    if (!orderId || !refundId || !product || !token) {
        callback(new Error("orderId, refundId, product and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.REFUND.POST_REFUND
                .replace("{order_id}", orderId)
                .replace("{refund_id}", refundId),
            method: 'PUT',
            token: token
        };

        var payload = JSON.stringify(product);

        ApiRequestHelper.request(payload, options, callback);
    }
};

refundsRequester.REFUND_STATUS = Constants.REFUND_STATUS;
module.exports = refundsRequester;

