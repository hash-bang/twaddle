Twaddle
=======
A never ending stream of nonsense using Markov chains and speeches of famous people.

This module is an extension to the excellent [Markoff](https://github.com/jcorbin/markoff) module, that comes pre-packaged with data to quickly generate filler text from profiles of various speeches.



Using a supplied data pack
--------------------------
See the [data](./data) directory for a full list of what data comes supplied with this module.

```javascript
var twaddle = require('twaddle');

console.log( twaddle.generate('politics-us-kennedy-f-john', {sentences: 1}) ); // Ask not what your country...
```


Combining data packs
--------------------
You can also supply `twaddle.generate()` with an array of ID's which will merge these data packs together:

```javascript
var twaddle = require('twaddle');

console.log( twaddle.generate(['politics-us-trump-donald', 'politics-de-hitler-adolph'], {paragraphs: 5}) );
```


Using your own data
-------------------

```javascript
var twaddle = require('twaddle');

twaddle.register('lincoln', __dirname + '/test/data/gettysburg.txt'))

console.log( twaddle.generate({words: 10}) ); // Four score and eleven...
```


See the [test](./test) directory for more complex examples.


API
===

twaddle.register(id, path)
--------------------------
Register a file of text against the ID to use later


twaddle.compile(id)
-------------------
Compile the given ID into a chain. This is done automatically if `generate(id)` is called without the chain being present.


twaddle.generate([options={words:20}])
--------------------------------------
Generate the specified amount of text.

The options parameter can be constructed of the following keys:

| Key                        | Default     | Description                                                                                                             |
|----------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| `words`                    | `20`        | Generate at minimum this number of words                                                                                |
| `sentences`                | `null`      | Generate at minimum this number of sentences                                                                            |
| `paragraphs`               | `null`      | Generate at minimum this number of paragraphs (this can override `sentences` to produce its output                      |
| `minSentencesPerParagraph` | `1`         | The smallest number of sentences that can constitute a paragraph                                                        |
| `maxSentencesPerParagraph` | `5`         | The largest number of sentences that can constitute a paragraph                                                         |
| `paragraphJoiner`          | `"\n\n"`    | The joining characters used between paragraphs                                                                          |
| `paragraphStructure`       | `[]`        | An array of the sentence length of each paragraph. If omitted this is calculated and randomized from the above settings |
| `fixTrim`                  | `true`      | Trim all paragraph content before output                                                                                |
| `fixCapitalFirst`          | `true`      | Check that all sentences have a capital letter first                                                                    |
