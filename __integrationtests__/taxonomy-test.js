var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var JetConnection = require("../JetConnection");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Taxonomy Namespace", function() {
    this.timeout(10000);

    describe("List Taxonomy Nodes", function(){
        it("Should return a list of all of the nodes on Jet", function(done) {
            JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
                .then(function(jetConnection) {
                    jetConnection.Taxonomy.listNodes(0, 100)
                        .then(
                        function(successObject){
                            assert.ok(successObject.node_urls);
                            done();
                        }, TestHelper.failureCallbackGenerator("Failed to get product details.", done)
                    ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
                }
            ).catch(TestHelper.failureCallbackGenerator("Failed to get product details.", done));
        });
    });
});