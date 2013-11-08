var Task = require('./task')

new Task('git init')
    .then('sleep 1000')
    .then(doSomething)
    .then('git add .')
    .then('git commit -m "testing this cool stuff"')
    .then('git push origin 123')
    .run()

function doSomething (next) {
    console.log('doing something...')
    setTimeout(next, 1000)
}