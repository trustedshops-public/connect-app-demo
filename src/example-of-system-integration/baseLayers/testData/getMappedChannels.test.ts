import { afterEach, describe, expect, test } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { getMappedChannels } from '@/example-of-system-integration/baseLayers/testData/getMappedChannels'
import { DEV, TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { size } from 'lodash'

afterEach(()=>{
  cleanup()
})
describe("should test the call of correct data", ()=>{
  test("test validity of the Mapped channels", ()=>{
    let selectedImappedChannelData = getMappedChannels(TEST)[0]
    expect(selectedImappedChannelData).toHaveProperty("eTrustedChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedLocale")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedName")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedUrl")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedAccountRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelLocale")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelName")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelUrl")
    selectedImappedChannelData = getMappedChannels(DEV)[0]
    expect(selectedImappedChannelData).toHaveProperty("eTrustedChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedLocale")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedName")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedUrl")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedAccountRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelLocale")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelName")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelUrl")
    selectedImappedChannelData = getMappedChannels('none')[0]
    expect(size(selectedImappedChannelData)).toBe(0)
    selectedImappedChannelData = getMappedChannels('1_shop_mapped')[0]
    expect(selectedImappedChannelData).toHaveProperty("eTrustedChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedLocale")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedName")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedUrl")
    expect(selectedImappedChannelData).toHaveProperty("eTrustedAccountRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelRef")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelLocale")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelName")
    expect(selectedImappedChannelData).toHaveProperty("salesChannelUrl")
    selectedImappedChannelData = getMappedChannels('randomvalue')[0]
    expect(size(selectedImappedChannelData)).toBe(0)

  })
})