var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Connection test", function() {
    this.timeout(10000);

    it("Should connect successfully", function(done) {
        JetApi.connect(process.env.TEST_API_USER, process.env.TEST_API_SECRET)
            .then(function(jetConnection) {
                assert(jetConnection.user === process.env.TEST_API_USER);
                assert(jetConnection.pass === process.env.TEST_API_SECRET);
                assert.ok(jetConnection.token);
                assert(jetConnection.token_type === "Bearer");
                assert.ok(jetConnection.expires_on);
                assert.ok(jetConnection.apiFacade);
                done();
            }, TestHelper.failureCallbackGenerator("Failed to connect successfully", done))
            .catch(TestHelper.failureCallbackGenerator("Failed to connect successfully", done));
    });
});