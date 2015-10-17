/**
 *
 * @param {!String} errorMessage
 * @param {!Object} httpResponse
 * @constructor
 */
function ApiRejection(errorMessage, httpResponse) {
    this.type = "ApiRejection";
    this.errorMessage = errorMessage;
    this.httpResponse = httpResponse;
}

module.exports = ApiRejection;