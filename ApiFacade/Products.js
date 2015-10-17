var querystring = require('querystring');
var Constants = require("./Constants");
var https = require("https");

var Products = {};

/**
 *
 * @param token
 * @param successCallback
 * @param failureCallback
 */
Products.list = function list(token, successCallback, failureCallback) {
    var options = {
        hostname: Constants.URL.ROOT,
        path: Constants.URL.PRODUCT.LIST,
        method: 'GET',
        headers: {
            "Host": "merchant-api.jet.com",
            "Content-Length": 0,
            "Authorization": "Bearer " + token
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

    req.end();
};

Products.create = function create(product, sku, token, successCallback, failureCallback) {
    var options = {
        hostname: Constants.URL.ROOT,
        path: Constants.URL.PRODUCT.CREATE.replace("{id}", sku),
        method: 'PUT',
        headers: {
            "Host": "merchant-api.jet.com",
            "Authorization": "Bearer " + token
        }
    };

    var req = https.request(options, function(res) {
        var data = "";

        res.setEncoding("utf8");
        res.on("data", function(chunk) {
            data += chunk;
        });
        res.on("end", function() {

            var theData;
            try {
                theData = JSON.parse(data);
            } catch (e) {
                if (e instanceof SyntaxError) {
                    theData = data;
                }
            }
            if (theData.errors) {
                failureCallback(theData.errors);
            } else {
                successCallback(theData);
            }
        })
    });

    if (product) {
        req.write(JSON.stringify(product));
    }

    req.end();
};

module.exports = Products;