/**
 * Forbid usage of `private` keyword instead of Javascript `#[private]` class
 * members
 */
const noKeywordBasecAccesibility = require('../noKeywordBasedAccesibility.js');


module.exports = noKeywordBasecAccesibility(
  'private', 'Use a #private member instead!'
)
