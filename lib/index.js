const braceStyle = require('./rules/brace-style.js')
const noPrivateKeyword = require('./rules/no-private-keyword.js')
const noProtectedKeyword = require('./rules/no-protected-keyword.js')
const noPublicKeyword = require('./rules/no-public-keyword.js')
const noSetInterval = require('./rules/no-setInterval.js')
const noSetTimeout = require('./rules/no-setTimeout.js')
const noWindowEvent = require('./rules/no-window-event.js')


const layout = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/brace-style': ['error', 'allman-multiline'],
    'brace-style': 'off'  // Disabled for `@mafalda-sfu/brace-style`
  }
}

const suggestions = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/no-setInterval': 'error',
    '@mafalda-sfu/no-setTimeout': 'warn',
    '@mafalda-sfu/no-window-event': 'error'
  }
}

const typescript = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/no-private-keyword': 'error',
    '@mafalda-sfu/no-protected-keyword': 'warn',
    '@mafalda-sfu/no-public-keyword': 'error'
  }
}


exports.configs = {
  layout,
  recommended: {
    plugins: ['@mafalda-sfu'],
    rules: {
      ...layout.rules,
      ...suggestions.rules
    }
  },
  suggestions,
  'suggestions-typescript': typescript,
  typescript
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
