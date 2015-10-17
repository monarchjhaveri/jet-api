/**
 *
 * @param {!String} errorMessage
 * @param {Object} parsedResponse
 * @constructor
 */
function InternalRejection(errorMessage, parsedResponse) {
    this.type = "InternalRejection";
    this.errorMessage = errorMessage;
    this.response = parsedResponse;
}

module.exports = InternalRejection;