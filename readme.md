# simple-promise [![Bower version](https://badge.fury.io/bo/simple-promise.svg)](http://badge.fury.io/bo/simple-promise) [![NPM version](https://badge.fury.io/js/simple-promise.svg)](http://badge.fury.io/js/simple-promise)

Simple and fast promise factory for Node and web apps.

    $ bower install simple-promise
    $ npm install simple-promise

-------------
## API

#### promise(task)
- **Param** task *Function* Entry point of the promise.
- **Returns** *Function*
      var say = promise(function (msg, name) {

  #### task([{args}], done)
  - **Param** [args] *Any* Task arguments.
  - **Param** done *Function* Call to signal end of task.
  - **Returns** *Any* Return value of `task`.
        var say = promise(function (msg, name, done) {

    #### done([{args}])
    - **Param** [args] *Any* Done arguments.
    - **Returns** *Any* Return value of `then` contract.*
          var thenResult = done('abc123');

#### promise.then(contract)
- **Param** contract *Function* Called on task's `done`.
- **Returns** *Any* Return value of `then` contract.
      say.then(function (async, sync, msg, name) {

  #### contract({async}, sync, {[args]})
  - **Param** async *Any* Call argument(s) of task's `done`.
  - **Param** sync *Any* Return value of `task`.
  - **Returns** *Any* Return value of `then` contract.
        say.then(function (async1, async2, sync, msg, name) {

#### promise.error(contract)
- **Param** contract *Function* Called on `task` error.
- **Returns** *Any* Return value of `error` contract.
      say.error(function (err, msg, name) {

  #### contract(err, {[args]})
  - **Param** err *Error* Error object thrown in `task`.
  - **Param** [args] *Any* All `task` arguments.
  - **Returns** *Any* Return value of `error` contract.
        say.error(function (err, msg, name) {

-------------
## Code Samples
Here are some quick code samples to help you get started.

### Load the library
Simple-Promise is a CommonJS library, so the require statement can
be used for both Node **and** web applications!

    var promise = require('simple-promise');

#### Creating a new promise
At their core, promises look and behave like a normal function.

    var greet = promise(function (name, done) {
        console.log('Hello %s!', name);
        done();
    });

#### Attach a success behavior
Callbacks can be a hassle and quickly create a mess. Tackle the common usage of callbacks with
a promise instead. The `then` function is optional and is called immediately after successful
completion of the promise.

    greet.then(function (async, sync, name) {
        console.log('Farewell %s!', name);
    });

#### Attach an error behavior
Sometimes things don't go as expected. Attach an optional error behavior to handle any
problems.

    greet.error(function (err, name) {
        console.log('%s caused an error!', name);
        console.error('%s : %s', err.name, err.message);
    });

#### Chain your method calls
Each method supports chaining for quick and clean instantiation.

    var greet = promise(function (done) {
        console.log('First, this happened.');
        done();
    }).then(function () {
        console.log('Then, this happened.');
    }).error(function () {
        console.error("Hopefully this won't happen to you.");
    });

#### Immediately invoke your promise
You can invoke immediately with the `run` method or parens.

    var go = promise(function (greeting, name) {
        console.log('%s %s!', greeting, name);
    });
    go.run('Hello', 'World');
    // ~ or ~ like this:
    go('Hello', 'World');

#### Collect all return values
Return values are passed along the chain so you can use them
however you need.

    var result;
    promise(function (name, done) {
        // Some async action.
        setTimeout(function () {
            result = done();
        }, 100);
        return 'Hello!';
    }).then(function (async, sync, name) {
        return name + ' says ' + sync;
    }).run('Tom');

    var result = promise(function (name) {
        throw Error('Hello!');
    }).error(function (err, name) {
        return name + ' says ' + err.message;
    }).run('Tom');

Both of these blocks will eventually output the same string;
`result` will equal `Tom says Hello!`

---------
* See: http://github.com/cobbdb/simple-promise
* License: MIT
