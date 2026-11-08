import assert from 'node:assert/strict'
import test from 'node:test'
import { campaignPage } from './campaigns'

test('uses the main page for campaigns created before page targeting', () => {
  assert.equal(campaignPage(), '/')
  assert.equal(campaignPage('/carta'), '/carta')
})
