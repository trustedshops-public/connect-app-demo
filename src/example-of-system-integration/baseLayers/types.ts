export interface ITrustbadge {
  id: string
  eTrustedChannelRef: string
  salesChannelRef: string
  children: ITrustbadgeChildren[]
}
export interface ITrustbadgeChildren {
  tag?: string
  attributes: {
    [key: string]: { value?: string | number | boolean; attributeName?: string }
  }
  children?: ITrustbadgeChildren[]
}

export interface IWidgets {
  id: string
  salesChannelRef: string
  eTrustedChannelRef: string
  children: Array<{
    tag?: string
    attributes?: {
      [key: string]: { value?: string; attributeName?: string }
    }
    children: IWidgetsChildren[]
  }>
}
export interface IWidgetsChildren {
  tag?: string
  widgetId: string
  applicationType: string
  widgetLocation?: {
    id: string
    name: string
  }
  extensions?: {
    product_star: {
      tag: string
    }
  }
  attributes?: {
    [key: string]: { value?: string; attributeName?: string }
  }
}

export interface IWidgetLocation {
  id: string
  name: string
}

export type NotificationType =  {
  status: string,
  message: string
}

export interface IMappedChannel {
  eTrustedChannelRef: string
  eTrustedLocale: string
  eTrustedName: string
  eTrustedUrl: string
  eTrustedAccountRef: string
  salesChannelRef: string
  salesChannelLocale: string
  salesChannelName: string
  salesChannelUrl: string
}

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