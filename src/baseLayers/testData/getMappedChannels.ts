import { DEV, TEST } from '../baseLayerDev'

export const getMappedChannels = (defaultEnv?: string): { [key: string]: string }[] => {
  switch (process.env.mappedChannels || defaultEnv) {
    case DEV: // value for 'development'
      return [
        {
          eTrustedChannelRef: 'chl-b593d805-5aec-4a05-a10e-f924a10526de',
          eTrustedLocale: 'de_DE',
          eTrustedName: 'Trusted Shops DemoShop',
          eTrustedUrl: 'demoshop.trustedshops.com',
          eTrustedAccountRef: 'acc-beae12fa-f8c9-4e24-aba4-9d6dabc2ffba',
          salesChannelLocale: 'de_DE',
          salesChannelName: 'eTrusted Demo Shop',
          salesChannelRef: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          salesChannelUrl: 'demoshop.trustedshops.com',
        },
      ]
    case TEST: //value for 'test'
      return [
        {
          eTrustedChannelRef: 'chl-b2c3bf02-f7e3-4a48-92a9-80e6f8420cdc',
          eTrustedLocale: 'de_DE',
          eTrustedName: '03022022012556_german_shop.com',
          eTrustedUrl: '03022022012556_german_shop.com',
          eTrustedAccountRef: 'acc-a82010d5-5cb5-45e7-90dc-c281535bab57',
          salesChannelLocale: 'de_DE',
          salesChannelName: 'eTrusted TestMock Shop',
          salesChannelRef: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          salesChannelUrl: 'demoshop.trustedshops.com',
        },
      ]
    case 'none':
      return []
    case '1_shop_mapped':
      //Used by automated test - do not change unless intentionally changing the test. See /tests/ folder for details.
      return [
        {
          eTrustedChannelRef: 'chl-b2c3bf02-f7e3-4a48-92a9-80e6f8420cdc',
          eTrustedLocale: 'de_DE',
          eTrustedName: '03022022012556_german_shop.com',
          eTrustedUrl: '03022022012556_german_shop.com',
          eTrustedAccountRef: 'acc-a82010d5-5cb5-45e7-90dc-c281535bab57',
          salesChannelLocale: 'de_DE',
          salesChannelName: 'eTrusted TestMock Shop',
          salesChannelRef: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
          salesChannelUrl: 'demoshop.trustedshops.com',
        },
      ]

    default:
      return []
  }
}
