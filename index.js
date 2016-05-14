var fs = require('fs');
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
*/
twaddle.compile = function(id, callback) {
	var lib = twaddle.libraries[id];
	if (!lib) throw new Error('ID not found: ' + id);
	if (lib.chain) return callback(null, lib); // Already compiled

	var contents = fs.readFileSync(lib.path, 'utf-8');

	lib.chain = new markoff();

	contents
		.replace(/[^a-z0-9-\n']+/gi, ' ')
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

	return twaddle;
};


twaddle.batchSize = 10;


twaddle.generate = function(id, size) {
	var lib = twaddle.libraries[id];
	if (!lib) throw new Error('ID not found: ' + id);
	if (!lib.chain) twaddle.compile(id);

	var buffer = [];

	while (true) {
		lib.chain.chain(size).forEach(function(w) {
			buffer.push(w);
		});

		if (buffer.length > size) return buffer.slice(0, size).join(' ');
	}
};


module.exports = twaddle;
