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
    allowsEstimatedDeliveryDate: false,
    allowsEventsByOrderStatus: false,
    allowsSendReviewInvitesForPreviousOrders: false,
  },
  credentials: {
    clientId: '',
    clientSecret: '',
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
  widgetLocation: [],
  productIdentifiers: [],
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
  locale:
    | 'en-GB'
    | 'de-DE'
    | 'es-ES'
    | 'fr-FR'
    | 'fr-FR'
    | 'it-IT'
    | 'nl-NL'
    | 'pl-PL'
    | 'pt-PT'
    | ''
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
