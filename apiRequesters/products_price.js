var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var productsPriceRequester = {};

/**
 *
 * @param sku
 * @param token
 * @param callback
 */
productsPriceRequester.list = function(sku, token, callback) {
    if (!sku || !token) {
        callback(new Error("sku and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.PRODUCT.PRICE.replace("{id}", sku),
            method: 'GET',
            token: token
        };

        ApiRequestHelper.request(null, options, callback);
    }
};

productsPriceRequester.update = function(sku, priceDto, token, callback) {
    if (!sku || !priceDto || !token) {
        callback(new Error("sku, priceDto and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.PRODUCT.PRICE.replace("{id}", sku),
            method: 'PUT',
            token: token
        };

        var payload = JSON.stringify(priceDto);

        ApiRequestHelper.request(payload, options, callback);
    }
};

module.exports = productsPriceRequester;