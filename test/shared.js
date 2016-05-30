/**
* Accept an input string and return an object counting the words, sentences and paragraphs
* @param {string} str The input string to process
* @return {Object} An object containing information on the input string
*/
function splitOutput(str) {
	return {
		length: str.length,
		words: str.split(/\s+/).length,
		sentences: str.split('. ').length,
		paragraphs: str.split(/\n+/).length,
	};
}

module.exports = {
	splitOutput: splitOutput,
};
