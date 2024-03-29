/**
 * @fileoverview Rule to flag use of `setTimeout`
 */
const noRestrictedFactory = require('../noRestrictedFactory.js')


const noRestrictedGlobals_options = [
  {
    message: 'Avoid using setTimeout.',
    name: 'clearTimeout'
  },
  {
    message: 'Avoid using setTimeout.',
    name: 'setTimeout'
  }
]
const noRestrictedProperties_options = [
  {
    message: 'Avoid using setTimeout.',
    object: 'window',
    property: 'clearTimeout'
  },
  {
    message: 'Avoid using setTimeout.',
    object: 'window',
    property: 'setTimeout'
  }
]


module.exports = noRestrictedFactory(
  noRestrictedGlobals_options, noRestrictedProperties_options
)
