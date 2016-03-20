var Constants = require("./Constants");
var ApiRequestHelper = require("./helpers/ApiRequestHelper");
var request = require('request');

var fileUploadRequester = {};

/**
 *
 * @param token
 * @param filename
 * @param filetype
 * @param gzippedFile
 * @param callback
 */
fileUploadRequester.uploadFile = function(token, filename, filetype, gzippedFile, callback) {
    if (!token || !filename || !gzippedFile) {
        callback(new Error("token, filename and gzippedFile must be present"));
    }
    else {
        getFileUploadToken(token, function(err, data) {
            if (err) {
                callback(err)
            }
            else {
                // // upload the file and return the jet file id
                //var jetFileId = data.jet_file_id;
                //
                //var options = {
                //    path: data.url,
                //    method: 'PUT',
                //    headersOverride: {
                //        "x-ms-blob-type": "blockblob"
                //    }
                //};
                //
                //ApiRequestHelper.request(null, options, function(err, data) {
                //    if (err) {
                //        callback(err);
                //    }
                //    else {
                //        var objectWithoutExpiry = {
                //            url: data.url,
                //            jet_file_id: data.jet_file_id
                //        };
                //
                //        callback(null, objectWithoutExpiry);
                //    }
                //});

                // use a direct library here since we don't need auth to upload

                var tokenObject = {
                    url: data.url,
                    jet_file_id: data.jet_file_id
                };

                uploadFile(filename, gzippedFile, data.url, function(err, data) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        notifyJet(token, filename, filetype, tokenObject.url, callback);
                    }
                });
            }
        });
    }
};

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

function uploadFile(filename, fileData, url, callback) {
    if (!filename || !fileData || !url) {
        callback(new Error("filename, fileData and url must be present"));
    } else {
        var options = {
            url: url,
            method: 'PUT',
            headers: {
                "x-ms-blob-type": "blockblob"
            }
        };
        var req = request(options, callback);
        var form = req.form();
        form.append('file', fileData, {
            filename: filename
        });
    }
}

function notifyJet(token, filename, filetype, url, callback) {
    if (!token || !filename || !filetype || !url) {
        callback(new Error("token, filename, filetype and url must be present"));
    } else {
        var options = {
            path: Constants.URL.FILE_UPLOAD.FILES_UPLOADED,
            method: 'POST',
            token: token
        };
        var payload = JSON.stringify({
            url: url,
            file_type: filetype,
            file_name: filename
        });

        ApiRequestHelper.request(payload, options, callback);
    }
}


module.exports = fileUploadRequester;