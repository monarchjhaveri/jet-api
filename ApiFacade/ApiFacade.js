var Authentication = require("./_Authentication");
var Products = require("./_Products");
var Taxonomy = require("./_Taxonomy");

function ApiFacade() {
    this.Authentication = Authentication;
    this.Products = Products;
    this.Taxonomy = Taxonomy;
}

module.exports = ApiFacade;