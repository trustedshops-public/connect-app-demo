import { DEV, TEST } from '../baseLayerDev'

export const getSalesChannels = (defaultEnv?: string): { [key: string]: string }[] => {
  switch (process.env.salesChannel || defaultEnv) {
    case DEV: // value for development
      return [
        {
          id: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          name: 'eTrusted TestMock Shop',
          url: 'demoshop.trustedshops.com',
          locale: 'de_DE',
        },
        {
          id: 'shop-1e570f63-10f8-4d5a-ae18-21d3d933eb93',
          name: 'Test shop',
          url: 'http://www.my.shopp/',
          locale: 'en_US',
        },
      ]
    case TEST: //value for 'test'
      return [
        {
          id: 'german-shop',
          name: '25022022012613_german_shop.com',
          url: '25022022012613_german_shop.com',
          locale: 'de_DE',
        },
        {
          id: 'austria-shop',
          name: '25022022012613_austria_shop.com',
          url: '25022022012613_austria_shop.com',
          locale: 'de_AT',
        },
      ]
    case 'case3':
      return [
        {
          id: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          name: 'eTrusted TestMock Shop',
          url: 'demoshop.trustedshops.com',
          locale: 'de_DE',
        },
      ]
    case '1_shop':
      //Used by automated test - do not change unless intentionally changing the test. See /tests/ folder for details.
      return [
        {
          id: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          name: 'eTrusted TestMock Shop',
          url: 'demoshop.trustedshops.com',
          locale: 'de_DE',
        },
      ]
    case '2_shops':
      //Used by automated test - do not change unless intentionally changing the test. See /tests/ folder for details.
      return [
        {
          id: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          name: 'eTrusted TestMock Shop',
          url: 'demoshop.trustedshops.com',
          locale: 'de_DE',
        },
        {
          id: 'shop-1e570f63-10f8-4d5a-ae18-21d3d933eb93',
          name: 'Test shop',
          url: 'http://www.my.shopp/',
          locale: 'en_US',
        },
      ]
    case '2_shops_matching_etrusted_channel_data':
      //Used by automated test - do not change unless intentionally changing the test. See /tests/ folder for details.
      return [
        {
          id: 'german-shop',
          name: '25022022012613_german_shop.com',
          url: '25022022012613_german_shop.com',
          locale: 'de_DE',
        },
        {
          id: 'austria-shop',
          name: '25022022012613_austria_shop.com',
          url: '25022022012613_austria_shop.com',
          locale: 'de_AT',
        },
      ]
    case 'none':
      return []

    default:
      return []
  }
}
