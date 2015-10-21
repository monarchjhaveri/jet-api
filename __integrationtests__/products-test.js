var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var JetConnection = require("../JetConnection");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Products Namespace", function() {
    this.timeout(10000);

    describe("List Products", function(){
        it("Should return a list of all products currently on Jet", function(done) {
            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
                .then(function(jetConnection) {
                    jetConnection.Products.listProductSkus()
                        .then(
                            function(successObject){
                                assert.ok(successObject);
                                done();
                            }, TestHelper.failureCallbackGenerator("Failed to get list of all products", done)
                        ).catch(TestHelper.failureCallbackGenerator("Failed to get list of all products", done));
                    }
                ).catch(TestHelper.failureCallbackGenerator("Failed to get list of all products", done));
        });
    });

    describe("Create Products", function(){
        it("Should save the product on Jet.com", function(done) {
            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
                .then(function(jetConnection) {

                    var product = {
                        "product_title": "My Product",
                        "standard_product_codes" : [
                            {
                                "standard_product_code": "123456789012",
                                "standard_product_code_type": "UPC"
                            }
                        ],
                        "multipack_quantity": 1
                    };

                    var sku = TestHelper.generateRandomString(10);
                    jetConnection.Products.createProduct(product, sku)
                        .then(
                        function(){
                            done();
                        }, TestHelper.failureCallbackGenerator("Failed to create product", done)
                    ).catch(TestHelper.failureCallbackGenerator("Failed to create product", done));
                }
            ).catch(TestHelper.failureCallbackGenerator("Failed to create product", done));
        });
    });

    describe("Get product details", function(){
        this.timeout(15000);
        it("Should get product details from Jet.com", function(done) {
            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
                .then(function(jetConnection) {
                    jetConnection.Products.listProductSkus()
                        .then(
                        function(skuArray){
                            assert.isTrue(skuArray && skuArray.length > 0,
                                "Must have at least 1 item in products on Jet.com in order to test getDetails.")

                            var testArray = skuArray.slice(0,5); // max 5 test items

                            Promise.all(testArray.map(function(testSku){
                                return jetConnection.Products.getDetails(testSku);
                            })).then(function(detailedDtoArray) {
                                for (var i = 0; i < testArray.length; i++) {
                                    var sku = testArray[i];
                                    var detailedDto = detailedDtoArray.find(function(dto) {
                                        return dto.merchant_sku === sku;
                                    });
                                    if (!detailedDto) {
                                        done(new Error("No detailed object returned for merchant_sku===" + sku));
                                    }
                                }
                                done();
                            }).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
                        },TestHelper.failureCallbackGenerator("Failed to get product details.", done)
                    ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
                }
            ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
        });
    });
});