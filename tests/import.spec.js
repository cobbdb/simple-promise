describe('simple-promise', function () {
    it('can be imported', function () {
        expect(function () {
            var promise = require('../src/promise.js');
        }).not.toThrow();
    });
    it('can be created', function () {
        expect(function () {
            var promise = require('../src/promise.js');
            var test = promise(function () {});
        }).not.toThrow();
    });
});
