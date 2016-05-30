var expect = require('chai').expect;
var mlog = require('mocha-logger');
var twaddle = require('..');
var twaddleAnalysis = require('./shared');

describe('Adolph Hitler', function() {
	var key = 'politics-de-hitler-adolf';

	it('should have prepared the library entry', function() {
		var lib = twaddle.libraries[key];
		expect(lib).to.have.property('path');
	});

	it('should be able to generate 5 words', function() {
		var out = twaddle.generate(key, 5);
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.words).to.be.above(4);
	});

	it('should be able to generate 20 words', function() {
		var out = twaddle.generate(key, 20);
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.words).to.be.above(19);
	});

	it('should be able to generate 5 sentences', function() {
		var out = twaddle.generate(key, {sentences: 5});
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.sentences).to.be.above(4);
	});

	it('should be able to generate 5 paragaphs', function() {
		var out = twaddle.generate(key, {paragraphs: 5});
		var analysis = twaddleAnalysis.splitOutput(out);
		mlog.log('Generated:', out);
		expect(out).to.be.a.string;
		expect(analysis.paragraphs).to.be.above(4);
	});
});
