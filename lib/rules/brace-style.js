'use strict';

const {Linter} = require('eslint');
const {filterReports} = require('eslint-rule-composer');
const objectUnfreeze = require('object-unfreeze');

const rules = new Linter().getRules();

const {
  create, meta, meta: {schema: [{enum: schemaEnum}, ...schema], type}
} = rules.get('brace-style');

// TODO: detect and forbit when `allman-multiline` style is wrong, not just
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
    const {getFilename, getSourceCode, options: [style]} = context

    if(style !== 'allman-multiline') return create(context)

    // `eslint` freezes all its objects, so we need to create an unfreezed copy
    const unfreezedContext = objectUnfreeze(context);
    unfreezedContext.getFilename = getFilename;
    unfreezedContext.getSourceCode = getSourceCode;
    unfreezedContext.options = objectUnfreeze(context.options);
    unfreezedContext.options[0] = 'allman'

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
