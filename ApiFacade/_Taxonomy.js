var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

var Taxonomy = {};

var TAXONOMY_VERSION = 1;

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @param {string} token
 * @returns {Promise}
 */
Taxonomy.listNodes = function listNodes(offset, limit, token) {
    return new Promise(function(resolve, reject) {
        if (!token) {
            reject(new InternalRejection("Taxonomy.listNodes: token must be present."));
        }

        var options = {
            hostname: Constants.URL.ROOT,
            path: Constants.URL.TAXONOMY.LIST_NODES
                .replace("{version}", TAXONOMY_VERSION)
                .replace("{offset}", offset)
                .replace("{limit}", limit),
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
                reject(new ApiRejection("Failed to return Taxonomy list of nodes", httpResponse));
            }
        );
    });
};

module.exports = Taxonomy;