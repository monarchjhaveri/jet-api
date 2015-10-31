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
        JetApi.authentication.connect(
            process.env.TEST_API_USER,
            process.env.TEST_API_SECRET,
            function(err, data) {
                console.log(err, data);
                if (err) {
                    console.log("FAILED TO LOG IN!: Data received:", err, data);
                    done("FAILED TO LOG IN!: Above log might contain details.");
                }
                assert.ok(data.id_token);
                assert(data.token_type === "Bearer");
                assert.ok(data.expires_on);
                done();
            });
    });
});