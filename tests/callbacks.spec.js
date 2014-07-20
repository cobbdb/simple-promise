describe('simple-promise', function () {
    var tester, promise = require('../src/promise.js');
    var taskVal, passVal, errVal, errObj;
    beforeEach(function () {
        taskVal = passVal = errVal = errObj = null;
        tester = promise(function (val, done) {
            taskVal = val;
            done();
        });
    });
    describe('core task', function () {
        it('executes', function () {
            tester('bob');
            expect(taskVal).toEqual('bob');
        });
    });
    describe('pass callback', function () {
        it('runs after the core task', function () {
            tester('pass');
            expect(taskVal).toEqual('pass');
            expect(passVal).toBeNull();
            tester.then(function (val) {
                passVal = val;
            });
            tester('more');
            expect(taskVal).toEqual('more');
            expect(passVal).toEqual('more');
        });
    });
    describe('error callback', function () {
        it('runs on exception', function () {
            tester = promise(function (val) {
                taskVal = val;
                throw TypeError('thismessage');
            }).error(function (err, val) {
                errVal = val;
                errObj = err;
            });
            tester('steve');
            expect(errVal).toEqual('steve');
            expect(errObj.name).toEqual('TypeError');
            expect(errObj.message).toEqual('thismessage');
        });
    });
});
