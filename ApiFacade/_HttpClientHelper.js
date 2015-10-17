var https = require("https");

var HttpClientHelper = {};

/**
 *
 * @param {!Object} options
 * @param {Object} payload
 * @returns {Promise}
 */
HttpClientHelper.request = function request(options, payload) {
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