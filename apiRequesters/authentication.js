var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");

var authenticationRequester = {};

authenticationRequester.connect = function(user, pass, callback) {
    if (!user || !pass) {
        callback(new Error("user and pass must both be present."));
    }

    var payload = JSON.stringify({
        user: user,
        pass: pass
    });

    var options = {
        path: Constants.URL.TOKEN,
        method: 'POST'
    };

    ApiRequestHelper.request(payload, options, callback);
};

module.exports = authenticationRequester;