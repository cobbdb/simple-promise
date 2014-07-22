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
            })('sara');
            expect(taskVal).not.toEqual('roger');
            expect(passVal).toEqual('sara');
        });
        it('returns final result', function (done) {
            var total;
            tester = promise(function (done) {
                setTimeout(function () {
                    total = done();
                }, 100);
                return 'abc';
            }).then(function (sync) {
                return '123' + sync;
            }).run();
            setTimeout(function () {
                expect(tester).toEqual('abc');
                expect(total).toEqual('123abc');
                done();
            }, 200);
        });
    });
});
