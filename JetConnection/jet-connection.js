var ApiFacade = require ("../ApiFacade");


var JetConnection = function(apiUser, apiSecret){
    this.user = apiUser;
    this.pass = apiSecret;
    this.token = null;
    this.token_type = null;
    this.expires_on = null;
    this.errors = null;

    var theJetConnection = this;

    ApiFacade.Authentication.authenticate(apiUser, apiSecret,
        function(data) {
            theJetConnection.token = data.id_token;
            theJetConnection.token_type = data.token_type;
            theJetConnection.expires_on = new Date(data.expires_on);
        },
        function(errors) {
            console.error("Authentication failed");
            theJetConnection.errors = errors;
        }
    );
};

JetConnection.prototype.listProducts = function() {
    ApiFacade.Products.list(this.token,
        function(data) {
            console.log(data);
        },
        function(errors) {
            console.log(errors);
        })
};

JetConnection.prototype.createProducts = function(product, sku) {
    ApiFacade.Products.create(product, sku, this.token,
        function(data) {
            console.log(data);
        },
        function(errors) {
            console.log(errors);
        })
};



module.exports = JetConnection;