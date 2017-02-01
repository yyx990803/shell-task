const Task = require('../task');

new Task('mkdir -p test-cd')
    .then('cd test-cd')
    .then('git clone git@github.com:vuejs/vue-devtools.git')
    .then('cd vue-devtools')
    .then('ls')
    .then('cd ../..')
    .then('pwd')
    .then('rm -rf ./test-cd')
    .run(function(err, next) {
      if(err) {
        console.log(err);
      }
    });
