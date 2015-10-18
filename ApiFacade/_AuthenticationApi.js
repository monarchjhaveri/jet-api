var querystring = require('querystring');
var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

var AuthenticationApi = {};

/**
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @returns {Promise}
 */
AuthenticationApi.authenticate = function authenticate(apiUser, apiSecret) {
    return new Promise(function(resolve, reject) {
        if (!apiUser || !apiSecret) {
            reject(new InternalRejection("AuthenticationApi.authenticate: apiUser and apiSecret must be present."));
        }

        var payload = JSON.stringify({
            user: apiUser,
            pass: apiSecret
        });

        var options = {
            path: Constants.URL.TOKEN,
            method: 'POST'
        };

        HttpClientHelper.request(options, payload).then(
            function (parsedData) {
                resolve(new Success(parsedData));
            },
            function (httpResponse) {
                reject(new ApiRejection("Failed to return list of products", httpResponse));
            }
        );
    });
};

module.exports = AuthenticationApi;