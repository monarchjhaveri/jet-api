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
        var request = https.request(options, function(response) {
            var data = "";

            response.setEncoding("utf8");

            response.on("data", function(chunk) {
                data += chunk;
            });

            response.on("end", function() {
                var parsedData;
                try {
                    parsedData = JSON.parse(data);
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        parsedData = data;
                    }
                }

                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(parsedData, response);
                } else {
                    resolve(parsedData, response);
                }
            })
        });

        if (payload) {
            request.write(payload);
        }

        request.end();
    });
};

module.exports = HttpClientHelper;