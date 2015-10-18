var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var JetConnection = require("../JetConnection");

var expect = chai.expect;
var assert = chai.assert;

describe("Products Namespace", function() {
    this.timeout(10000);

    describe("List Products", function(){
        it("Should return a list of all products currently on Jet", function(done) {
            JetApi.connect(process.env.API_USER, process.env.API_SECRET)
                .then(function(jetConnection) {
                    jetConnection.Products.listProducts()
                        .then(
                            function(successObject){
                                assert(successObject.sku_urls);
                                done();
                            }, done
                        ).catch(done);
                    }
                ).catch(done);
        });
    });

    describe("Create Products", function(){
        it("Should save the product on Jet.com", function(done) {
            JetApi.connect(process.env.API_USER, process.env.API_SECRET)
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

                    var sku = "123456782";
                    jetConnection.Products.createProduct(product, sku)
                        .then(
                        function(successObject){
                            assert(successObject.sku_urls);
                            done();
                        },
                        function(error) {
                            done(error.statusMessage);
                        }
                    ).catch(function(error) {
                            done(error.statusMessage);
                    });
                }
            ).catch(done);
        });
    });
});