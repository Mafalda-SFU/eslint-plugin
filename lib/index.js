/**
 * @fileoverview This module exports ESLint configurations and rules for the project.
 * @module index
 */
const braceStyle = require('./rules/brace-style.js')
const noPrivateKeyword = require('./rules/no-private-keyword.js')
const noProtectedKeyword = require('./rules/no-protected-keyword.js')
const noPublicKeyword = require('./rules/no-public-keyword.js')
const noSetInterval = require('./rules/no-setInterval.js')
const noSetTimeout = require('./rules/no-setTimeout.js')
const noWindowEvent = require('./rules/no-window-event.js')


/**
 * Layout rules.
 * @type {Object}
 * @property {Array} plugins - The list of plugins to use.
 * @property {Object} rules - The rules to apply.
 */
const layout = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/brace-style': ['error', 'allman-multiline'],
    'brace-style': 'off'  // Disabled for `@mafalda-sfu/brace-style`
  }
}

/**
 * Suggestion rules.
 * @type {Object}
 * @property {Array} plugins - The list of plugins to use.
 * @property {Object} rules - The rules to apply.
 */
const suggestions = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/no-setInterval': 'error',
    '@mafalda-sfu/no-setTimeout': 'warn',
    '@mafalda-sfu/no-window-event': 'error'
  }
}

/**
 * Typescript rules.
 * @type {Object}
 * @property {Array} plugins - The list of plugins to use.
 * @property {Object} rules - The rules to apply.
 */
const typescript = {
  plugins: ['@mafalda-sfu'],
  rules: {
    '@mafalda-sfu/no-private-keyword': 'error',
    '@mafalda-sfu/no-protected-keyword': 'warn',
    '@mafalda-sfu/no-public-keyword': 'error'
  }
}


/**
 * The module exports the following configurations:
 * - `layout`
 * - `recommended`
 * - `suggestions`
 * - `suggestions-typescript`
 * - `typescript`
 * @type {Object}
 * @property {Object} layout - The layout configuration object.
 * @property {Object} recommended - The recommended configuration object.
 * @property {Object} suggestions - The suggestions configuration object.
 * @property {Object} suggestions-typescript - The TypeScript suggestions configuration object.
 * @property {Object} typescript - The TypeScript configuration object.
 */
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

/**
 * The module exports the following rules:
 * - `brace-style`
 * - `no-private-keyword`
 * - `no-protected-keyword`
 * - `no-public-keyword`
 * - `no-setInterval`
 * - `no-setTimeout`
 * - `no-window-event`
 * @type {Object}
 */
exports.rules = {
  'brace-style': braceStyle,
  'no-private-keyword': noPrivateKeyword,
  'no-protected-keyword': noProtectedKeyword,
  'no-public-keyword': noPublicKeyword,
  'no-setInterval': noSetInterval,
  'no-setTimeout': noSetTimeout,
  'no-window-event': noWindowEvent
}
