# simple-promise [![Bower version](https://badge.fury.io/bo/jquery-beacons.svg)](http://badge.fury.io/bo/simple-promise) [![NPM version](https://badge.fury.io/js/grunt-docker-clone.svg)](http://badge.fury.io/js/simple-promise)

Simple and fast promise factory for Node and web apps.

    $ bower install simple-promise
    $ npm install simple-promise

-------------
## Load the library
Simple-Promise is a CommonJS library, so the require statement can
be used for both Node **and** web applications!

    var promise = require('simple-promise');

## Creating a new promise
At their core, promises look and behave like a normal function.

    var greet = promise(function (name) {
        console.log('Hello %s!', name);
    });

## Attach a success behavior
Callbacks can be a hassle and quickly create a mess. Tackle the common usage of callbacks with
a promise instead. The `then` function is optional and is called immediately after successful
completion of the promise.

    greet.then(function (name) {
        console.log('Farewell %s!', name);
    });

## Attach an error behavior
Sometimes things don't go as expected. Attach an optional error behavior to handle any
problems.

    greet.error(function (err, name) {
        console.log('%s caused an error! %s', name);
        console.error('%s : %s', err.name, err.message);
    });

## Chain your method calls
Each method supports chaining for quick and clean instantiation.

    var greet = promise(function () {
        console.log('First, this happened.');
    }).then(function () {
        console.log('Then, this happened.');
    }).error(function () {
        console.error("Hopefully this won't happen to you.");
    });

---------
* See: http://github.com/cobbdb/simple-promise
* License: MIT
