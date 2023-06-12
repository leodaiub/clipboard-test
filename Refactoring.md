# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- I refactored the calls to `crypto.createHash` to a function with one parameter because it was being called twice the same way, just with different parameters.

- The assignment of the `event.partitionKey` to the candidate variable was always going to happen if the `event.partitionKey` has a value, so I just used it on the declaration of the variable, I also removed/moved the `if(event)`, before this, because it was redundant, as if we have the `partitionKey` property, we will surely have the `event`, and if it happens to be `undefined`, we could use the optional chaining(eg: `event?.partitionKey`), but instead, I just added a fallback to an empty object at the `partitionKey` destructuring, the result is the same.

- Besides from adding the `event.partitionKey` value on the candidate variable declaration, I also added the feature of returning `"0"` as a fallback if the `event.partitionKey` is `undefined`.

- The else statement inside the `if(event)` was only going to happen if event is truthy, and does not have a `partitionKey` property, so I just abstracted that into one `if statement`, to make it more readable and less nested.

- As for the case of checking if the candidate's length is bigger than the `MAX_PARTITION_KEY_LENGTH`, I left it as is.

- For the case of checking if the candidate is of type `string`, if not, using `JSON.stringy` to turn it into a `string`, I just wrapped the candidate with `String()`, so it always returns a `string` anyway, the result fits the requirements.

#### Bonus: in the `/src` directory, I made another refactor using `TypeScript` and using a `Class` instead, might be worth a look, it's also fully tested with 100% coverage!

#### Bonus: Note that I added each step of refactor to a `git commit`.

#### 100% test coverage!