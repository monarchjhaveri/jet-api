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
                                assert.ok(successObject.sku_urls);
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
                        function(successObject){
                            assert.ok(successObject.sku_urls);
                            done();
                        }, TestHelper.failureCallbackGenerator("Failed to create product", done)
                    ).catch(TestHelper.failureCallbackGenerator("Failed to create product", done));
                }
            ).catch(TestHelper.failureCallbackGenerator("Failed to create product", done));
        });
    });

    describe("Get product details", function(){
        it("Should get product details from Jet.com", function(done) {
            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
                .then(function(jetConnection) {
                    jetConnection.Products.listProductSkus()
                        .then(
                        function(successObject){
                            assert.ok(successObject.sku_urls.length,
                                "Must have at least 1 item in products on Jet.com in order to test getDetails.");

                            var testArray = successObject.sku_urls.slice(0,5); // max 5 test items

                            Promise.all(testArray.map(function(d){
                                var sku = JetApi.Helpers.getSkuFromUrl(d);
                                return jetConnection.Products.getDetails(sku);
                            })).then(function(values) {
                                done();
                            }).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
                        },TestHelper.failureCallbackGenerator("Failed to get product details.", done)
                    ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
                }
            ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
        });
    });
});