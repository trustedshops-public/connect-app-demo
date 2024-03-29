import {
  IMappedChannel,
  ITrustbadge,
  IWidgets,
} from '@/example-of-system-integration/baseLayers/types'
import {
  baseLayerData,
  BaseLayerDataType,
  Estimatepayload,
  InfoSystemType,
  LocalesTypes,
  OrderStatusType,
} from '../data-config'
import { db } from '../useMockDataBaseForBaseLayer'

//Helper function to check the validity of the product review channel
function checkIMappedChannelIsValid(productReviewChannel: IMappedChannel): boolean {
  return Boolean(
    productReviewChannel &&
      productReviewChannel.eTrustedChannelRef &&
      productReviewChannel.salesChannelRef,
  )
  //TODO extend the check of the attributes of the productReviewChannel with patterns
}

export const api = {
  getSystemInfo: () => {
    return db.data?.infoSystem
  },
  putSystemInfo: (infoSystem: InfoSystemType) => {
    db.data = { ...(db.data as BaseLayerDataType), infoSystem }
    db.write()
  },
  getLocale: () => {
    return db.data?.locale
  },
  putLocale: (lng: LocalesTypes) => {
    db.data = { ...(db.data as BaseLayerDataType), locale: lng }
    db.write()
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
    return channels
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
          item.salesChannelRef === payload.salesChannelRef,
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
        item.salesChannelRef === widgets.salesChannelRef,
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
          item.salesChannelRef === payload.salesChannelRef,
      ) || null
    )
  },

  activateProductReviewForChannel: (
    productReviewChannel: IMappedChannel,
  ): IMappedChannel | null => {
    if (!checkIMappedChannelIsValid(productReviewChannel)) return null
    const found = db.data?.productReview.find(
      item =>
        item.eTrustedChannelRef === productReviewChannel.eTrustedChannelRef &&
        item.salesChannelRef === productReviewChannel.salesChannelRef,
    )
    if (found) return productReviewChannel
    db.data?.productReview.push(productReviewChannel)
    db.write()

    return productReviewChannel
  },
  deactivateProductReviewForChannel: (payload: {
    salesChannelRef: string
    eTrustedChannelRef: string
  }) => {
    db.data?.productReview.forEach((item, index) => {
      if (
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef
      )
        db.data?.productReview.splice(index, 1)
    })
    db.write()
  },

  getUseEstimatedDeliveryDateForChannel: (payload: Estimatepayload) => {
    const findedItemById = db.data?.useEstimatedDeliveryDateForChannel.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef,
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
        item.salesChannelRef === payload.salesChannelRef,
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
    const foundItem = db.data?.useEstimatedDeliveryDateForChannel.filter(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef,
    )

    if (foundItem) return foundItem[0]

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
        item.salesChannelRef === payload.salesChannelRef,
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

  //v2
  getOrderStatuses: (): Array<{ ID: string; name: string; event_type?: string }> => {
    return db.data?.availableOrderStatuses || []
  },

  getUsedOrderStatuses: (payload: Estimatepayload): OrderStatusType => {
    const foundItem = db.data?.usedOrderStatuses?.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef,
    )
    console.log('🚀 ~ file: api.ts:284 ~ foundItem:', foundItem)

    const defaultData = {
      ...payload,
      activeStatus: {
        product: { name: 'checkout', ID: 'checkout', event_type: 'checkout' },
        service: { name: 'checkout', ID: 'checkout', event_type: 'checkout' },
      },
    }
    if (!foundItem) return defaultData
    // db.data?.usedOrderStatuses.push()
    // db.write()
    return foundItem
  },
  putUsedOrderStatus: (payload: OrderStatusType) => {
    const findedItemById = db.data?.usedOrderStatuses.find(
      item =>
        item.eTrustedChannelRef === payload.eTrustedChannelRef &&
        item.salesChannelRef === payload.salesChannelRef,
    )

    const updateduseEventsByOrderStatusForChannelArray = findedItemById
      ? db.data?.usedOrderStatuses.map(item => {
          if (
            item.eTrustedChannelRef === payload.eTrustedChannelRef &&
            item.salesChannelRef === payload.salesChannelRef
          ) {
            return payload
          }
          return item
        })
      : [...(db.data?.usedOrderStatuses as []), payload]
    db.data = {
      ...(db.data as BaseLayerDataType),
      usedOrderStatuses: updateduseEventsByOrderStatusForChannelArray as [],
    }
    db.write()

    return payload
  },
}
