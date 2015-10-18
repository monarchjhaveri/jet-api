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
            .catch(function(error) {
                console.log(error);
            });
    });
};

JetConnection.prototype.logout = function() {
    var apiFacade = this.apiFacade;
    var token = this.token;

    apiFacade.Authentication.logout(token)
        .then(
            function(successObject) {
                resolve(successObject.data);
            },
            reject
        );
};

/**
 *
 * @returns {Promise}
 */
JetConnection.prototype.listProducts = function() {
    var apiFacade = this.apiFacade;
    var token = this.token;
    return new Promise(function(resolve, reject) {
        apiFacade.Products.list(token)
            .then(
                function(successObject) {
                    resolve(successObject.data);
                },
                reject
            );
    });
};

/**
 *
 * @param {!Object} product
 * @param {!String} sku
 * @returns {Promise}
 */
JetConnection.prototype.createProducts = function(product, sku) {
    var apiFacade = this.apiFacade;
    var token = this.token;

    return new Promise(function(resolve, reject) {
        apiFacade.Products.create(product, sku, token)
            .then(
                function(successObject) {
                    resolve(successObject.data);
                },
                reject
            );
    });
};


/**
 *
 * @returns {Promise}
 */
JetConnection.prototype.getToken = function() {
    var self = this;
    return new Promise(function(resolve, reject){
        if (self.token) {
            resolve(self.token);
        } else {
            reject("Token not set!")
        }
    })
};



module.exports = JetConnection;