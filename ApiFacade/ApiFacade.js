var AuthenticationApi = require("./_AuthenticationApi");
var ProductsApi = require("./_ProductsApi");
var TaxonomyApi = require("./_TaxonomyApi");

function ApiFacade() {
    this.AuthenticationApi = AuthenticationApi;
    this.ProductsApi = ProductsApi;
    this.TaxonomyApi = TaxonomyApi;
}

module.exports = ApiFacade;