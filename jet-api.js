require('dotenv').load();
var JetConnection = require("./JetConnection");
var ApiFacade = require("./ApiFacade");

var JetApi = {};

/**
 * Logs into the Jet API using specified apiUser and apiSecret.
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @returns {Promise}
 */
JetApi.connect = function connect(apiUser, apiSecret) {
    return JetConnection.connect(apiUser, apiSecret, new ApiFacade());
};

module.exports = JetApi;