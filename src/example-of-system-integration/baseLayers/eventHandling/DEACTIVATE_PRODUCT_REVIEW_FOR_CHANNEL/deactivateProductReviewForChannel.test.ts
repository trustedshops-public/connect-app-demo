import { beforeEach, describe, test } from 'vitest'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'
import {
  activateProductReviewForChannel,
  deactivateProductReviewForChannel
} from '@/example-of-system-integration/baseLayers/eventHandling'
import { afterEach, expect } from 'vitest'
import { cleanup, renderHook } from '@testing-library/preact'
import { getMappedChannels } from '@/example-of-system-integration/baseLayers/testData/getMappedChannels'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'

const selectedImappedChannelData = getMappedChannels(TEST)[0]


beforeEach(()=>{
  renderHook(useMockDataBaseForBaseLayer)
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
  activateProductReviewForChannel({payload: iMappedChannel})
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

describe('Deactivate product review for a channel', ()=>{
  test('Deactivate with Correct payload', () => {
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
    expect(db.data?.productReview.length).toBe(0)
  })
  test('Deactivate with empty payload', () => {
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
    deactivateProductReviewForChannel({ payload: iMappedChannel })
    expect(db.data?.productReview.length).toBe(1)
  })
  test('Deactivate with partial empty payload - Necessary data missing', () => {
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
    deactivateProductReviewForChannel({ payload: iMappedChannel })
    expect(db.data?.productReview.length).toBe(1)
  })
  test('Deactivate with partial empty payload - Necessary data existing', () => {
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
    deactivateProductReviewForChannel({ payload: iMappedChannel })
    expect(db.data?.productReview.length).toBe(0)
  })
  test('Deactivate with null payload', () => {
    const iMappedChannel = null as any
    deactivateProductReviewForChannel({ payload: iMappedChannel })
    expect(db.data?.productReview.length).toBe(1)
  })
})