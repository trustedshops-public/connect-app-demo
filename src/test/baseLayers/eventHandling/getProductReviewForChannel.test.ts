import { beforeEach, describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { getProductReviewForChannel } from '@/example-of-system-integration/baseLayers/eventHandling'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'
import { getMappedChannelsData } from '@/example-of-system-integration/baseLayers/testData/getMappedChannelsData'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'

let mappedChannels: Array<IMappedChannel> = [] as Array<IMappedChannel>;
beforeEach(()=>{
  renderHook(useMockDataBaseForBaseLayer)
  mappedChannels = getMappedChannelsData(TEST)
  db.data?.mappedChannels.push(... mappedChannels)
  db.data?.productReview.push(...mappedChannels)
})

describe('Get product review for Channel', () => {
  test('get Product Review for channel using a valid payload', () => {
    let mappedChannel: IMappedChannel = {} as IMappedChannel
    const unsubscribe = registerEvents({
      [EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL]: function (event: {
        payload: IMappedChannel
      }) {
        mappedChannel = event.payload
      },
    })
    getProductReviewForChannel({
      payload: {
        id: '200',
        salesChannelRef: mappedChannels[0].salesChannelRef,
        eTrustedChannelRef: mappedChannels[0].eTrustedChannelRef,
      }
    })

    expect(mappedChannel).toHaveProperty('eTrustedChannelRef')
    expect(mappedChannel).toHaveProperty('eTrustedLocale')
    expect(mappedChannel).toHaveProperty('eTrustedUrl')
    expect(mappedChannel).toHaveProperty('eTrustedAccountRef')
    expect(mappedChannel).toHaveProperty('salesChannelRef')
    expect(mappedChannel).toHaveProperty('salesChannelLocale')
    expect(mappedChannel).toHaveProperty('salesChannelName')
    expect(mappedChannel).toHaveProperty('salesChannelUrl')
    unsubscribe()
  })

  test('get Product Review for channel using an invalid payload', () => {
    let mappedChannel: IMappedChannel = {} as IMappedChannel
    db.data?.productReview.forEach((_item,index)=>db.data?.productReview.splice(index, 1))
    const unsubscribe = registerEvents({
      [EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL]: function (event: {
        payload: IMappedChannel
      }) {
        mappedChannel = event.payload
      },
    })
    getProductReviewForChannel({
      payload: {
        id: '200',
        salesChannelRef: '',
        eTrustedChannelRef: mappedChannels[0].eTrustedChannelRef,
      }
    })
    expect(mappedChannel).toBeNull()
    unsubscribe()
  })

})
