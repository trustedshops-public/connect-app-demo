import { DEV, TEST } from '../baseLayerDev'
export const getValueReviewChannel = (defaultEnv?: string): { [key: string]: string } | null => {
  switch (process.env.reviewChannel || defaultEnv) {
    case DEV: // value for dev
      return {
        eTrustedChannelRef: 'chl-b593d805-5aec-4a05-a10e-f924a10526de',
        eTrustedLocale: 'de_DE',
        eTrustedName: 'Trusted Shops DemoShop',
        eTrustedUrl: 'demoshop.trustedshops.com',
        eTrustedAccountRef: 'acc-beae12fa-f8c9-4e24-aba4-9d6dabc2ffba',
        salesChannelLocale: 'de_DE',
        salesChannelName: 'eTrusted Demo Shop',
        salesChannelRef: 'shop-7e52920a-2722-4881-9908-ecec98c716e4',
        salesChannelUrl: 'demoshop.trustedshops.com',
      }

    case TEST:
      return {}

    default:
      return null
  }
}
