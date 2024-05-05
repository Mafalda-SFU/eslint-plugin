/**
 * @file Allow braces to be on the same line for allman multiline style.
 */
'use strict'

const {Linter} = require('eslint')
const {filterReports} = require('eslint-rule-composer')
const objectUnfreeze = require('object-unfreeze')

const rules = new Linter().getRules()

const {
  create, meta, meta: {schema: [{enum: schemaEnum}, ...schema], type}
} = rules.get('brace-style')

// TODO: detect and forbid when `allman-multiline` style is wrong, not just
//       only being a relaxed version of `allman` style
const {create: create_filtered} = filterReports(create, validate)


function validate({node}, {sourceCode})
{
  let tokenBefore = sourceCode.getTokenBefore(node)

  if(tokenBefore.value === '=>')
    tokenBefore = sourceCode.getTokenBefore(tokenBefore)

  // Fails if not close parenthesis, or identifier in its same line
  return tokenBefore.value !== ')'
  || tokenBefore
    .loc.start.line === sourceCode.getTokenBefore(tokenBefore)
    .loc.end.line
}


module.exports = {
  create(context)
  {
    const {getFilename, options: [style], sourceCode} = context

    if(style !== 'allman-multiline') return create(context)

    // `eslint` freezes all its objects, so we need to create an unfreezed copy
    const unfreezedContext = objectUnfreeze(context)
    unfreezedContext.getFilename = getFilename
    unfreezedContext.options = objectUnfreeze(context.options)
    unfreezedContext.options[0] = 'allman'
    unfreezedContext.sourceCode = sourceCode

    return create_filtered(unfreezedContext)
  },

  meta: {
    ...meta,
    // HACK: needed so `eslint-plugin/prefer-message-ids` rule can pass
    messages: meta.messages,
    schema: [{enum: [...schemaEnum, 'allman-multiline']}, ...schema],
    type
  }
}
