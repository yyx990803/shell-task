var Task = require('./task')

new Task('echo "lets go"')
  .then('sleep 1000')
  .then(function doSomething (next) {
    throw new Error('whhaaaa')
    setTimeout(next, 1000)
  })
  .then('echo \'it went thru!\'')
  .run(function (err, next) {
    if (err && next) {
      console.log(err)
      next()
    }
  })