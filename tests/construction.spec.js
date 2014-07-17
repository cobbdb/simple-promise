describe('simple-promise', function () {
    describe('construction', function () {
        var tester, promise = require('../src/promise.js');
        var taskVal, passVal, errVal;
        it('with no callbacks', function () {
            tester = promise(function (val) {
                taskVal = val;
            });
        });
        it('with one callback', function () {
            tester = promise(function (val) {
            }).error(function () {
            });
            tester = promise(function (val) {
            }).then(function () {
            });
        });
        it('with both callbacks', function () {
            tester = promise(function (val) {
            }).then(function () {
            }).error(function () {
            });
        });
    });
});
