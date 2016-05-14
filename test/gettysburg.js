var expect = require('chai').expect;
var mlog = require('mocha-logger');
var twaddle = require('..');

describe('Gettysburg', function() {
	before(function() {
		twaddle
			.register('lincoln', __dirname + '/data/gettysburg.txt')
			.compile('lincoln');
	});

	it('should have generated the chain', function() {
		var lib = twaddle.libraries.lincoln;
		expect(lib).to.have.property('chain');
	});

	it('should be able to generate 5 words', function() {
		var out = twaddle.generate('lincoln', 5);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(out).to.have.length.above(5);
		expect(out.split(/\s+/)).to.have.length.above(5);
	});

	it('should be able to generate 20 words', function() {
		var out = twaddle.generate('lincoln', 20);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(out).to.have.length.above(20);
		expect(out.split(/\s+/)).to.have.length.above(20);
	});

	it('should be able to generate 5 sentences', function() {
		var out = twaddle.generate('lincoln', {sentences: 5});
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(out).to.have.length.above(20);
		expect(out.split(/\./)).to.have.length.above(4);
	});

	it('should be able to generate 5 paragaphs', function() {
		var out = twaddle.generate('lincoln', {paragraphs: 5});
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(out).to.have.length.above(20);
		expect(out.split('\n\n')).to.have.length.above(1);
	});
});
