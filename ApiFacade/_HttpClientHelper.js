var https = require("https");

var HttpClientHelper = {};
var Constants = require("./Constants");

/**
 *
 * @param {!Object} theOptions
 * @param {Object} payload
 * @returns {Promise}
 */
HttpClientHelper.request = function request(theOptions, payload) {
    if (!theOptions.path) {
        return Promise.reject("Must have at least path defined in theOptions.")
    }

    var options = {
        hostname: Constants.URL.ROOT,
        path: theOptions.path,
        method: theOptions.method || 'GET',
        headers: {
            "Host": "merchant-api.jet.com",
            "Content-Type": "application/json",
            "Content-Length": payload ? Buffer.byteLength(payload) : 0,
            "Authorization": theOptions.token ? "Bearer " + theOptions.token : null
        }
    };

    return new Promise(function(resolve, reject) {
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
                    if (e instanceof SyntaxError) {
                        parsedData = data;
                    }
                }

                if (httpResponse.statusCode < 200 || httpResponse.statusCode > 299) {
                    reject(httpResponse);
                } else {
                    resolve(parsedData);
                }
            })
        });

        if (payload) {
            httpRequest.write(payload);
        }

        httpRequest.end();
    });
};

module.exports = HttpClientHelper;