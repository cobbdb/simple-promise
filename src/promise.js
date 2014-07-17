module.exports = function (task) {
    var cbThen = function () {};
    var cbError = function () {};
    var child = function (opts) {
        try {
            task(opts);
            cbThen(opts);
        } catch (err) {
            cbError(err, opts);
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
        child(opts);
    };
    return child;
};
