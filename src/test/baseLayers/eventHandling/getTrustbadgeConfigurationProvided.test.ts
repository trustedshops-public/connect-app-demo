import { describe, expect, test } from 'vitest'
import { getTrustbadgeConfigurationProvided } from '@/example-of-system-integration/baseLayers/eventHandling'
import { ITrustbadge } from '@/example-of-system-integration/baseLayers/types'
import { getTrustbadge } from '@/example-of-system-integration/baseLayers/testData/getTrustbadgeMock'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'

describe('Get Trustbadge Configuration Provided', () => {
  test('Trustbadge Configuration Provided contains all properties and values are correct', () => {
    const trustbadgeId = 'test_id_500'
    renderHook(useMockDataBaseForBaseLayer)
    const trustBadge: ITrustbadge = getTrustbadge(trustbadgeId, TEST) as ITrustbadge
    let trustBadgeFound: ITrustbadge = {} as ITrustbadge
    db.data?.trustbadgeConfiguration.push(trustBadge)
    const unsubscribe = registerEvents({
      [EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED]: function(event: { payload: ITrustbadge }) {
        trustBadgeFound = event.payload
      }
    })
    getTrustbadgeConfigurationProvided({ payload: { id: trustbadgeId } })
    expect(trustBadgeFound.eTrustedChannelRef).toBe('test_id_500')
    expect(trustBadge.children[0].attributes).toHaveProperty('async')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-desktop-y-offset')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-mobile-y-offset')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-desktop-disable-reviews')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-desktop-enable-custom')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-desktop-custom-width')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-desktop-enable-fadeout')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-disable-mobile')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-disable-trustbadge')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-mobile-custom-width')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-mobile-disable-reviews')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-mobile-enable-custom')
    expect(trustBadge.children[0].attributes).toHaveProperty('data-mobile-position')
    expect(trustBadge.children[0].attributes).toHaveProperty('charset')
    expect(trustBadge.children[0].attributes).toHaveProperty('src')
    expect(trustBadge.children[0].attributes.src.value)
      .toBe(`//widgets.trustedshops.com/js/${trustbadgeId}.js`)
    unsubscribe()
  })
})