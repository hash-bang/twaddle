var expect = require('chai').expect;
var mlog = require('mocha-logger');
var twaddle = require('..');

describe('Combine', function() {
	it('should be able to combine IDs', function() {
		var out = twaddle.generate(['politics-au-gillard-julia', 'politics-us-kennedy-f-john']);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
	});
});
