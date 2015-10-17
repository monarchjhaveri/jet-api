var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");

var expect = chai.expect;
var assert = chai.assert;

describe("Connection test", function() {
    this.timeout(10000);

    it("Should connect successfully", function(done) {
        JetApi.connect(process.env.API_USER, process.env.API_SECRET)
            .then(function(jetConnection) {
                assert(jetConnection.user === process.env.API_USER);
                assert(jetConnection.pass === process.env.API_SECRET);
                assert.ok(jetConnection.token);
                assert(jetConnection.token_type === "Bearer");
                assert.ok(jetConnection.expires_on);
                assert.ok(jetConnection.apiFacade);
                done();
            })
            .catch(function(error) {
                done(error);
            });
    });
});