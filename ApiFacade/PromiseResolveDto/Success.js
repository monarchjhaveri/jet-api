/**
 *
 * @param {!String|!Object} data
 * @constructor
 */
function Success(data) {
    this.type = "Success";
    this.data = data;
}

module.exports = Success;