var TestHelper = {};

/**
 *
 * @param {!String} message
 * @returns {Function}
 */
TestHelper.failureCallbackGenerator = function (message, done) {
    return function(values) {
        done(new Error(message, values));
    }
};

TestHelper.generateRandomString = function(length) {
    var allowedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += allowedChars[Math.round(Math.random() * (allowedChars.length - 1))];
    return result;
};

module.exports = TestHelper;