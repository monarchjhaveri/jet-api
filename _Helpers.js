var Helpers = {};

var SKU_REGEX = /merchant-skus\/(.*)/;

/**
 *
 * @param {!String} url
 * @returns {String}
 */
Helpers.getSkuFromUrl = function(url) {
    var match = url.match(SKU_REGEX);
    if (match === null || match.length <= 1) {
        return null;
    } else {
        return match[1];
    }
};

module.exports = Helpers;