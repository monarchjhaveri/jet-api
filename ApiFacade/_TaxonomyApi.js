var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

var TaxonomyApi = {};

var TAXONOMY_VERSION = 1;

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @param {string} token
 * @returns {Promise}
 */
TaxonomyApi.listNodes = function listNodes(offset, limit, token) {
    return new Promise(function(resolve, reject) {
        if (!token || (offset != 0) || !limit || !token) {
            reject(new InternalRejection("TaxonomyApi.listNodes: offset, limit and token must be present."));
        }

        var options = {
            path: Constants.URL.TAXONOMY.LIST_NODES
                .replace("{version}", TAXONOMY_VERSION)
                .replace("{offset}", offset)
                .replace("{limit}", limit),
            token: token
        };

        HttpClientHelper.request(options).then(
            function (parsedData) {
                resolve(new Success(parsedData));
            },
            function (httpResponse) {
                reject(new ApiRejection("Failed to return Taxonomy list of nodes", httpResponse));
            }
        );
    });
};

module.exports = TaxonomyApi;