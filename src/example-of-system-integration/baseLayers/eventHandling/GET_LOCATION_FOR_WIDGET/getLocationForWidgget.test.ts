import { describe, expect, test } from 'vitest'
import { getLocationsForWidget } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { IWidgetLocation } from '@/example-of-system-integration/baseLayers/types'

describe('Get local', () => {
  test('Get local', () => {
    renderHook(useMockDataBaseForBaseLayer)
    let widgetLocation: Array<IWidgetLocation> = [] as Array<IWidgetLocation>
    const unsubscribe = registerEvents({
      [EVENTS.SET_LOCATION_FOR_WIDGET]: function(event: { payload: Array<IWidgetLocation> }) {
        widgetLocation = event.payload
      }
    })
    getLocationsForWidget()
    expect(widgetLocation.length).toBeGreaterThan(0)
    expect(widgetLocation[0]).toHaveProperty('id')
    expect(widgetLocation[0]).toHaveProperty('name')
    console.table(widgetLocation)
    unsubscribe()
  })
})