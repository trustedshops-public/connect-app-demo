/* eslint-disable @typescript-eslint/no-explicit-any */
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function exportPreviousOrder(event: { payload: any }) {
  BaseLayerLogger('Demo: EXPORT_PREVIOUS_ORDER. Payload:', event.payload)

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
