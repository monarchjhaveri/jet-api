var HTTPStatus = require ("http-status");

/**
 *
 * @param {!number} statusCode
 * @param {object} httpResponse
 * @constructor
 */
module.exports = function RemoteError(statusCode, httpResponse, extras) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = "[" + statusCode + "] " + HTTPStatus[statusCode] + "; " + extras;
    this.statusCode = statusCode;
    this.httpResponse = httpResponse;
    this.extras = extras;
};

require('util').inherits(module.exports, Error);