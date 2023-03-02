/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { sendingNotification } from '../NOTIFICATION'

export function saveUseEventsByOrderStarusForChannel(event: { payload: any }) {
  try {
    console.log('Demo: SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL', event.payload)

    const savedUseEstimatedDeliveryDateForChannelToApi = api.putUseEventsByOrderStarusForChannel(
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
