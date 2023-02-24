/* eslint-disable @typescript-eslint/no-explicit-any */
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { sendingNotification } from '../NOTIFICATION'

export function saveUseEstimatedDeliveryDateForChannel(event: { payload: any }) {
  try {
    console.log('Demo: SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL', event.payload)
    dispatchAction({
      action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
      payload: event.payload,
    })
    sendingNotification(
      EVENTS.SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL SAVED',
      'success',
      'save'
    )
  } catch (error) {
    sendingNotification(
      EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
      'error',
      'save'
    )
  }
}
