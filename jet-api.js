require('dotenv').load();
var JetConnection = require("./JetConnection");
var ApiFacade = require("./ApiFacade");

var JetApi = {};

/**
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @param {!ApiFacade} apiFacade
 * @returns {Promise}
 */
JetApi.connect = function connect(apiUser, apiSecret) {
    var apiFacade = new ApiFacade();
    return new Promise(function(resolve, reject) {
        apiFacade.Authentication.authenticate(apiUser, apiSecret)
            .then(
            function(data) {
                var jc = new JetConnection(
                    apiUser,
                    apiSecret,
                    data.data.id_token,
                    data.data.token_type,
                    Date(data.data.expires_on),
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