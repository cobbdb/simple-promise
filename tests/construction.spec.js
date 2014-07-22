describe('simple-promise', function () {
    describe('construction', function () {
        var tester, promise = require('../src/promise.js');
        var taskVal, passVal, errVal;
        it('with no callbacks', function () {
            expect(function () {
                tester = promise(function (val) {
                    taskVal = val;
                });
                expect(tester).toBeDefined();
            }).not.toThrow();
        });
        it('with one callback', function () {
            expect(function () {
                tester = promise(function () {
                }).error(function () {
                });
                expect(tester).toBeDefined();
                tester = promise(function () {
                }).then(function () {
                });
                expect(tester).toBeDefined();
            }).not.toThrow();
        });
        it('with both callbacks', function () {
            expect(function () {
                tester = promise(function () {
                }).then(function () {
                }).error(function () {
                });
                expect(tester).toBeDefined();
            }).not.toThrow();
        });
    });
});
