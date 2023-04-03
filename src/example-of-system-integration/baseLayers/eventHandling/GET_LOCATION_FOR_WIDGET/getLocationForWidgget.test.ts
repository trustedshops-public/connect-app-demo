import { describe, expect, test } from 'vitest'
import { getLocationsForWidget } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { IWidgetLocation } from '@/example-of-system-integration/baseLayers/types'

describe('Get Widget location', () => {
  test('Get Widget location', () => {
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
    expect(widgetLocation[0].id).toBe('wdg-loc-hp')
    expect(widgetLocation[1].id).toBe('wdg-loc-pp')
    expect(widgetLocation[2].id).toBe('wdg-loc-pl')
    expect(widgetLocation[3].id).toBe('wdg-loc-lrm')
    expect(widgetLocation[4].id).toBe('wdg-loc-pd')
    expect(widgetLocation[5].id).toBe('wdg-loc-hd')
    expect(widgetLocation[6].id).toBe('wdg-loc-ft')
    expect(widgetLocation[7].id).toBe('wdg-loc-pn')
    expect(widgetLocation[8].id).toBe('wdg-loc-cst')
    unsubscribe()
  })
})