var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

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
            hostname: Constants.URL.ROOT,
            path: Constants.URL.PRODUCT.LIST,
            method: 'GET',
            headers: {
                "Host": "merchant-api.jet.com",
                "Content-Length": 0,
                "Authorization": "Bearer " + token
            }
        };

        HttpClientHelper.request(options).then(
            function (parsedData) {
                resolve(new Success(parsedData));
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
            hostname: Constants.URL.ROOT,
            path: Constants.URL.PRODUCT.CREATE.replace("{id}", sku),
            method: 'PUT',
            headers: {
                "Host": "merchant-api.jet.com",
                "Authorization": "Bearer " + token
            }
        };

        HttpClientHelper.request(options, product).then(
            function (parsedData) {
                resolve(new Success(parsedData));
            },
            function (httpResponse) {
                reject(new ApiRejection("ProductsApi.create: Could not create product", httpResponse));
            }
        );
    });
};

module.exports = ProductsApi;