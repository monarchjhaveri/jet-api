require('dotenv').load();
var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var JetConnection = require("../JetConnection");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Products Namespace", function() {
    this.timeout(10000);

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
                        done(new Error("Failed to create product."));
                    }
                    //Todo: Test stuff here.

                    done();
                });
            }, done);
        });
    });

    describe("Get product details", function () {
        this.timeout(15000);
        it("Should get product details from Jet.com", function (done) {
            TestHelper.doLoginAndThen(function (err, loginData) {
                var token = loginData.id_token;
                listProductsAndThen(token, function (err, listData) {
                    var skuUrls = listData.sku_urls;
                    assert.isTrue(skuUrls && skuUrls.length > 0);
                    var testArray = skuUrls.slice(0,5); // max 5 test items
                }, done);
            }, done);
        });
    });
});
//
//    describe("Get product details", function(){
//
//        it("Should get product details from Jet.com", function(done) {
//            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
//                .then(function(jetConnection) {
//                    jetConnection.Products.listProductSkus()
//                        .then(
//                        function(skuArray){
//                            assert.isTrue(skuArray && skuArray.length > 0,
//                                "Must have at least 1 item in products on Jet.com in order to test getDetails.")
//
//                            var testArray = skuArray.slice(0,5); // max 5 test items
//
//                            Promise.all(testArray.map(function(testSku){
//                                return jetConnection.Products.getDetails(testSku);
//                            })).then(function(detailedDtoArray) {
//                                for (var i = 0; i < testArray.length; i++) {
//                                    var sku = testArray[i];
//                                    var detailedDto = detailedDtoArray.find(function(dto) {
//                                        return dto.merchant_sku === sku;
//                                    });
//                                    if (!detailedDto) {
//                                        done(new Error("No detailed object returned for merchant_sku===" + sku));
//                                    }
//                                }
//                                done();
//                            }).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
//                        },TestHelper.failureCallbackGenerator("Failed to get product details.", done)
//                    ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
//                }
//            ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
//        });
//    });
//});

function listProductsAndThen(token, callback, done) {
    JetApi.products.list(token, function(err, data) {
        if (err) {
            done(new Error("Failed to get list of all products."));
        }
        callback(err, data);
    });
}