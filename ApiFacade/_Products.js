var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

var Products = {};

/**
 *
 * @param {!String} token
 * @returns {Promise}
 */
Products.list = function list(token) {
    return new Promise(function(resolve, reject) {
        if (!token) {
            reject(new InternalRejection("Products.list: token must be present."));
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
            function (parsedData) {
                reject(new ApiRejection("Failed to return list of products", parsedData));
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
Products.create = function create(product, sku, token) {
    return new Promise(function(resolve, reject) {
        if (!product || !sku || !token) {
            reject(new InternalRejection("Products.create: product, sku and token must all be present."));
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
            function (parsedData) {
                reject(new ApiRejection("Could not create product", parsedData));
            }
        );
    });
};

module.exports = Products;