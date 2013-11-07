var spawn = require('child_process').spawn

function Task (cmd, opts) {
    this.opts = opts || {
        stdio: 'inherit'
    }
    this.queue = []
    this.then(cmd)
}

Task.prototype.then = function (cmd) {
    this.queue.push(splitCmd(cmd))
    return this
}

Task.prototype.run = function (onSuccess, onError) {
    this.onSuccess = onSuccess || ok
    this.onError = onError || fail
    run(this)
}

function run (task) {

    var step  = task.queue.shift()
    console.log('\x1B[32m' + step.raw + '\x1B[39m')

    if (isSleep(step)) {
        return setTimeout(function () {
            next(0)
        }, +step.args[0])
    }

    var child = spawn(step.cmd, step.args, task.opts)
    child.once('error', task.onError)
    child.once('exit', next)

    function next (code) {
        if (code !== 0) {
            task.onError(new Error('process exited with unexpected code: ' + code))
        } else {
            if (task.queue.length) {
                run(task)
            } else {
                task.onSuccess()
            }
        }
    }
}

function splitCmd (cmd) {
    var split = cmd.match(/(?:[^\s"]+|"[^"]*")+/g)
    return {
        cmd: split[0].trim(),
        args: split.slice(1).map(trim),
        raw: cmd
    }
}

function trim (str) {
    return str.trim()
}

function isSleep (step) {
    return step.cmd === 'sleep' &&
        step.args[0] == +step.args[0]
}

function ok () {
    console.log('task completed.')
}

function fail (e) {
    throw e
}

module.exports = Task