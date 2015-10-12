var querystring = require('querystring');
var Constants = require("./Constants");
var https = require("https");

var Authentication = {};

Authentication.authenticate = function authenticate(apiUser, apiSecret, successCallback, failureCallback) {
    var payload = JSON.stringify({
        user: apiUser,
        pass: apiSecret
    });

    var options = {
        hostname: Constants.URL.ROOT,
        path: Constants.URL.TOKEN,
        method: 'POST',
        headers: {
            "Host": "merchant-api.jet.com",
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload)
        }
    };

    var req = https.request(options, function(res) {
        var data = "";

        res.setEncoding("utf8");
        res.on("data", function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            var theData = JSON.parse(data);
            if (theData.errors) {
                failureCallback(theData.errors);
            } else {
                successCallback(theData);
            }
        })
    });

    req.write(payload);
    req.end();
};

module.exports = Authentication;