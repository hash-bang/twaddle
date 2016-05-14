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

| Key                 | Description                                  |
|---------------------|----------------------------------------------|
| `words`             | Generate at minimum this number of words     |
| `sentences`         | Generate at minimum this number of sentences |
