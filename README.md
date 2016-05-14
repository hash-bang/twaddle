Twaddle
=======
A never ending stream of nonsense using Markov chains and speaches of famous people.


```javascript
var twaddle = require('twaddle');

twaddle.register('lincoln', __dirname + '/test/data/gettysburg.txt'))

var nonsense = twaddle.generate({words: 10});
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
| `minSentencesPerParagraph` | `1`         | The smallest number of sentences that can consitute a paragraph                                                         |
| `maxSentencesPerParagraph` | `5`         | The largest number of sentences that can consitute a paragraph                                                          |
| `paragraphJoiner`          | `"\n\n"`    | The joining characters used between pargraphs                                                                           |
| `paragraphStructure`       | `[]`        | An array of the sentence length of each paragraph. If omitted this is calculated and randomized from the above settings |
