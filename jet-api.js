var authenticationRequester = require("./apiRequesters/authenticationRequester");
var productsRequester = require("./apiRequesters/productsRequester");

var JetApi = {};

JetApi.authentication = authenticationRequester;
JetApi.products = productsRequester;

module.exports = JetApi;