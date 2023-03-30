import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { saveTrustbadgeConfiguration } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { ITrustbadge } from '../../types'
import { getTrustbadge } from '../../testData/getTrustbadgeMock'

beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
})
describe('Save Trustbadge configuration', () => {
  test('SET_TRUSTBADGE_CONFIGURATION_PROVIDED payload should match with testTrustbadgeConfiguration', () => {
    let returnedTrustedge = {} as ITrustbadge

    const testTrustbadgeConfiguration = getTrustbadge('eTrustedChannelRefTest', TEST) as ITrustbadge

    const unsubscribe = registerEvents({
      [EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED]: function (event: { payload: ITrustbadge }) {
        returnedTrustedge = event.payload
      },
    })

    saveTrustbadgeConfiguration({ payload: testTrustbadgeConfiguration })

    expect(returnedTrustedge.eTrustedChannelRef).toBe(
      testTrustbadgeConfiguration.eTrustedChannelRef
    )
    expect(db.data?.trustbadgeConfiguration.length).toBe(1)
    expect(db.data?.trustbadgeConfiguration[0].eTrustedChannelRef).toBe(
      testTrustbadgeConfiguration.eTrustedChannelRef
    )
    unsubscribe()
  })
})
