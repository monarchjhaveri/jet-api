var JetApi = {};

JetApi.authentication = require("./apiRequesters/authentication");
JetApi.products = require("./apiRequesters/products");
JetApi.orders = require("./apiRequesters/orders");
JetApi.returns = require("./apiRequesters/returns");
JetApi.refunds = require("./apiRequesters/refunds");
JetApi.merchant = require("./apiRequesters/merchant");
JetApi.taxonomy= require("./apiRequesters/taxonomy");
JetApi.fileUpload = require("./apiRequesters/file_upload");

module.exports = JetApi;