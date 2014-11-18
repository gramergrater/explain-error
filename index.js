
function getStack(err) {
  return err.stack.substring(err.name.length + 3 + err.message.length)
    .split('\n')
}

function removePrefix (a, b) {
  return a.filter(function (e) {
    return !~b.indexOf(e)
  })
}

var explain = module.exports = function (err, message) {
  var _err = new Error(message)
  var stack = removePrefix(getStack(_err).slice(1), getStack(err)).join('\n')

  _err.stack =
    _err.name + ': ' + _err.message + '\n' +
    stack + '\n  ' + err.stack

  return _err
}

