/**
 * Forbid usage of `public` keyword instead of Javascript plain class members
 */
const noKeywordBasecAccesibility = require('../noKeywordBasedAccesibility.js')


module.exports = noKeywordBasecAccesibility(
  'public', 'Use a plain class member instead!'
)
