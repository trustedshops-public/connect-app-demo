/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function saveUseEventsByOrderStatusForChannel(event: { payload: any }) {
  try {
    BaseLayerLogger('Demo: SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL. Payload:', event.payload)

    const savedUseEstimatedDeliveryDateForChannelToApi = api.putUseEventsByOrderStatusForChannel(
      event.payload
    )

    dispatchAction({
      action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
      payload: savedUseEstimatedDeliveryDateForChannelToApi,
    })
    sendingNotification(
      EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL SAVED',
      'success',
      'save'
    )
  } catch (error) {
    sendingNotification(
      EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
      'error',
      'save'
    )
  }
}
