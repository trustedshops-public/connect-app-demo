import {
  IMappedChannel,
  ITrustbadge,
  IWidgets,
} from '@/example-of-system-integration/baseLayers/types'

export const baseLayerData: BaseLayerDataType = {
  locale: 'en-GB',
  infoSystem: {
    nameOfSystem: 'Demo-app',
    versionNumberOfSystem: '1.0.0',
    versionNumberOfPlugin: '1.0.0',
    allowsEstimatedDeliveryDate: true,
    allowsEventsByOrderStatus: true,
    allowsSendReviewInvitesForPreviousOrders: true,
    allowsSendReviewInvitesForProduct: true,
    allowsEditIntegrationCode: true,
    allowsSupportWidgets: true,
  },
  credentials: {
    clientId: 'beae12faf8c9__NewGen',
    clientSecret: 'e07080c4-1818-407b-a3ae-8c30af2b7e48',
  },
  salesChannels: [
    {
      id: 'shop-sales-channel-1',
      name: 'Sales Channel EN',
      url: 'www.example.com/en',
      locale: 'en_GB',
    },
    {
      id: 'shop-sales-channel-2',
      name: 'Sales Channel DE',
      url: 'www.example.com/de',
      locale: 'de_DE',
    },
  ],
  mappedChannels: [],
  trustbadgeConfiguration: [],
  widgets: [],
  widgetLocation: [
    {
      id: 'wdg-loc-hp',
      name: 'Home Page',
    },
    {
      id: 'wdg-loc-pp',
      name: 'Product Page',
    },
    {
      id: 'wdg-loc-pl',
      name: 'Product Listings',
    },
    {
      id: 'wdg-loc-lrm',
      name: 'Left/Right margin',
    },
    {
      id: 'wdg-loc-pd',
      name: 'Product Description',
    },
    {
      id: 'wdg-loc-hd',
      name: 'Page Header',
    },
    {
      id: 'wdg-loc-ft',
      name: 'Page Footer',
    },
    {
      id: 'wdg-loc-pn',
      name: 'Product Name',
    },
    {
      id: 'wdg-loc-cst',
      name: 'Custom',
    },
  ],
  productIdentifiers: [],
  productReview: [],
  useEstimatedDeliveryDateForChannel: [],
  useEventsByOrderStatusForChannel: [],
}

export type BaseLayerDataType = {
  infoSystem: InfoSystemType
  locale: LocalesTypes
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
  useEventsByOrderStatusForChannel: Array<Estimatepayload>
}

export type Estimatepayload = {
  id?: string
  active: boolean
  eTrustedChannelRef: string
  salesChannelRef: string
}

export type LocalesTypes =
  | 'en-GB'
  | 'de-DE'
  | 'es-ES'
  | 'fr-FR'
  | 'fr-FR'
  | 'it-IT'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-PT'

export type InfoSystemType = {
  nameOfSystem: string
  versionNumberOfSystem: string
  versionNumberOfPlugin: string
  allowsEstimatedDeliveryDate?: boolean
  allowsEventsByOrderStatus?: boolean
  allowsSendReviewInvitesForPreviousOrders?: boolean
  allowsSendReviewInvitesForProduct?: boolean
  allowsEditIntegrationCode?: boolean
  allowsSupportWidgets?: boolean
}
