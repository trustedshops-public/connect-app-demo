import { describe, expect, test } from 'vitest'
import { disconnected } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'

let isDisconnected = { status: false }

describe('Disconnect', ()=>{
  test('Disconnect', ()=>{
    renderHook(()=>{useMockDataBaseForBaseLayer()})
    const unsubscribe = registerEvents({
      // register the SET_AVAILABLE_PRODUCT_IDENTIFIERS event. This is the event that dispatches the exportPreviousOrder function
      [EVENTS.SET_DISCONNECTED]: function () {
        isDisconnected = { status: true }
      },
    })
    disconnected()
    unsubscribe()
    expect(isDisconnected.status).toBeTruthy()
  })
})