var ApiFacade = require ("../ApiFacade");
var Products = require("./_Products");

/**
 *
 * @param {!String} user
 * @param {!String} pass
 * @param {!String} token
 * @param {!String} token_type
 * @param {!Date} expires_on
 * @param {!ApiFacade} apiFacade
 * @constructor
 */
function JetConnection(user, pass, token, token_type, expires_on, apiFacade) {
    this.user = user;
    this.pass = pass;
    this.token = token;
    this.token_type = token_type;
    this.expires_on = expires_on;
    this.apiFacade = apiFacade;
    this.Products = new Products(this);
}

module.exports = JetConnection;