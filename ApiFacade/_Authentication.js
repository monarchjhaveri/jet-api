var querystring = require('querystring');
var Constants = require("./Constants");
var HttpClientHelper = require("./_HttpClientHelper");
var ApiRejection = require("./PromiseResolveDto/ApiRejection");
var InternalRejection = require("./PromiseResolveDto/InternalRejection");
var Success = require("./PromiseResolveDto/Success");

var Authentication = {};

/**
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @returns {Promise}
 */
Authentication.authenticate = function authenticate(apiUser, apiSecret) {
    return new Promise(function(resolve, reject) {
        if (!apiUser || !apiSecret) {
            reject(new InternalRejection("Authentication.authenticate: apiUser and apiSecret must be present."));
        }

        var payload = JSON.stringify({
            user: apiUser,
            pass: apiSecret
        });

        var options = {
            hostname: Constants.URL.ROOT,
            path: Constants.URL.TOKEN,
            method: 'POST',
            headers: {
                "Host": "merchant-api.jet.com",
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload)
            }
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

module.exports = Authentication;