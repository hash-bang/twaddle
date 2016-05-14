var expect = require('chai').expect;
var mlog = require('mocha-logger');
var twaddle = require('..');

describe('Libraries', function() {
	it('should have registered various libraries', function() {
		expect(twaddle).to.have.property('libraries');

		expect(twaddle.libraries).to.have.property('politics-au-gillard-julia');
		expect(twaddle.libraries).to.have.property('politics-us-kennedy-f-john');
	});

	it('generate: politics-au-gillard-julia', function() {
		var out = twaddle.generate('politics-au-gillard-julia');
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
	});

	it('generate: politics-us-kennedy-f-john', function() {
		var out = twaddle.generate('politics-us-kennedy-f-john');
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
	});
});
