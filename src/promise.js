var _ = require('underscore');
module.exports = function (task) {
    var callArgs = [], taskResult;
    var cbThen = function () {};
    var cbError = function () {};
    var done = function () {
        return cbThen.apply(this, _.flatten([
            callArgs,
            taskResult
        ]));
    };
    var child = function () {
        callArgs = _(arguments).values();
        if (callArgs.length === 0) {
            callArgs = null;
        }
        try {
            taskResult = task.apply(this, _.flatten([
                callArgs,
                done
            ]));
            return taskResult;
        } catch (err) {
            return cbError.apply(this, _.flatten([
                err,
                callArgs,
                taskResult
            ]));
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
    child.run = function () {
        var vals = _(arguments).values();
        return child.apply(this, vals);
    };
    return child;
};
