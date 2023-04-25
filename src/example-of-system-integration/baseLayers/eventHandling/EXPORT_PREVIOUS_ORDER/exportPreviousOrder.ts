/* eslint-disable @typescript-eslint/no-explicit-any */
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function exportPreviousOrder(event: { payload: any }) {
  BaseLayerLogger('Demo: EXPORT_PREVIOUS_ORDER. Payload:', event.payload)

  try {
    sendingNotification(
      EVENTS.SET_EXPORT_PREVIOUS_ORDER,
      'SET EXPORT PREVIOUS ORDER',
      'success',
      'export'
    )
    dispatchAction({
      action: EVENTS.SET_EXPORT_PREVIOUS_ORDER,
      payload: event.payload,
    })
  } catch (error) {
    sendingNotification(
      EVENTS.SET_EXPORT_PREVIOUS_ORDER,
      'SET EXPORT PREVIOUS ORDER - failed',
      'error',
      'export'
    )
  }

}
