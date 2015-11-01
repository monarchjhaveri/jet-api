require('dotenv').load();
var TestHelper = {};
var JetApi = require("../jet-api");

TestHelper.generateRandomString = function(length) {
    var allowedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += allowedChars[Math.round(Math.random() * (allowedChars.length - 1))];
    return result;
};

/**
 *
 * @param callback
 * @param done
 */
TestHelper.doLoginAndThen = function(callback, done) {
    JetApi.authentication.connect(
        process.env.TEST_API_USER,
        process.env.TEST_API_SECRET,
        function(err, data) {
            if (err) {
                console.log("FAILED TO LOG IN!: Data received:", err, data);
                done("FAILED TO LOG IN!: Above log might contain details.");
            }
            callback(err, data);
        });
};

module.exports = TestHelper;