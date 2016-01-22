var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var productsVariationRequester = {};

productsVariationRequester.update = function(sku, variationDto, token, callback) {
    if (!sku || !variationDto || !token) {
        callback(new Error("sku, variationDto and token must all be present"));
    } else {
        var options = {
            path: Constants.URL.PRODUCT.VARIATION.replace("{id}", sku),
            method: 'PUT',
            token: token
        };

        var payload = JSON.stringify(variationDto);

        ApiRequestHelper.request(payload, options, callback);
    }
};

module.exports = productsVariationRequester;