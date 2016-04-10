var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");
var request = require('request');

var fileUploadRequester = {};

fileUploadRequester.getFileUploadToken = getFileUploadToken;
fileUploadRequester.uploadFile = uploadFile;
fileUploadRequester.notifyJet = notifyJet;


function getFileUploadToken(token, callback) {
    if (!token) {
        callback(new Error("token must be present"));
    }
    else {
        var options = {
            path: Constants.URL.FILE_UPLOAD.GET_UPLOAD_TOKEN,
            method: 'GET',
            token: token
        };
        ApiRequestHelper.request(null, options, callback);
    }
}

/**
 * No need for token here
 * @param filename
 * @param fileData
 * @param url
 * @param callback
 */
function uploadFile(filename, fileData, url, callback) {
    if (!filename || !fileData || !url) {
        callback(new Error("filename, fileData and url must be present"));
    } else {
        var options = {
            url: url,
            method: 'PUT',
            headers: {
                "x-ms-blob-type": "blockblob",
                "Content-Length": (fileData && fileData.length) ? fileData.length : 0
            }
        };
        var req = request(options, callback);
        var form = req.form();
        form.append('file', fileData, {
            filename: filename
        });
    }
}

/**
 *
 * @param token
 * @param filename
 * @param filetype
 * @param uploadToken
 * @param callback
 */
function notifyJet(token, filename, filetype, uploadToken, callback) {
    if (!token || !filename || !filetype || !uploadToken) {
        callback(new Error("token, filename, filetype and uploadToken must be present"));
    } else {

        var options = {
            path: Constants.URL.FILE_UPLOAD.FILES_UPLOADED,
            method: 'POST',
            token: token
        };
        var payload = JSON.stringify({
            url: uploadToken.url,
            file_type: filetype,
            file_name: filename
        });

        ApiRequestHelper.request(payload, options, callback);
    }
}


module.exports = fileUploadRequester;