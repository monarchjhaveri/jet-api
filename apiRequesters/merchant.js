var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var merchantRequester = {};

merchantRequester.getFulfillmentNodes = function(token, callback) {
    if (!token) {
        callback(new Error("token must be present"));
    } else {
        var options = {
            path: Constants.URL.MERCHANT.FULFILLMENT_NODES,
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
};

module.exports = merchantRequester;