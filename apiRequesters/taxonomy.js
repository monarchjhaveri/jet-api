var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var taxonomyRequester = {};

taxonomyRequester.getNodeAttributes = function(nodeId, token, callback) {
    if (!token || !nodeId) {
        callback(new Error("token and nodeId must be present"));
    } else {
        var options = {
            path: Constants.URL.TAXONOMY.GET_NODE_ATTRIBUTES.replace("{id}", nodeId),
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
};

module.exports = taxonomyRequester;