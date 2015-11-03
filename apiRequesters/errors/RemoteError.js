var HTTPStatus = require ("http-status");

/**
 *
 * @param {!number} statusCode
 * @param {object} httpResponse
 * @constructor
 */
module.exports = function RemoteError(statusCode, httpResponse) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = "[" + statusCode + "] " + HTTPStatus[statusCode];
    this.statusCode = statusCode;
    this.httpResponse = httpResponse;
};

require('util').inherits(module.exports, Error);