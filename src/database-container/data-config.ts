import {
  IMappedChannel,
  ITrustbadge,
  IWidgets,
} from '@/example-of-system-integration/baseLayers/types'

export const baseLayerData: BaseLayerDataType = {
  locale: 'en-GB',
  infoSystem: {
    nameOfSystem: 'Demo',
    versionNumberOfSystem: '1.0.0',
    versionNumberOfPlugin: '1.0.0',
    allowsEstimatedDeliveryDate: true,
    allowsEventsByOrderStatus: true,
    allowsSendReviewInvitesForPreviousOrders: true,
  },
  credentials: {
    clientId: '',
    clientSecret: '',
  },
  salesChannels: [
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
  ],
  mappedChannels: [],
  trustbadgeConfiguration: [],
  widgets: [],
  widgetLocation: [],
  productIdentifiers: [
    { id: 'data-sku', name: 'SKU' },
    { id: 'data-gtin', name: 'GTIN' },
    { id: 'data-mpn', name: 'MPN' },
  ],
  productReview: [],
  useEstimatedDeliveryDateForChannel: [],
  useEventsByOrderStarusForChannel: [],
}

export type BaseLayerDataType = {
  infoSystem: {
    nameOfSystem: string
    versionNumberOfSystem: string
    versionNumberOfPlugin: string
    allowsEstimatedDeliveryDate: boolean
    allowsEventsByOrderStatus: boolean
    allowsSendReviewInvitesForPreviousOrders: boolean
  }
  locale: 'en-GB' | 'de-DE' | 'es-ES' | 'fr-FR' | 'fr-FR' | 'it-IT' | 'nl-NL' | 'pl-PL' | 'pt-PT'
  credentials: {
    clientId: string
    clientSecret: string
  }
  salesChannels: {
    id: string
    name: string
    url: string
    locale: string
  }[]
  mappedChannels: IMappedChannel[]
  trustbadgeConfiguration: Array<ITrustbadge>
  widgets: Array<IWidgets>
  widgetLocation: Array<{ id: string; name: string }>
  productIdentifiers: Array<{ id: string; name: string }>
  productReview: Array<IMappedChannel>
  useEstimatedDeliveryDateForChannel: Array<Estimatepayload>
  useEventsByOrderStarusForChannel: Array<Estimatepayload>
}

export type Estimatepayload = {
  id?: string
  active: boolean
  eTrustedChannelRef: string
  salesChannelRef: string
}
