var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var productsRequester = {};

productsRequester.list = function(token, callback) {
    if (!token) {
        callback(new Error("token must be present"));
    }

    var options = {
        path: Constants.URL.PRODUCT.LIST,
        method: 'GET',
        token: token
    };

    ApiRequestHelper.request(null, options, callback);
};

productsRequester.create = function(sku, product, token, callback) {
    if (!sku || !product || !token) {
        callback(new Error("sku, product and token must all be present"));
    }

    var options = {
        path: Constants.URL.PRODUCT.CREATE.replace("{id}", sku),
        method: 'PUT',
        token: token
    };

    var payload = JSON.stringify(product);


    ApiRequestHelper.request(payload, options, callback);
};

productsRequester.getDetails = function(sku, token, callback) {
    if (!sku || !token) {
        callback(new Error("sku and token must all be present"));
    }

    var options = {
        path: Constants.URL.PRODUCT.GET_DETAILS.replace("{id}", sku),
        method: 'GET',
        token: token
    };

    ApiRequestHelper.request(null, options, callback);
};

module.exports = productsRequester;