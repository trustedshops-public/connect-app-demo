import { afterEach, describe, expect, test } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { getMappedChannels } from '@/example-of-system-integration/baseLayers/testData/getMappedChannels'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { activateProductReviewForChannel } from '@/example-of-system-integration/baseLayers/eventHandling'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'

const selectedImappedChannelData = getMappedChannels(TEST)[0]

afterEach(() => {
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
  })
  test('Activate with partial empty payload - Necessary data missing', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: '',
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: '',
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef:selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: selectedImappedChannelData.salesChannelUrl,
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(false)
  })
  test('Activate with partial empty payload - Necessary data existing', () => {
    const iMappedChannel: IMappedChannel = {
      eTrustedChannelRef: selectedImappedChannelData.eTrustedChannelRef,
      eTrustedLocale: selectedImappedChannelData.eTrustedLocale,
      eTrustedName: selectedImappedChannelData.eTrustedName,
      eTrustedUrl: '',
      eTrustedAccountRef: selectedImappedChannelData.eTrustedAccountRef,
      salesChannelRef:selectedImappedChannelData.salesChannelRef,
      salesChannelLocale: selectedImappedChannelData.salesChannelLocale,
      salesChannelName: selectedImappedChannelData.salesChannelName,
      salesChannelUrl: '',
    }
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(true)
  })
  test('Activate with null payload', () => {
    const iMappedChannel = null
    const result = activateProductReviewForChannel({ payload: iMappedChannel })
    expect(result).toBe(false)
  })
  //TODO test with patterns
})
