var https = require("https");

var ApiRequestHelper = {};
var Constants = require("../Constants");

/**
 *
 * @param payload
 * @param _options
 * @param callback
 */
ApiRequestHelper.request = function(payload, _options, callback) {
    if (!_options.path) {
        callback(new Error('No path set in options.'))
    }

    var options = {
        hostname: Constants.URL.ROOT,
        path: _options.path,
        method: _options.method || 'GET',
        headers: {
            "Host": "merchant-api.jet.com",
            "Content-Type": "application/json",
            "Content-Length": payload ? Buffer.byteLength(payload) : 0,
            "Authorization": _options.token ? "Bearer " + _options.token : null
        }
    };

    var httpRequest = https.request(options, function(httpResponse) {
        var data = "";

        httpResponse.setEncoding("utf8");

        httpResponse.on("data", function(chunk) {
            data += chunk;
        });

        httpResponse.on("end", function() {
            var parsedData;
            try {
                parsedData = JSON.parse(data);
            } catch (e) {
                // The api should always send back JSON data.
                callback(e);
            }

            if (httpResponse.statusCode < 200 || httpResponse.statusCode > 299) {
                callback(new Error("Received response with status code " + httpResponse.statusCode));
            } else {
                callback(null, parsedData);
            }
        })
    });

    if (payload) {
        httpRequest.write(payload);
    }

    httpRequest.end();
};

module.exports = ApiRequestHelper;