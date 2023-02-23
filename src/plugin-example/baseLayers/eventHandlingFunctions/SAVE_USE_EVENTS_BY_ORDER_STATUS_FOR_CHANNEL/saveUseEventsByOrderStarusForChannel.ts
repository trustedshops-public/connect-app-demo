/* eslint-disable @typescript-eslint/no-explicit-any */
import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { sendingNotification } from '../../baseLayer'

export function saveUseEventsByOrderStarusForChannel(event: { payload: any }) {
  try {
    console.log('Demo: SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL', event.payload)
    dispatchAction({
      action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
      payload: event.payload,
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
