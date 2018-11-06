const test = require('ava')

const kicadJs = require('../')

test('kicad-js', function (t) {
  t.truthy(kicadJs, 'module is require-able')
})
