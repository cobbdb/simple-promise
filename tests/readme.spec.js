describe('simple-promise', function () {
    describe('readme sample', function () {
        var tester, promise = require('../src/promise.js');
        it('Tom greets with then()', function (done) {
            var result;
            promise(function (name, done) {
                setTimeout(function () {
                    result = done(' says ', '!'); // Some async action.
                }, 100);
                return 'Hello';
            }).then(function (async1, async2, sync, name) {
                return name + async1 + sync + async2;
            }).run('Tom');
            setTimeout(function () {
                expect(result).toEqual('Tom says Hello!');
                done();
            }, 200);
        });
        it('Tom greets with error', function () {
            var result = promise(function (name) {
                throw Error('Hello!');
            }).error(function (err, name) {
                return name + ' says ' + err.message;
            }).run('Tom');
            expect(result).toEqual('Tom says Hello!');
        });
    });
});
