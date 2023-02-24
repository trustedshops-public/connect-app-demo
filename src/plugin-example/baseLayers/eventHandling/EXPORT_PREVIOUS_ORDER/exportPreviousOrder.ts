/* eslint-disable @typescript-eslint/no-explicit-any */
import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { sendingNotification } from '../NOTIFICATION'

export function exportPreviousOrder(event: { payload: any }) {
  console.log('Demo: EXPORT_PREVIOUS_ORDER', event.payload)
  sendingNotification(
    EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
    'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
    'error',
    'exportTimeout'
  )
  dispatchAction({
    action: EVENTS.SET_EXPORT_PREVIOUS_ORDER,
    payload: event.payload,
  })
}
