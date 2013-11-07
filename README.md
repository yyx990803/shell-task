# shell-task

Proof-of-concept then-able shell commands in node.

``` js

var Task = require('shell-task')

new Task('git init')
    .then('sleep 1000')
    .then('git add .')
    .then('git commit -m "testing this cool stuff"')
    .then('git remote add ...')
    .then('git push -u origin master')
    .run(onSuccess, onError)

```