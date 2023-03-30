import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { saveWidgetChanges } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { getWidgets } from '../../testData/getWidgets'
import { IWidgets } from '../../types'

beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
})
describe('Save widget changes', () => {
  test('SET_WIDGET_PROVIDED payload should match with testWidgetPayload', () => {
    let returnedWidgets = {} as IWidgets

    const testWidgetPayload = {
      ...getWidgets(TEST),
      eTrustedChannelRef: 'eTrustedChannelRefTest',
      salesChannelRef: 'salesChannelRefTest',
    }

    const unsubscribe = registerEvents({
      [EVENTS.SET_WIDGET_PROVIDED]: function (event: { payload: IWidgets }) {
        returnedWidgets = event.payload
      },
    })

    saveWidgetChanges({ payload: testWidgetPayload })

    expect(returnedWidgets.eTrustedChannelRef).toBe(testWidgetPayload.eTrustedChannelRef)
    unsubscribe()
  })
  test('testWidgetPayload should be save to db', () => {
    let returnedWidgets = {} as IWidgets

    const testWidgetPayload = {
      ...getWidgets(TEST),
      eTrustedChannelRef: 'eTrustedChannelRefTest',
      salesChannelRef: 'salesChannelRefTest',
    }

    const unsubscribe = registerEvents({
      [EVENTS.SET_WIDGET_PROVIDED]: function (event: { payload: IWidgets }) {
        returnedWidgets = event.payload
      },
    })

    saveWidgetChanges({ payload: testWidgetPayload })
    expect(db.data?.widgets.length).toBe(1)
    expect(db.data?.widgets[0].eTrustedChannelRef).toBe(testWidgetPayload.eTrustedChannelRef)
    unsubscribe()
  })
})
