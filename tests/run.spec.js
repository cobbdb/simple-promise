describe('simple-promise', function () {
    describe('run method', function () {
        var tester, promise = require('../src/promise.js');
        var taskVal, passVal, errVal, errObj;

        it('immediately invokes', function () {
            var secondVal;
            tester = promise(function (val, second) {
                taskVal = val;
                secondVal = second;
            }).run('bob', 'debbie');
            expect(taskVal).toEqual('bob');
            expect(secondVal).toEqual('debbie');
        });
        it('invokes side effects', function () {
            promise(function (val, done) {
                taskVal = val;
                done();
            }).then(function (val) {
                passVal = val;
            }).run('sara');
            expect(taskVal).not.toEqual('roger');
            expect(passVal).toEqual('sara');
        });
        it('returns final result', function (done) {
            var total;
            tester = promise(function (val, done) {
                setTimeout(function () {
                    total = done();
                }, 100);
                return 'abc';
            }).then(function (val, res) {
                return '123' + res;
            }).run();
            setTimeout(function () {
                expect(tester).toEqual('abc');
                expect(total).toEqual('123abc');
                done();
            }, 200);
        });
    });
});
