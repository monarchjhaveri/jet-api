require('dotenv').load();
var JetConnection = require("./JetConnection");

var JetApi = {};

/**
 * Logs into the Jet API using specified apiUser and apiSecret.
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @returns {JetConnection}
 */
JetApi.connect = function connect(apiUser, apiSecret) {
    return JetConnection.connect(apiUser, apiSecret);
};

module.exports = JetApi;