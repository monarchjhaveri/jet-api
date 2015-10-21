require('dotenv').load();
var JetConnection = require("./JetConnection");
var ApiFacade = require("./ApiFacade");

var JetApi = {};

/**
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @returns {Promise}
 */
JetApi.connect = function connect(apiUser, apiSecret) {
    var apiFacade = new ApiFacade();
    return new Promise(function(resolve, reject) {
        apiFacade.AuthenticationApi.authenticate(apiUser, apiSecret)
            .then(
            function(data) {
                var jc = new JetConnection(
                    apiUser,
                    apiSecret,
                    data.id_token,
                    data.token_type,
                    Date(data.expires_on),
                    apiFacade
                );
                resolve(jc);
            },
            reject
        )
            .catch(reject);
    });
};

module.exports = JetApi;