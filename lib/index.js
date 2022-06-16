const braceStyle = require('./rules/brace-style')
const noPrivateKeyword = require('./rules/no-private-keyword')
const noProtectedKeyword = require('./rules/no-protected-keyword')
const noPublicKeyword = require('./rules/no-public-keyword')
const noSetInterval = require('./rules/no-setInterval')
const noSetTimeout = require('./rules/no-setTimeout')
const noWindowEvent = require('./rules/no-window-event')


exports.configs = {
  recommended: {
    plugins: ['@mafalda'],
    rules: {
      'brace-style': ['error', 'allman-multiline'],
      'no-set-interval': 'error',
      'no-set-timeout': 'warn',
      'no-window-event': 'error'
    }
  },
  typescript: {
    plugins: ['@mafalda'],
    rules: {
      'no-private-keyword': 'error',
      'no-protected-keyword': 'warn',
      'no-public-keyword': 'error'
    }
  }
}

exports.rules = {
  'brace-style': braceStyle,
  'no-private-keyword': noPrivateKeyword,
  'no-protected-keyword': noProtectedKeyword,
  'no-public-keyword': noPublicKeyword,
  'no-setInterval': noSetInterval,
  'no-setTimeout': noSetTimeout,
  'no-window-event': noWindowEvent
}
