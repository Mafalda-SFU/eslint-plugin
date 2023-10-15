const {Linter} = require('eslint')
const ruleComposer = require('eslint-rule-composer')


const rules = new Linter().getRules()

const {create: noRestrictedGlobals} = rules.get('no-restricted-globals')
const {create: noRestrictedProperties} = rules.get('no-restricted-properties')


module.exports = function(
  noRestrictedGlobals_options, noRestrictedProperties_options
) {
  return ruleComposer.joinReports([
    function(context)
    {
      context.options = noRestrictedGlobals_options

      return noRestrictedGlobals(context)
    },
    function(context)
    {
      context.options = noRestrictedProperties_options

      return noRestrictedProperties(context)
    }
  ])
}
