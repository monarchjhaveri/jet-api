/**
 *
 * @param {!String} errorMessage
 * @param {Object} parsedResponse
 * @constructor
 */
function ApiRejection(errorMessage, parsedResponse) {
    this.type = "ApiRejection";
    this.errorMessage = errorMessage;
    this.response = parsedResponse;
}

module.exports = ApiRejection;