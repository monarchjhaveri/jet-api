/**
 *
 * @param {Object} parsedResponse
 * @constructor
 */
function Success(parsedResponse) {
    this.type = "Success";
    this.response = parsedResponse;
}

module.exports = Success;