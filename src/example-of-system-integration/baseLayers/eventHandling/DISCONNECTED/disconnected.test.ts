import { describe, test } from 'vitest'
import { activateProductReviewForChannel, disconnected } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'
import { getMappedChannels } from '@/example-of-system-integration/baseLayers/testData/getMappedChannels'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'

const selectedImappedChannelData = getMappedChannels(TEST)[0]

describe('Disconnect', ()=>{
  test('Disconnect', ()=>{
    renderHook(()=>{useMockDataBaseForBaseLayer()})
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: "TestingValue",
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: selectedImappedChannelData.eTrustedUrl,
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef: selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: selectedImappedChannelData.salesChannelUrl,
    }
    activateProductReviewForChannel({ payload: iMappedChannel })
    disconnected()
    //expect(db.data?.productReview.length).toBe(0)
  })
})