describe('simple-promise', function () {
    describe('readme sample', function () {
        var tester, promise = require('../src/promise.js');
        it('Tom greets with then()', function (done) {
            var result;
            promise(function (name, done) {
                setTimeout(function () {
                    result = done(); // Some async action.
                }, 100);
                return 'Hello!';
            }).then(function (name, message) {
                return name + ' says ' + message;
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
