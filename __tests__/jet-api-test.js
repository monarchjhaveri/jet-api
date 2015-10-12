jest.dontMock("../jet-api");
jest.dontMock("../JetConnection/main.js");

var USERNAME = "username";
var PASSWORD = "password";

describe ("Creating a Connection", function(){
    it("returns a JetConnection object", function(){
        var JetApi = require("../jet-api");

        var JC = JetApi.connect();
        expect(JC).toBeTruthy();
    })
});

