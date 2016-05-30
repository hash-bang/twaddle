var expect = require('chai').expect;
var mlog = require('mocha-logger');
var twaddle = require('..');
var twaddleAnalysis = require('./shared');

describe('Custom library file: Gettysburg Address', function() {
	before(function() {
		twaddle
			.register('gettysburg', __dirname + '/../data/politics-us-lincoln-abraham/the-gettysburg-address.txt')
			.compile('gettysburg');
	});

	it('should have generated the chain', function() {
		var lib = twaddle.libraries.gettysburg;
		expect(lib).to.have.property('chain');
	});

	it('should be able to generate 5 words', function() {
		var out = twaddle.generate('gettysburg', 5);
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.words).to.be.above(4);
	});

	it('should be able to generate 20 words', function() {
		var out = twaddle.generate('gettysburg', 20);
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.words).to.be.above(19);
	});

	it('should be able to generate 5 sentences', function() {
		var out = twaddle.generate('gettysburg', {sentences: 5});
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.sentences).to.be.above(4);
	});

	it('should be able to generate 5 paragaphs', function() {
		var out = twaddle.generate('gettysburg', {paragraphs: 5});
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.paragraphs).to.be.above(4);
	});
});
