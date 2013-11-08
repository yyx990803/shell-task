var Task = require('./task')

new Task('echo "lets go"')
    .then('sleep 1000')
    .then(doSomething)
    .then('echo "it went thru!"')
    .run(null, onErr)

function doSomething (next) {
    throw new Error('whhaaaa')
    setTimeout(next, 1000)
}

function onErr (e, next) {
    console.log(e)
    next()
}