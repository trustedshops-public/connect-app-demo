import { describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { getSalesChannelsProvided } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { getSalesChannels } from '@/example-of-system-integration/baseLayers/testData/getSalesChannels'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
type SalesChannelType = {
  id: string
  name: string
  url: string
  locale: string
}
describe('Get sales channel', () => {
  test('Get sales channel with database is initialized', () => {
    renderHook(useMockDataBaseForBaseLayer)
    getSalesChannels(TEST).forEach(item=>db.data?.salesChannels.push(item))
    let salesChannels : Array<SalesChannelType> = {} as Array<SalesChannelType>
    const unsubscribe = registerEvents({
      [EVENTS.SET_SALES_CHANNELS_PROVIDED]: function (event: {payload: Array<SalesChannelType>}) {
        salesChannels = event.payload
      },
    })
    getSalesChannelsProvided()
    expect(salesChannels[0]).toHaveProperty('id')
    expect(salesChannels[0]).toHaveProperty('name')
    expect(salesChannels[0]).toHaveProperty('url')
    expect(salesChannels[0]).toHaveProperty('locale')
    unsubscribe()
  })
  test('Get sales channel with database not initialized', () => {
    db.data = {}
    let salesChannels : Array<SalesChannelType> = {} as Array<SalesChannelType>
    const unsubscribe = registerEvents({
      [EVENTS.SET_SALES_CHANNELS_PROVIDED]: function (event: {payload: Array<SalesChannelType>}) {
        salesChannels = event.payload
      },
    })
    getSalesChannelsProvided()
    expect(salesChannels.length).toBe(0)
    unsubscribe()
  })
})