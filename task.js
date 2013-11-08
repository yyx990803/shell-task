var spawn = require('child_process').spawn

function Task (cmd, opts) {
    this.opts = opts || {
        stdio: 'inherit'
    }
    this.queue = []
    this.then(cmd)
}

Task.prototype.then = function (cmd) {
    if (typeof cmd === 'string') {
        cmd = splitCmd(cmd)
    }
    this.queue.push(cmd)
    return this
}

Task.prototype.run = function (onSuccess, onError) {
    this.onSuccess = onSuccess || ok
    this.onError = onError || fail
    run(this)
}

function run (task) {

    var step  = task.queue.shift()

    if (typeof step === 'function') {

        log('function: ' + step.name + '()', 32)
        try {
            step(next)
        } catch (e) {
            handle(e)
        }

    } else {

        log(step.raw)
        if (isSleep(step)) {
            return setTimeout(next, +step.args[0])
        }
        var child = spawn(step.cmd, step.args, task.opts)
        child.once('error', handle)
        child.once('exit', next)

    }

    function next (code) {
        if (typeof code === 'number' && code !== 0) {
            handle(new Error('process exited with unexpected code: ' + code))
        } else {
            if (task.queue.length) {
                run(task)
            } else {
                task.onSuccess()
            }
        }
    }

    function handle (err) {
        task.onError(err, next)
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
    log('Task completed.', 32)
}

function fail (e) {
    log('Task failed.', 31)
    log(e.toString(), 31)
}

function log (str, colorCode) {
    console.log('\x1B[' + (colorCode || 36) + 'm> ' + str + '\x1B[39m')
}

module.exports = Task