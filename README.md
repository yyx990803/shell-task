# shell-task

Proof-of-concept then-able shell commands in node. (Although it looks like a promise, it is NOT)

### Install
``` bash
$ npm install shell-task
```

### Usage
``` js
var Task = require('shell-task')

new Task('git init')
    .then('sleep 1000')
    .then('git add .')
    .then(doSomething)
    .then('git commit -m "testing this cool stuff"')
    .then('git remote add ...')
    .then('git push -u origin master')
    .run(onSuccess, onError)

// you can mix JavaScript functions in between...
function doSomething (next) {
    console.log('doing something...')
    setTimeout(next, 1000)
}

// both onSuccess and onError handlers are optional.
function onSuccess () {
    console.log('done!')
}

// any error or exit code other than 0 will abort task
// and call onError with the exception
function onError (err, next) {
    throw err
    // or you can ignore the exception
    // and just call next(), which will
    // continue the flow
}
```