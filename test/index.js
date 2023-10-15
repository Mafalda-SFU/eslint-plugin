const {expect, use} = require('chai')
const {test} = require('mocha')
const {jestSnapshotPlugin} = require('mocha-chai-jest-snapshot')

const plugin = require('../lib/index.js')


use(jestSnapshotPlugin())


test('layout', function()
{
  expect(plugin).toMatchSnapshot()
})
