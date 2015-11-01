require('dotenv').load();
var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Products Namespace", function() {
    this.timeout(25000);

    describe("List Products", function () {
        it("Should return a list of all products currently on Jet", function (done) {
            TestHelper.doLoginAndThen(function (err, loginData) {
                var token = loginData.id_token;
                listProductsAndThen(token, function (err, listData) {
                    // Todo: add more tests here.
                    assert.ok(listData);
                    expect(listData.sku_urls).to.have.length.above(0);
                    done();
                }, done);
            }, done);
        });
    });

    describe("Create Products", function () {
        it("Should save the product on Jet.com", function (done) {
            TestHelper.doLoginAndThen(function (err, data) {
                var token = data.id_token;

                var product = {
                    "product_title": "My Product",
                    "standard_product_codes": [
                        {
                            "standard_product_code": "123456789012",
                            "standard_product_code_type": "UPC"
                        }
                    ],
                    "multipack_quantity": 1
                };

                var sku = TestHelper.generateRandomString(10);

                JetApi.products.create(sku, product, token, function (err, data) {
                    if (err) {
                        var errorMessage = "FAILED TO CREATE PRODUCT!";
                        console.log(errorMessage, err, data)
                        done(new Error(errorMessage));
                    }

                    //Todo: Test stuff here.
                    done();
                });
            }, done);
        });
    });

    describe("Get product details", function () {
        this.timeout(25000);
        it("Should get product details from Jet.com", function (done) {
            TestHelper.doLoginAndThen(function (err, loginData) {
                var token = loginData.id_token;
                listProductsAndThen(token, function (err, listData) {
                    var skuUrls = listData.sku_urls;
                    assert.isTrue(skuUrls && skuUrls.length > 0);
                    done();
                }, done);
            }, done);
        });
    });
});

function listProductsAndThen(token, callback, done) {
    JetApi.products.list(token, function(err, data) {
        if (err) {
            done(new Error("Failed to get list of all products."));
        }
        callback(err, data);
    });
}