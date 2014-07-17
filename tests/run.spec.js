describe('simple-promise', function () {
    describe('run method', function () {
        var tester, promise = require('../src/promise.js');
        var taskVal, passVal, errVal, errObj;

        it('immediately invokes', function () {
            tester = promise(function (val) {
                taskVal = val;
            }).run('bob');
            expect(taskVal).toEqual('bob');
        });
        it('invokes side effects', function () {
            promise(function (val) {
                taskVal = val;
            }).then(function (val) {
                passVal = val;
            }).run('sara');
            expect(taskVal).not.toEqual('roger');
            expect(passVal).toEqual('sara');
        });
        it('returns final result', function () {
            tester = promise(function (val) {
                return 'abc';
            }).then(function (val, res) {
                return '123' + res;
            }).run('sara');
            expect(tester).toEqual('123abc');
        });
    });
});
