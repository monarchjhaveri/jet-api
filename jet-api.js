var JetApi = {};

JetApi.authentication = require("./apiRequesters/authentication");
JetApi.products = require("./apiRequesters/products");
JetApi.orders = require("./apiRequesters/orders");
JetApi.merchant = require("./apiRequesters/merchant");

module.exports = JetApi;