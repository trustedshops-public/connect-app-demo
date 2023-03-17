import {
  IMappedChannel,
  ITrustbadge,
  IWidgets,
} from '@/example-of-system-integration/baseLayers/types'
import { baseLayerData, BaseLayerDataType, Estimatepayload } from '../data-config'
import { db } from '../useMockDataBaseForBaseLayer'

export const api = {
  getSystemInfo: () => {
    return db.data?.infoSystem
  },
  getLocale: () => {
    return db.data?.locale
  },
  getCredentials: () => {
    return db.data?.credentials
  },
  postCredentials: (credentials: { clientId: string; clientSecret: string }) => {
    db.data = { ...(db.data as BaseLayerDataType), credentials }
    db.write()
    return credentials
  },
  getSalesChannels: () => {
    return db.data?.salesChannels
  },

  getMappedChannels: (): IMappedChannel[] => {
    return db.data?.mappedChannels || []
  },
  postMappedChannels: (channels: IMappedChannel[]) => {
    db.read()
    db.data = { ...(db.data as BaseLayerDataType), mappedChannels: channels }
    db.write()
  },

  getTrustbadge: (id: string): Nullable<ITrustbadge> => {
    return db.data?.trustbadgeConfiguration.find(item => item.id === id) || null
  },
  postTrustbadge: (trustBadge: ITrustbadge): ITrustbadge => {
    db.read()
    const finded = db.data?.trustbadgeConfiguration.find(item => item.id === trustBadge.id)

    const updatedTBArray = finded
      ? db.data?.trustbadgeConfiguration.map(item => {
          if (item.id === trustBadge.id) {
            return trustBadge
          }
          return item
        })
      : [...(db.data?.trustbadgeConfiguration as ITrustbadge[]), trustBadge]

    db.data = {
      ...(db.data as BaseLayerDataType),
      trustbadgeConfiguration: updatedTBArray as ITrustbadge[],
    }
    db.write()

    return trustBadge
  },

  getWidgets: (payload: {
    id: string
    salesChannelRef: string
    eTrustedChannelRef: string
  }): Nullable<IWidgets> => {
    return (
      db.data?.widgets.find(
        item =>
          (item.id === payload.id || item.eTrustedChannelRef === payload.eTrustedChannelRef) &&
          item.salesChannelRef === payload.salesChannelRef
      ) || null
    )
  },

  getWidgetLocation: (): Array<{ id: string; name: string }> => {
    return db.data?.widgetLocation || []
  },
  getAvailableProductIdenfiers: (): Array<{ id: string; name: string }> => {
    return db.data?.productIdentifiers || []
  },

  postWidgets: (widgets: IWidgets): IWidgets => {
    const finded = db.data?.widgets.find(
      item =>
        (item.id === widgets.id || item.eTrustedChannelRef === widgets.eTrustedChannelRef) &&
        item.salesChannelRef === widgets.salesChannelRef
    )

    const updatedWidgetArray = finded
      ? db.data?.widgets.map(item => {
          if (
            (item.id === widgets.id || item.eTrustedChannelRef === widgets.eTrustedChannelRef) &&
            item.salesChannelRef === widgets.salesChannelRef
          ) {
            return widgets
          }
          return item
        })
      : [...(db.data?.widgets as ITrustbadge[]), widgets]

    db.data = {
      ...(db.data as BaseLayerDataType),
      widgets: updatedWidgetArray as IWidgets[],
    }
    db.write()

    return widgets
  },

  getProductReviewForChannel: (payload: {
    salesChannelRef: string
    eTrustedChannelRef: string
  }) => {
    return (
      db.data?.productReview.find(
        item =>
          item.eTrustedChannelRef === payload.eTrustedChannelRef &&
          item.salesChannelRef === payload.salesChannelRef
      ) || null
    )
  },

  activateProductReviewForChannel: (productReviewChannel: IMappedChannel): IMappedChannel => {
    const finded = db.data?.productReview.find(
      item =>
        item.eTrustedChannelRef === productReviewChannel.eTrustedChannelRef &&
        item.salesChannelRef === productReviewChannel.salesChannelRef
    )
    if (finded) return productReviewChannel
    db.data?.productReview.push(productReviewChannel)
    db.write()

    return productReviewChannel
  },
  deactivateProductReviewForChannel: (payload: {
    salesChannelRef: string
    eTrustedChannelRef: string
  }) => {
    const felteredProductReview = db.data?.productReview.filter(
      item =>
        item.eTrustedChannelRef !== payload.eTrustedChannelRef &&
        item.salesChannelRef !== payload.salesChannelRef
    )

    db.data = {
      ...(db.data as BaseLayerDataType),
      productReview: felteredProductReview as IMappedChannel[],
    }
    db.write()
  },

  getUseEstimatedDeliveryDateForChannel: (payload: Estimatepayload) => {
    const findedItemById = db.data?.useEstimatedDeliveryDateForChannel.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef
    )

    if (findedItemById) return findedItemById

    const defaultData = {
      ...payload,
      active: false,
    }
    db.data?.useEstimatedDeliveryDateForChannel.push(defaultData)
    db.write()
    return defaultData
  },
  putUseEstimatedDeliveryDateForChannel: (payload: Estimatepayload) => {
    const findedItemById = db.data?.useEstimatedDeliveryDateForChannel.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef
    )

    const updatedUseEstimatedDeliveryDateForChannelArray = findedItemById
      ? db.data?.useEstimatedDeliveryDateForChannel.map(item => {
          if (
            item.eTrustedChannelRef === payload.eTrustedChannelRef &&
            item.salesChannelRef === payload.salesChannelRef
          ) {
            return payload
          }
          return item
        })
      : [...(db.data?.useEstimatedDeliveryDateForChannel as []), payload]
    db.data = {
      ...(db.data as BaseLayerDataType),
      useEstimatedDeliveryDateForChannel: updatedUseEstimatedDeliveryDateForChannelArray as [],
    }
    db.write()

    return payload
  },

  getUseEventsByOrderStatusForChannel: (payload: Estimatepayload) => {
    const findedItemById = db.data?.useEventsByOrderStatusForChannel.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef
    )

    if (findedItemById) return findedItemById

    const defaultData = {
      ...payload,
      active: false,
    }
    db.data?.useEventsByOrderStatusForChannel.push(defaultData)
    db.write()
    return defaultData
  },

  putUseEventsByOrderStatusForChannel: (payload: Estimatepayload) => {
    const findedItemById = db.data?.useEventsByOrderStatusForChannel.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef
    )

    const updateduseEventsByOrderStatusForChannelArray = findedItemById
      ? db.data?.useEventsByOrderStatusForChannel.map(item => {
          if (
            item.eTrustedChannelRef === payload.eTrustedChannelRef &&
            item.salesChannelRef === payload.salesChannelRef
          ) {
            return payload
          }
          return item
        })
      : [...(db.data?.useEventsByOrderStatusForChannel as []), payload]
    db.data = {
      ...(db.data as BaseLayerDataType),
      useEventsByOrderStatusForChannel: updateduseEventsByOrderStatusForChannelArray as [],
    }
    db.write()

    return payload
  },

  disconnect: () => {
    db.data = { ...baseLayerData }
    db.write()
  },
}
