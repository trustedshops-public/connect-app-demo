import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { saveUseEventsByOrderStatusForChannel } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { Estimatepayload } from '@/database-container/data-config'

beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
})
describe('Save use events by order status for channel', () => {
  test('activate: SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL payload should match with testPayloadByOrderStatus', () => {
    let returnedPayloadByOrderStatus = {} as Estimatepayload

    const testPayloadByOrderStatus: Estimatepayload = {
      eTrustedChannelRef: 'eTrustedChannelRefTest',
      salesChannelRef: 'salesChannelRefTest',
      active: true,
    }

    const unsubscribe = registerEvents({
      [EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: function (event: {
        payload: Estimatepayload
      }) {
        returnedPayloadByOrderStatus = event.payload
      },
    })

    saveUseEventsByOrderStatusForChannel({ payload: testPayloadByOrderStatus })

    expect(returnedPayloadByOrderStatus.eTrustedChannelRef).toBe(
      testPayloadByOrderStatus.eTrustedChannelRef
    )
    expect(returnedPayloadByOrderStatus.active).toBe(true)
    expect(db.data?.useEventsByOrderStatusForChannel.length).toBe(1)
    expect(db.data?.useEventsByOrderStatusForChannel[0].active).toBe(true)
    unsubscribe()
  })
  test('deactivate: SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL payload should match with testPayloadByOrderStatus', () => {
    let returnedPayloadByOrderStatus = {} as Estimatepayload

    const testPayloadByOrderStatus: Estimatepayload = {
      eTrustedChannelRef: 'eTrustedChannelRefTest',
      salesChannelRef: 'salesChannelRefTest',
      active: false,
    }

    const unsubscribe = registerEvents({
      [EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: function (event: {
        payload: Estimatepayload
      }) {
        returnedPayloadByOrderStatus = event.payload
      },
    })

    saveUseEventsByOrderStatusForChannel({ payload: testPayloadByOrderStatus })

    expect(returnedPayloadByOrderStatus.eTrustedChannelRef).toBe(
      testPayloadByOrderStatus.eTrustedChannelRef
    )
    expect(returnedPayloadByOrderStatus.active).toBe(false)
    expect(db.data?.useEventsByOrderStatusForChannel.length).toBe(1)
    expect(db.data?.useEventsByOrderStatusForChannel[0].active).toBe(false)
    unsubscribe()
  })
})
