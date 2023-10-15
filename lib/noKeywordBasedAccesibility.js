/**
 * Forbid usage of keyword-based accesibility instead of Javascript class
 * members
 */
const {Linter} = require('eslint')


const rules = new Linter().getRules()

const {create: noRestrictedSyntax} = rules.get('no-restricted-syntax')


module.exports = function(accessibility, message)
{
  const options = [
    {
      message,
      selector: [
        `MethodDefinition[accessibility='${accessibility}']`,
        `PropertyDefinition[accessibility='${accessibility}']`,
        `TSParameterProperty[accessibility='${accessibility}']`
      ].join(', ')
    }
  ]

  return function(context)
  {
    context.options = options

    return noRestrictedSyntax(context)
  }
}
