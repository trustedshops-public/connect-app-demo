import { describe, expect, test } from 'vitest'
import { getLocale } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'

describe('Get local',()=>{
  test('Get local',()=>{
    renderHook(useMockDataBaseForBaseLayer)
    let location: string = ''
    const unsubscribe = registerEvents({
      [EVENTS.SET_LOCALE]: function (event: { payload: string }) {
        location = event.payload
      },
    })
    getLocale()
    expect(location).toBe('en-GB')
    unsubscribe()
  })
})