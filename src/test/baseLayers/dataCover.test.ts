import { afterEach, describe, expect, test } from 'vitest'
import { cleanup } from '@testing-library/preact'
import { getMappedChannelsData } from '@/example-of-system-integration/baseLayers/testData/getMappedChannelsData'
import { DEV, TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { getInformationOfSystem } from '@/example-of-system-integration/baseLayers/testData/getInformationOfSystem'
import { getProductIdentifiers } from '@/example-of-system-integration/baseLayers/testData/getProductIdentifiers'
import { getSalesChannels } from '@/example-of-system-integration/baseLayers/testData/getSalesChannels'
import { getTrustbadge } from '@/example-of-system-integration/baseLayers/testData/getTrustbadgeMock'
import { getWidgets } from '@/example-of-system-integration/baseLayers/testData/getWidgets'

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
  test("test validity of Product identifiers", ()=>{
    function helperExpectationProductIdentifiers(stage: string){
      const prodctIdentifiers = getProductIdentifiers(stage)
      prodctIdentifiers.forEach(item => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('name')
      })
    }
    helperExpectationProductIdentifiers(TEST)
    helperExpectationProductIdentifiers(DEV)
    helperExpectationProductIdentifiers('case3')
    helperExpectationProductIdentifiers('case4')
    const prodctIdentifiers = getProductIdentifiers('random')
    expect(prodctIdentifiers.length).toBe(0)
  })
  test("test validity of Product identifiers", ()=>{
    function helperExpectationSalesChannels(stage: string){
      const salesChannels = getSalesChannels(stage)
      salesChannels.forEach(item => {
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('url')
        expect(item).toHaveProperty('locale')
      })
    }
    helperExpectationSalesChannels(TEST)
    helperExpectationSalesChannels(DEV)
    helperExpectationSalesChannels('case3')
    helperExpectationSalesChannels('1_shop')
    helperExpectationSalesChannels('2_shops')
    helperExpectationSalesChannels('2_shops_matching_etrusted_channel_data')
    const salesChannelsNone = getSalesChannels('none')
    expect(salesChannelsNone.length).toBe(0)
    const salesChannelsrandom = getSalesChannels('random_value')
    expect(salesChannelsrandom.length).toBe(0)
  })
  test("test validity of Trustbadge mock data", ()=>{
    function helperExpectationTrustbadge(stage: string){
      const trustbadge = getTrustbadge('test_id', stage)
      expect(trustbadge).toHaveProperty('id')
      expect(trustbadge).toHaveProperty('eTrustedChannelRef')
      expect(trustbadge).toHaveProperty('salesChannelRef')
      expect(trustbadge).toHaveProperty('children')
      expect(trustbadge?.children.length).greaterThan(0)
      expect(trustbadge?.children[0]).toHaveProperty('attributes')
      expect(trustbadge?.children[0].attributes).toHaveProperty('async')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-y-offset')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-mobile-y-offset')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-disable-reviews')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-enable-custom')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-position')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-custom-width')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-desktop-enable-fadeout')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-disable-mobile')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-disable-trustbadge')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-mobile-custom-width')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-mobile-disable-reviews')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-mobile-enable-custom')
      expect(trustbadge?.children[0].attributes).toHaveProperty('data-mobile-position')
      expect(trustbadge?.children[0].attributes).toHaveProperty('charset')
      expect(trustbadge?.children[0].attributes).toHaveProperty('src')
    }
    helperExpectationTrustbadge(TEST)
    helperExpectationTrustbadge(DEV)
    const noTrustbadgeConfig = getTrustbadge('test_id', 'no_trustbadge_config')
    expect(noTrustbadgeConfig).toHaveProperty('id')
    expect(noTrustbadgeConfig).toHaveProperty('eTrustedChannelRef')
    expect(noTrustbadgeConfig).toHaveProperty('salesChannelRef')
    expect(noTrustbadgeConfig).toHaveProperty('children')
    expect(noTrustbadgeConfig?.children.length).toEqual(0)
    const randEnvTrustbadge = getTrustbadge('test_id', 'random')
    expect(randEnvTrustbadge).toBeNull()
  })
  test("test validity of Widget data", ()=>{
    function helperExpectationWidget(stage: string){
      const widget = getWidgets(stage)
      expect(widget).toHaveProperty('id')
      expect(widget).toHaveProperty('eTrustedChannelRef')
      expect(widget).toHaveProperty('salesChannelRef')
      expect(widget).toHaveProperty('children')
      expect(widget.children.length).greaterThan(0)
      expect(widget.children[0]).toHaveProperty('tag')
      expect(widget.children[0]).toHaveProperty('attributes')
      expect(widget.children[0]).toHaveProperty('children')
      expect(widget.children[0].children.length).greaterThan(0)
      const childrenOfChildren = widget.children[0].children[0]
      expect(childrenOfChildren).toHaveProperty('tag')
      expect(childrenOfChildren).toHaveProperty('applicationType')
      expect(childrenOfChildren).toHaveProperty('widgetId')
      expect(childrenOfChildren).toHaveProperty('widgetLocation')
      expect(childrenOfChildren).toHaveProperty('attributes')
      expect(childrenOfChildren.attributes).toHaveProperty('id')
      expect(childrenOfChildren.attributes).toHaveProperty('productIdentifier')
    }
    helperExpectationWidget(TEST)
    helperExpectationWidget(DEV)
    helperExpectationWidget('widgets_mapped')
    const noWidget = getWidgets('no_widgets')
    expect(noWidget).toHaveProperty('id')
    expect(noWidget).toHaveProperty('eTrustedChannelRef')
    expect(noWidget).toHaveProperty('salesChannelRef')
    expect(noWidget).toHaveProperty('children')
    expect(noWidget.children.length).greaterThan(0)
    expect(noWidget.children[0]).toHaveProperty('tag')
    expect(noWidget.children[0]).toHaveProperty('attributes')
    expect(noWidget.children[0]).toHaveProperty('children')
    expect(noWidget.children[0].children.length).toEqual(0)
    const randEnvWidget = getWidgets('randomvalue')
    expect(randEnvWidget).toHaveProperty('id')
    expect(randEnvWidget).toHaveProperty('eTrustedChannelRef')
    expect(randEnvWidget).toHaveProperty('salesChannelRef')
    expect(randEnvWidget).toHaveProperty('children')
    expect(randEnvWidget.children.length).toEqual(0)
  })
})