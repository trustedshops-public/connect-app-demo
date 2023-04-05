import { describe, expect, test } from 'vitest'
import { getUseEstimatedDeliveryDateForChannel } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { Estimatepayload } from '@/database-container/data-config'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'

describe('Get use estimated delivery date for channel', ()=>{
  test('estimated delivery date using proper payload', ()=>{
    renderHook(useMockDataBaseForBaseLayer)
    const testPayloadByOrderStatus: Estimatepayload = {
      eTrustedChannelRef: 'eTrustedChannelRefTest123',
      salesChannelRef: 'salesChannelRefTest123',
      active: true,
    }
    let eventEstimatePayload: Estimatepayload = {} as Estimatepayload

    db.data?.useEstimatedDeliveryDateForChannel.push(testPayloadByOrderStatus)
    const unsubscribe = registerEvents({
      [EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL]: function (event: {payload: Estimatepayload}) {
        eventEstimatePayload = event.payload
      },
    })
    const searchPayload: Estimatepayload = {
      active: false,
      eTrustedChannelRef: testPayloadByOrderStatus.eTrustedChannelRef,
      salesChannelRef: testPayloadByOrderStatus.salesChannelRef
    }
    getUseEstimatedDeliveryDateForChannel({payload: searchPayload})
    expect(eventEstimatePayload.eTrustedChannelRef).toBe(testPayloadByOrderStatus.eTrustedChannelRef)
    expect(eventEstimatePayload.salesChannelRef).toBe(testPayloadByOrderStatus.salesChannelRef)
    expect(eventEstimatePayload.active).toBe(true)
    unsubscribe()
    unsubscribe()
  })
})