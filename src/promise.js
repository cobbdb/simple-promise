var _ = require('underscore');
module.exports = function (task) {
    var callArgs = [], taskResult;
    var cbThen = function () {};
    var cbError = function (err) {
        throw err;
    };
    var done = function () {
        var doneArgs = _(arguments).values();
        taskResult = taskResult || [];
        return cbThen.apply(this, _.flatten([
            doneArgs,
            taskResult,
            callArgs
        ], true));
    };
    var child = function () {
        callArgs = _(arguments).values();
        try {
            taskResult = task.apply(this, _.flatten([
                callArgs,
                done
            ], true));
            return taskResult;
        } catch (err) {
            return cbError.apply(this, _.flatten([
                err,
                callArgs
            ], true));
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
