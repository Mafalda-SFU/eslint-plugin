/**
 * @file Rule to flag use of `window` object global `event` variable.
 */
const noRestrictedFactory = require('../noRestrictedFactory.js')


const noRestrictedGlobals_options = ['event']
const noRestrictedProperties_options = [
  {
    message: 'Avoid using event.',
    object: 'window',
    property: 'event'
  }
]


module.exports = noRestrictedFactory(
  noRestrictedGlobals_options, noRestrictedProperties_options
)
