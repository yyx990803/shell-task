var Task = require('./task')

new Task('git init')
    .then('sleep 1000')
    .then('git add .')
    .then('git commit -m "testing this cool stuff"')
    .then('git push')
    .run(done, fail)

function done () {
    console.log('DONE')
}

// by default it will throw so this is optional
function fail (e) {
    console.log(e)
}