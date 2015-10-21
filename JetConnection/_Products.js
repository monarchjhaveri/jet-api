var SkuParserHelper = require("./helpers/SkuParserHelper");

var Products = function(jetConnection){
    this.jetConnection = jetConnection;
};

/**
 *
 * @returns {Promise}
 */
Products.prototype.listProductSkus = function() {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.ProductsApi.list(token)
            .then(
            function(successObject) {
                resolve(successObject.data);
            },
            reject
        ).catch(reject);
    });
};


/**
 *
 * @param {!Object} product
 * @param {!String} sku
 * @returns {Promise}
 */
Products.prototype.createProduct = function(product, sku) {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.ProductsApi.create(product, sku, token)
            .then(
            function(successObject) {
                resolve(successObject.data);
            },
            reject
        ).catch(reject);
    });
};

/**
 *
 * @param {!String} merchantSku
 * @returns {Promise}
 */
Products.prototype.getDetails = function(merchantSku) {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.ProductsApi.getDetails(merchantSku, token)
            .then(
            function(successObject) {
                resolve(successObject.data);
            },
            reject
        ).catch(reject);
    });
};

module.exports = Products;