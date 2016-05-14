var _ = require('lodash');
var fs = require('fs');
var fspath = require('path');
var markoff = require('markoff');

var twaddle = {};

/**
* Lookup library of everything loaded
* Each entity should be a collection of the following form:
* {
* 	path: String, // Original path to source material
* 	chain: Object, // Optionally generated markov chain (can be omitted if not yet generated)
* }
* @var {Object}
*/
twaddle.libraries = {};


/**
* Register a new library
* @param {string} id The unique ID to register
* @param {string} path The path to the source material
* @param {Object} This chainable object
*/
twaddle.register = function(id, path) {
	if (twaddle.libraries[id]) throw new Error('Attempting to register over existing ID: ' + id);
	twaddle.libraries[id] = {
		path: path,
	};
	return twaddle;
};


/**
* Compile a loaded library
* @param {Object} This chainable object
*/
twaddle.compile = function(id, callback) {
	var lib = twaddle.libraries[id];
	if (!lib) throw new Error('ID not found: ' + id);
	if (lib.chain) return callback(null, lib); // Already compiled

	lib.chain = new markoff();

	_.castArray(lib.path).forEach(function(file) {
		fs.readFileSync(file, 'utf-8')
			.replace(/[^a-z0-9-\.\n']+/gi, ' ')
			.replace(/^[\s\t]+/g, '')
			.replace(/[\s\t]+$/g, '')
			.split("\n")
			.forEach(function(line) {
				lib.chain.addTokens(
					line
						.split(/\s+/g)
						.filter(function(w) { return !!w })
				);
			});
	});

	return twaddle;
};

/**
* Generate the specified amount of text
* @param {string} id The id of the library to use
* @param {Object|number} options Either an object of settings, or if this is a number the default value for options.words
* @param {number} [options.words=20] Generate at minimum this number of words
* @param {number} [options.sentences] Generate at minimum this number of sentences
* @param {number} [options.paragraphs] Generate at minimum this number of paragraphs (this can override `sentences` to produce its output)
* @param {number} [options.minSentencesPerParagraph=1] The smallest number of sentences that can consitute a paragraph
* @param {number} [options.maxSentencesPerParagraph=5] The largest number of sentences that can consitute a paragraph
* @param {string} [options.paragraphJoiner='\n\n'] The joining characters used between pargraphs
* @param {string} [options.paragraphStructure] An array of the sentence length of each paragraph. If omitted this is calculated and randomized from the above settings
* @param {string} The generated text
*/
twaddle.generate = function(id, options) {
	var lib = twaddle.libraries[id];
	if (!lib) throw new Error('ID not found: ' + id);
	if (!lib.chain) twaddle.compile(id);

	// Deal with options {{{
	if (!options) options = {words: 20};
	if (typeof options == 'number') options = {words: options};

	var settings = _.defaults({
		minSentencesPerParagraph: 1,
		maxSentencesPerParagraph: 5,
		paragraphStructure: [],
		paragraphJoiner: '\n\n',
	}, options);
	
	if (settings.paragraphs) { // Construct settings.paragraphStructure
		settings.paragraphStructure = _.times(settings.paragraphs, function() {
			return _.random(settings.minSentencesPerParagraph, settings.maxSentencesPerParagraph);
		});
		settings.sentences = Math.min(settings.sentences || 1, _.sum(settings.paragraphStructure)); // Calculate the minimum number of sentences needed to satisfy paragraphs
	}
	// }}}

	var buffer = [];

	while (true) {
		lib.chain.chain().forEach(function(w) {
			buffer.push(w);
		});

		if (
			(!settings.words || buffer.length >= settings.words) &&
			(!settings.sentences || buffer.filter(function(w) { return /\.$/.test(w) }).length >= settings.sentences)
		) {
			if (settings.paragraphs) { // Split sentences into paragraphs
				var sentences = buffer
					.join(' ') // Join everything together
					.split('.'); // Split into sentences

				return settings.paragraphStructure
					.map(function(no, i) {
						return _.times(no, function() {
							var sentence = sentences.shift();
							return sentence ? sentence + '.' : '';
						}).filter(function(w) { return !! w});
					})
					.filter(function(w) { return w != '' })
					.join(settings.paragraphJoiner);
			} else { // Return simple string
				return buffer.join(' ')
			}
		}
	}
};


/**
* Load all libraries from the ./data folder
* @param {Object} This chainable object
*/
twaddle.autoLoad = function(callback) {
	fs.readdir(fspath.join(__dirname, 'data'), function(err, res) {
		res.forEach(function(dir) {
			fs.readdir(fspath.join(__dirname, 'data', dir), function(err, files) {
				twaddle.register(dir, files.map(function(f) { return fspath.join(__dirname, 'data', dir, f) }));
			});
		});
	});

	return this;
};


module.exports = twaddle;

twaddle.autoLoad(); // Kick off the autoloader
