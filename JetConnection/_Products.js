function Products(jetConnection){
    this.jetConnection = jetConnection;
}

/**
 *
 * @returns {Promise}
 */
Products.prototype.listProducts = function() {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.Products.list(token)
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
Products.prototype.createProducts = function(product, sku) {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.Products.create(product, sku, token)
            .then(
            function(successObject) {
                resolve(successObject.data);
            },
            reject
        ).catch(reject);
    });
};

module.exports = Products;