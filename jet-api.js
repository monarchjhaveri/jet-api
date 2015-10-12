require('dotenv').load();
var JetConnection = require("./JetConnection");

var JetApi = {};

JetApi.connect = function connect() {
    return new JetConnection(
        process.env.API_USER,
        process.env.API_SECRET
    );
};

module.exports = JetApi;