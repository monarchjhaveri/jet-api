var ApiFacade = require ("../ApiFacade");

function JetConnection(user, pass, token, token_type, expires_on, errors) {
    this.user = user;
    this.pass = pass;
    this.token = token;
    this.token_type = token_type;
    this.expires_on = expires_on;
    this.errors = errors;
}

JetConnection.connect = function(apiUser, apiSecret){
    return new Promise(function(resolve, reject) {
        ApiFacade.Authentication.authenticate(apiUser, apiSecret)
            .then(
            function(data) {
                resolve(
                    new JetConnection(
                        apiUser,
                        apiSecret,
                        data.response.id_token,
                        data.response.token_type,
                        new Date(data.response.expires_on)
                    )
                );
            },
            reject
        )
    });

};

JetConnection.prototype.listProducts = function() {
    return new Promise(function(resolve, reject) {
        ApiFacade.Products.list(
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
    return new Promise(function(resolve, reject) {
        ApiFacade.Products.create(product, sku, this.token,
            function(data) {
                resolve(data.response);
            },
            function(errorData) {
                reject(errorData);
            });
    });
};



module.exports = JetConnection;