require('dotenv').load();
var chai = require("chai");
var mocha = require("mocha");
var JetApi = require("../jet-api");
var TestHelper = require("./TestHelper");

var expect = chai.expect;
var assert = chai.assert;

describe("Connection test", function() {
    this.timeout(10000);

    it("Should connect successfully", function(done) {
        TestHelper.doLoginAndThen(function(err, data) {
            assert.ok(data.id_token);
            assert(data.token_type === "Bearer");
            assert.ok(data.expires_on);
            done();
        }, done);
    });
});