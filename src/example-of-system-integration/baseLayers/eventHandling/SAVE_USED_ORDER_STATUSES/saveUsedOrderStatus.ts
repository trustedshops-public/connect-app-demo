/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/database-container/api/api'
import { OrderStatusType } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function saveUsedOrderStatus(event: { payload: OrderStatusType }) {
  try {
    BaseLayerLogger('Demo: SAVE_USED_ORDER_STATUSES. Payload:', event.payload)

    const savedUsedOrderStatus = api.putUsedOrderStatus(event.payload)

    dispatchAction({
      action: EVENTS.SET_USED_ORDER_STATUSES,
      payload: savedUsedOrderStatus,
    })
    sendingNotification(
      EVENTS.SAVE_USED_ORDER_STATUSES,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL SAVED',
      'success',
      'save',
    )
  } catch (error) {
    sendingNotification(
      EVENTS.SAVE_USED_ORDER_STATUSES,
      'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
      'error',
      'save',
    )
  }
}
