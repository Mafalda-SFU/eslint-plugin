/**
 * Forbid usage of `public` keyword instead of Javascript plain class members
 */
const noKeywordBasecAccesibility = require('../noKeywordBasedAccesibility');


module.exports = noKeywordBasecAccesibility(
  'public', 'Use a plain class member instead!'
)
