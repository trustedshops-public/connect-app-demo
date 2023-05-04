import { describe, expect, test } from 'vitest'
import { getWidgetProvided } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { IWidgets } from '@/example-of-system-integration/baseLayers/types'
import { getWidgets } from '@/example-of-system-integration/baseLayers/testData/getWidgets'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'

describe('Get widget Provided', ()=>{
  test('Get widget with proper payload',()=>{
    renderHook(useMockDataBaseForBaseLayer)
    const widget: IWidgets = getWidgets(TEST)
    widget.id = 'id_505'
    widget.salesChannelRef = 'sales_channel_ref_123'
    widget.eTrustedChannelRef = 'etrusted_channel_ref_123'
    db.data?.widgets.push(widget)
    let widgetFound: IWidgets = {} as IWidgets
    const unsubscribe = registerEvents({
      [EVENTS.SET_WIDGET_PROVIDED]: function (event: {payload: IWidgets}) {
        widgetFound = event.payload
      },
    })
    getWidgetProvided({
      payload:{
        id:widget.id,
        salesChannelRef: widget.salesChannelRef,
        eTrustedChannelRef: widget.eTrustedChannelRef,
      }
    })
    expect(widgetFound.id).toBe(widget.id)
    expect(widgetFound.eTrustedChannelRef).toBe(widget.eTrustedChannelRef)
    expect(widgetFound.salesChannelRef).toBe(widget.salesChannelRef)
    expect(widget.children[0].attributes).toHaveProperty('src')
    expect(widget.children[0].children[0]).toHaveProperty('tag')
    expect(widget.children[0].children[0]).toHaveProperty('applicationType')
    expect(widget.children[0].children[0]).toHaveProperty('widgetId')
    expect(widget.children[0].children[0]).toHaveProperty('widgetLocation')
    expect(widget.children[0].children[0]).toHaveProperty('attributes')
    expect(widget.children[0].children[0].attributes).toHaveProperty('id')
    expect(widget.children[0].children[0].attributes).toHaveProperty('productIdentifier')
    unsubscribe()
  })
})