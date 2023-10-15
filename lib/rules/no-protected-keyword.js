/**
 * Forbid usage of `protected` keyword instead of a Javascript `_[underscore]`
 * class members
 */
const noKeywordBasecAccesibility = require('../noKeywordBasedAccesibility.js')


module.exports = noKeywordBasecAccesibility(
  'protected', 'Use an _underscore class member instead!'
)
