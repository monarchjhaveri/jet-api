var Taxonomy = function(jetConnection){
    this.jetConnection = jetConnection;
}

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @returns {Promise}
 */
Taxonomy.prototype.listNodes = function(offset, limit) {
    var apiFacade = this.jetConnection.apiFacade;
    var token = this.jetConnection.token;

    return new Promise(function(resolve, reject) {
        apiFacade.TaxonomyApi.listNodes(offset, limit, token)
            .then(
            function(successObject) {
                resolve(successObject);
            },
            reject
        ).catch(reject);
    });
};
module.exports = Taxonomy;