/* eslint-disable @typescript-eslint/no-explicit-any */
import { EVENTS, registerEvents } from '../eventsLib'
import {
  activateProductReviewForChannel,
  deactivateProductReviewForChannel,
  disconnected,
  exportPreviousOrder,
  getAvailableOrderStatuses,
  getAvailableProductIdenfiers,
  getCredentialsProvided,
  getInformationOfSystem,
  getLocale,
  getLocationsForWidget,
  getMappedChannels,
  getProductReviewForChannel,
  getSalesChannelsProvided,
  getTrustbadgeConfigurationProvided,
  getUseEstimatedDeliveryDateForChannel,
  getUseEventsByOrderStatusForChannel,
  getUsedOrderStatuses,
  getWidgetProvided,
  saveCredentials,
  saveMappedChannels,
  saveTrustbadgeConfiguration,
  saveUseEstimatedDeliveryDateForChannel,
  saveUseEventsByOrderStatusForChannel,
  saveUsedOrderStatus,
  saveWidgetChanges,
} from './eventHandling'

export const DEV = 'development'
export const TEST = 'test'

export const baseLayer = (): any => {
  console.log('Base Layer started')

  return registerEvents({
    [EVENTS.GET_INFORMATION_OF_SYSTEM]: getInformationOfSystem,
    [EVENTS.GET_LOCALE]: getLocale,

    [EVENTS.GET_CREDENTIALS_PROVIDED]: getCredentialsProvided,
    [EVENTS.SAVE_CREDENTIALS]: saveCredentials,

    [EVENTS.GET_SALES_CHANNELS_PROVIDED]: getSalesChannelsProvided,
    [EVENTS.GET_MAPPED_CHANNELS]: getMappedChannels,
    [EVENTS.SAVE_MAPPED_CHANNEL]: saveMappedChannels,

    [EVENTS.GET_TRUSTBADGE_CONFIGURATION_PROVIDED]: getTrustbadgeConfigurationProvided,
    [EVENTS.SAVE_TRUSTBADGE_CONFIGURATION]: saveTrustbadgeConfiguration,

    [EVENTS.GET_LOCATION_FOR_WIDGET]: getLocationsForWidget,
    [EVENTS.GET_AVAILABLE_PRODUCT_IDENTIFIERS]: getAvailableProductIdenfiers,
    [EVENTS.GET_WIDGET_PROVIDED]: getWidgetProvided,
    [EVENTS.SAVE_WIDGET_CHANGES]: saveWidgetChanges,

    [EVENTS.GET_PRODUCT_REVIEW_FOR_CHANNEL]: getProductReviewForChannel,

    [EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL]: activateProductReviewForChannel,
    [EVENTS.DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL]: deactivateProductReviewForChannel,

    [EVENTS.GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL]: getUseEstimatedDeliveryDateForChannel,
    [EVENTS.SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL]: saveUseEstimatedDeliveryDateForChannel,

    [EVENTS.GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: getUseEventsByOrderStatusForChannel,
    [EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: saveUseEventsByOrderStatusForChannel,

    [EVENTS.EXPORT_PREVIOUS_ORDER]: exportPreviousOrder,
    [EVENTS.DISCONNECTED]: disconnected,
    [EVENTS.ERROR]: (error: any) => console.log('eventError', error),

    //v2

    [EVENTS.GET_AVAILABLE_ORDER_STATUSES]: getAvailableOrderStatuses,
    [EVENTS.GET_USED_ORDER_STATUSES]: getUsedOrderStatuses,
    [EVENTS.SAVE_USED_ORDER_STATUSES]: saveUsedOrderStatus,
  })
}
