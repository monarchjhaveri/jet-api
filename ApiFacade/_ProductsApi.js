var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");

var ProductsApi = {};

/**
 *
 * @param {!String} token
 * @returns {Promise}
 */
ProductsApi.list = function list(token) {
    return new Promise(function(resolve, reject) {
        if (!token) {
            reject(new InternalRejection("ProductsApi.list: token must be present."));
        }
        var options = {
            path: Constants.URL.PRODUCT.LIST,
            method: 'GET',
            token: token
        };

        HttpClientHelper.request(options).then(
            function (parsedData) {
                resolve(parsedData);
            },
            function (httpResponse) {
                reject(new ApiRejection("Failed to return list of products", httpResponse));
            }
        );
    });
};

/**
 *
 * @param {!Object} product
 * @param {!String} sku
 * @param {!String} token
 * @returns {Promise}
 */
ProductsApi.create = function create(product, sku, token) {
    return new Promise(function(resolve, reject) {
        if (!product || !sku || !token) {
            reject(new InternalRejection("ProductsApi.create: product, sku and token must all be present."));
        }

        var options = {
            path: Constants.URL.PRODUCT.CREATE.replace("{id}", sku),
            method: 'PUT',
            token: token
        };

        //var productString = JSON.stringify(product);
        var productString = JSON.stringify(product);

        HttpClientHelper.request(options, productString).then(
            function () {
                resolve();
            }
        ).catch(function(error) {
                reject(error);
            });
    });
};


/**
 *
 * @param {!String} merchantSku
 * @param {!String} token
 * @returns {Promise}
 */
ProductsApi.getDetails = function create(merchantSku, token) {
    return new Promise(function(resolve, reject) {
        if (!merchantSku || !token) {
            reject(new InternalRejection("ProductsApi.create: merchantSku and token must all be present."));
        }

        var options = {
            path: Constants.URL.PRODUCT.GET_DETAILS.replace("{id}", merchantSku),
            method: 'GET',
            token: token
        };

        HttpClientHelper.request(options, null).then(
            function (parsedData) {
                resolve(parsedData);
            }
        ).catch(function(error) {
                reject(error);
            });
    });
};

module.exports = ProductsApi;