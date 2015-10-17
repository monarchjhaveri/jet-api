var ApiFacade = require ("../ApiFacade");

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
}

/**
 *
 * @param {!String} apiUser
 * @param {!String} apiSecret
 * @param {!ApiFacade} apiFacade
 * @returns {Promise}
 */
JetConnection.connect = function(apiUser, apiSecret, apiFacade){
    var apiFacade = new ApiFacade();
    return new Promise(function(resolve, reject) {
        apiFacade.Authentication.authenticate(apiUser, apiSecret)
            .then(
            function(data) {
                resolve(
                    new JetConnection(
                        apiUser,
                        apiSecret,
                        data.response.id_token,
                        data.response.token_type,
                        Date(data.response.expires_on),
                        apiFacade
                    )
                );
            },
            reject
        )
    });

};

JetConnection.prototype.listProducts = function() {
    var apiFacade = this.apiFacade;
    return new Promise(function(resolve, reject) {
        apiFacade.Products.list(
            this.token,
            function(data) {
                resolve(data.response);
            },
            function(errorData) {
                reject(errorData);
            });
    });
};

JetConnection.prototype.createProducts = function(product, sku) {
    var apiFacade = this.apiFacade;
    return new Promise(function(resolve, reject) {
        apiFacade.Products.create(product, sku, this.token,
            function(data) {
                resolve(data.response);
            },
            function(errorData) {
                reject(errorData);
            });
    });
};



module.exports = JetConnection;