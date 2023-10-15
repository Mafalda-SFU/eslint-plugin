/**
 * @fileoverview Rule to flag use of `setInterval` and `clearInterval`
 */
const noRestrictedFactory = require('../noRestrictedFactory.js')


const noRestrictedGlobals_options = [
  {
    message: 'Avoid using setInterval.',
    name: 'clearInterval'
  },
  {
    message: 'Avoid using setInterval.',
    name: 'setInterval'
  }
]
const noRestrictedProperties_options = [
  {
    message: 'Avoid using setInterval.',
    object: 'window',
    property: 'clearInterval'
  },
  {
    message: 'Avoid using setInterval.',
    object: 'window',
    property: 'setInterval'
  }
]


module.exports = noRestrictedFactory(
  noRestrictedGlobals_options, noRestrictedProperties_options
)
