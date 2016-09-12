var expect    = require("chai").expect;
var mengenlehreuhr = require("../app/mengenlehreuhr");
var moment = require('moment');
var request = require("request");

describe("Testing ISO-8601 to Mengenlehreuhr Converter Server ", function() {

    it("ISO-8601 to Mengenlehreuhr server conversion with a given time", function() {
      var anyTime   = mengenlehreuhr.getTime("2007-04-05T14:30");

      var expected = {
		seconds: false,
		hours1: 4,
		hours5: 2,
		minutes1: 0,
		minutes5: 6
	  };

      expect(anyTime).to.deep.equal(expected);
    });

    it("ISO-8601 to Mengenlehreuhr server conversion without parameters (current time)", function() {
      var anyTime   = mengenlehreuhr.getTime();

      var expected = {
		seconds: (moment().seconds() % 2 === 1),
		hours1: moment().hours() % 5,
		minutes1: moment().minutes() % 5
	  };

      expect(anyTime.seconds).to.equal(expected.seconds);
      expect(anyTime.hours1).to.equal(expected.hours1);
      expect(anyTime.minutes1).to.equal(expected.minutes1);
    });

    /* Functional test, if server is up 
	var url = "http://localhost:8080/current";
    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    */

});