var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var ordersRequester = {};

ApiRequestHelper.listByStatus = function(status, token, callback) {
    if (!status) {
        callback(new Error("status must be present"));
    } else if (!token) {
        callback(new Error("token must be present"));
    } else {
        var options = {
            path: Constants.URL.ORDER.LIST_BY_STATUS.replace("{status}", status),
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
};

ordersRequester.listAcknowledged = function(token, callback) {
    ApiRequestHelper.listByStatus(Constants.ORDER_STATUS.ACKNOWLEDGED, token, callback);
};

ordersRequester.listComplete = function(token, callback) {
    ApiRequestHelper.listByStatus(Constants.ORDER_STATUS.COMPLETE, token, callback);
};

ordersRequester.listCreated = function(token, callback) {
    ApiRequestHelper.listByStatus(Constants.ORDER_STATUS.CREATED, token, callback);
};

ordersRequester.listInProgress = function(token, callback) {
    ApiRequestHelper.listByStatus(Constants.ORDER_STATUS.IN_PROGRESS, token, callback);
};

ordersRequester.listReady = function(token, callback) {
    ApiRequestHelper.listByStatus(Constants.ORDER_STATUS.READY, token, callback);
};

/**
 *
 * @param merchant_order_id
 * @param token
 * @param callback
 */
ordersRequester.getDetails = function(merchant_order_id, token, callback) {
    if (!merchant_order_id || !token) {
        callback(new Error("merchant_order_id and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.ORDER.GET_DETAILS.replace("{id}", merchant_order_id),
            method: 'GET',
            token: token
        };

        ApiRequestHelper.request(null, options, callback);
    }
};

ordersRequester.ORDER_STATUS = Constants.ORDER_STATUS;

module.exports = ordersRequester;