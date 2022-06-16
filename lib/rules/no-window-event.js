const noRestrictedFactory = require('../noRestrictedFactory');


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
);
