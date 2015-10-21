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
            /**
             *
             * @param data
             * @param {String[]} data.sku_urls
             */
            function(data) {
                resolve(data.sku_urls.map(function(d) {
                    return SkuParserHelper.getSkuFromUrl(d);
                }));
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
            function() {
                resolve();
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
                resolve(successObject);
            },
            reject
        ).catch(reject);
    });
};

module.exports = Products;