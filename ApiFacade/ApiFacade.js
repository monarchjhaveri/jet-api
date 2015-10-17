var Authentication = require("./_Authentication");
var Products = require("./_Products");

function ApiFacade() {
    this.Authentication = Authentication;
    this.Products = Products;
}

module.exports = ApiFacade;