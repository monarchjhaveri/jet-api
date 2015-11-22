var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var returnsRequester = {};

returnsRequester.list = function(token, callback) {
    if (!token) {
        callback(new Error("token must be present"));
    } else {
        var options = {
            path: Constants.URL.RETURN.LIST,
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
};

returnsRequester.getDetails = function(returnId, token, callback) {
    if (!returnId || !token) {
        callback(new Error("returnId and token must both be present"));
    } else {
        var options = {
            path: Constants.URL.RETURN.GET_DETAILS.replace("{id}", returnId),
            method: 'GET',
            token: token
        };

        ApiRequestHelper.request(null, options, callback);
    }
};

returnsRequester.complete = function(returnId, product, token, callback) {
    if (!returnId || !product || !token) {
        callback(new Error("returnId, product and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.RETURN.COMPLETE.replace("{id}", returnId),
            method: 'PUT',
            token: token
        };

        var payload = JSON.stringify(product);

        ApiRequestHelper.request(payload, options, callback);
    }
};

module.exports = returnsRequester;
module.exports.inventory = productsInventoryRequester;
module.exports.price = productsPriceRequester;