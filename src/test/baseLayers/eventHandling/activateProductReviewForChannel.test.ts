import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { cleanup, renderHook } from '@testing-library/preact'
import { getMappedChannelsData } from '@/example-of-system-integration/baseLayers/testData/getMappedChannelsData'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import {
  activateProductReviewForChannel,
  deactivateProductReviewForChannel
} from '@/example-of-system-integration/baseLayers/eventHandling'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'

const selectedImappedChannelData = getMappedChannelsData(TEST)[0]

beforeEach(()=>{
  renderHook(() => useMockDataBaseForBaseLayer())
})
afterEach(() => {
  const iMappedChannel: IMappedChannel = {
    eTrustedChannelRef: selectedImappedChannelData.eTrustedChannelRef,
    eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
    eTrustedName: selectedImappedChannelData.eTrustedName,
    eTrustedUrl: selectedImappedChannelData.eTrustedUrl,
    eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
    salesChannelRef: selectedImappedChannelData.salesChannelRef,
    salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
    salesChannelName: selectedImappedChannelData.salesChannelName,
    salesChannelUrl: selectedImappedChannelData.salesChannelUrl,
  }
  deactivateProductReviewForChannel({ payload: iMappedChannel })
  cleanup()
})

describe('Activate Product Review For Channel', () => {
  test('Activate with Correct payload', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: selectedImappedChannelData.eTrustedChannelRef,
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: selectedImappedChannelData.eTrustedUrl,
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef: selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: selectedImappedChannelData.salesChannelUrl,
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(true)
    expect(db.data?.productReview.length).toBe(1)
  })
  test('Activate with empty payload', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: '',
      eTrustedLocale: '',
      eTrustedName: '',
      eTrustedUrl: '',
      eTrustedAccountRef: '',
      salesChannelRef: '',
      salesChannelLocale: '',
      salesChannelName: '',
      salesChannelUrl: '',
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(false)
    expect(db.data?.productReview.length).toBe(0)
  })
  test('Activate with partial empty payload - Necessary data missing', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: '',
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: '',
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef: selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: selectedImappedChannelData.salesChannelUrl,
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(false)
    expect(db.data?.productReview.length).toBe(0)
  })
  test('Activate with partial empty payload - Necessary data existing', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: selectedImappedChannelData.eTrustedChannelRef,
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: '',
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef: selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: '',
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(true)
    expect(db.data?.productReview.length).toBe(1)
  })
  test('Activate with null payload', () => {
    const iMappedChannel = null
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(false)
    expect(db.data?.productReview.length).toBe(0)
  })
  //TODO test with patterns
})
