import {
  IMappedChannel,
  ITrustbadge,
  IWidgets,
} from '@/example-of-system-integration/baseLayers/types'
import { BaseLayerDataType } from '../data-config'
import { db } from '../DatabaseContainer'

export const api = {
  getSystemInfo: () => {
    return db.data?.infoSystem
  },
  getLocale: () => {
    return db.data?.locale
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

  postWidgets: (widgets: IWidgets): IWidgets => {
    db.read()
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
}
