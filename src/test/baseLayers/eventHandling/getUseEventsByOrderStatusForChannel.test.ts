import { describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { Estimatepayload } from '@/database-container/data-config'
import { getUseEventsByOrderStatusForChannel } from '@/example-of-system-integration/baseLayers/eventHandling'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { renderHook } from '@testing-library/preact'

describe('Get use events by order status for channel', ()=>{
  test('Get use events by order status for channel using a valid payload', ()=>{
    renderHook(useMockDataBaseForBaseLayer)
    const testPayloadByOrderStatus: Estimatepayload = {
      eTrustedChannelRef: 'eTrustedChannelRefTest123',
      salesChannelRef: 'salesChannelRefTest123',
      active: true,
    }
    let eventEstimatePayload: Estimatepayload = {} as Estimatepayload

    db.data?.useEstimatedDeliveryDateForChannel.push(testPayloadByOrderStatus)
    const unsubscribe = registerEvents({
      [EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: function (event: {payload: Estimatepayload}) {
        eventEstimatePayload = event.payload
      },
    })

    const searchPayload: Estimatepayload = {
      active: false,
      eTrustedChannelRef: testPayloadByOrderStatus.eTrustedChannelRef,
      salesChannelRef: testPayloadByOrderStatus.salesChannelRef
    }
    getUseEventsByOrderStatusForChannel({payload: searchPayload})

    expect(eventEstimatePayload.eTrustedChannelRef).toBe(testPayloadByOrderStatus.eTrustedChannelRef)
    expect(eventEstimatePayload.salesChannelRef).toBe(testPayloadByOrderStatus.salesChannelRef)
    expect(eventEstimatePayload.active).toBe(true)
    unsubscribe()
  })
})