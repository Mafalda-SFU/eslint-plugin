const braceStyle = require('./rules/brace-style.js')
const noPrivateKeyword = require('./rules/no-private-keyword.js')
const noProtectedKeyword = require('./rules/no-protected-keyword.js')
const noPublicKeyword = require('./rules/no-public-keyword.js')
const noSetInterval = require('./rules/no-setInterval.js')
const noSetTimeout = require('./rules/no-setTimeout.js')
const noWindowEvent = require('./rules/no-window-event.js')


exports.configs = {
  recommended: {
    plugins: ['@mafalda'],
    rules: {
      '@mafalda/brace-style': ['error', 'allman-multiline'],
      '@mafalda/no-setInterval': 'error',
      '@mafalda/no-setTimeout': 'warn',
      '@mafalda/no-window-event': 'error',
      'brace-style': 'off'  // Disabled for `@mafalda/brace-style`
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
