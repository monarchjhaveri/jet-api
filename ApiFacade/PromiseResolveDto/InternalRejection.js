/**
 *
 * @param {!String} errorMessage
 * @param {!Object} httpResponse
 * @constructor
 */
function InternalRejection(errorMessage, httpResponse) {
    this.type = "InternalRejection";
    this.errorMessage = errorMessage;
    this.httpResponse = httpResponse;
}

module.exports = InternalRejection;