import { afterEach, describe, expect, test } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { getMappedChannelsData } from '@/example-of-system-integration/baseLayers/testData/getMappedChannelsData'
import { DEV, TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { getInformationOfSystem } from '@/example-of-system-integration/baseLayers/testData/getInformationOfSystem'

afterEach(()=>{
  cleanup()
})
describe("should test the call of correct data", ()=>{
  test("test validity of the Mapped channels", ()=>{
    function helperExpectationIMappedChannelData(stage: string) {
      const selectedIMappedChannelData = getMappedChannelsData(stage)[0]
      expect(selectedIMappedChannelData).toHaveProperty('eTrustedChannelRef')
      expect(selectedIMappedChannelData).toHaveProperty('eTrustedLocale')
      expect(selectedIMappedChannelData).toHaveProperty('eTrustedName')
      expect(selectedIMappedChannelData).toHaveProperty('eTrustedUrl')
      expect(selectedIMappedChannelData).toHaveProperty('eTrustedAccountRef')
      expect(selectedIMappedChannelData).toHaveProperty('salesChannelRef')
      expect(selectedIMappedChannelData).toHaveProperty('salesChannelLocale')
      expect(selectedIMappedChannelData).toHaveProperty('salesChannelName')
      expect(selectedIMappedChannelData).toHaveProperty('salesChannelUrl')
    }
    helperExpectationIMappedChannelData(TEST)
    helperExpectationIMappedChannelData(DEV)
    helperExpectationIMappedChannelData('1_shop_mapped')
    let selectedIMappedChannelData = getMappedChannelsData('none')
    expect(selectedIMappedChannelData).toHaveLength(0)
    selectedIMappedChannelData = getMappedChannelsData('randomvalue')
    expect(selectedIMappedChannelData).toHaveLength(0)

  })
  test("test validity of Information of the system", ()=>{
    function helperExpectationInformationOfSystemData(stage: string) {
      const selectedInformationOfSystemData = getInformationOfSystem(stage)
      expect(selectedInformationOfSystemData).toHaveProperty('nameOfSystem')
      expect(selectedInformationOfSystemData).toHaveProperty('versionNumberOfSystem')
      expect(selectedInformationOfSystemData).toHaveProperty('versionNumberOfPlugin')
      expect(selectedInformationOfSystemData).toHaveProperty('allowsEstimatedDeliveryDate')
      expect(selectedInformationOfSystemData).toHaveProperty('allowsEventsByOrderStatus')
      expect(selectedInformationOfSystemData).toHaveProperty('allowsSendReviewInvitesForPreviousOrders')
    }
    helperExpectationInformationOfSystemData(TEST)
    helperExpectationInformationOfSystemData(DEV)
    const selectedInformationOfSystemData = getInformationOfSystem('randomvalue')
    expect(Object.keys(selectedInformationOfSystemData)).toHaveLength(0)
  })
})