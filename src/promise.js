module.exports = function (task) {
    var cbThen = function () {};
    var cbError = function () {};
    var child = function (opts) {
        var result;
        try {
            result = task(opts);
            return cbThen(opts, result);
        } catch (err) {
            return cbError(err, opts, result);
        }
    };
    child.then = function (cb) {
        cbThen = cb;
        return child;
    };
    child.error = function (cb) {
        cbError = cb;
        return child;
    };
    child.run = function (opts) {
        return child(opts);
    };
    return child;
};
