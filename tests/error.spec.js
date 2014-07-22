describe('simple-promise', function () {
    describe('error handling', function () {
        var promise = require('../src/promise.js');
        it('falls through by default', function () {
            var tester = promise(function () {
                throw Error('testerror');
            });
            expect(function () {
                tester();
            }).toThrow('testerror');
        });
        it('exposes Error obj when defined', function () {
            var tester = promise(function (done) {
                throw Error('testerror');
            }).error(function (err) {
                expect(err.message).toEqual('testerror');
                done();
            });
        });
    });
});
