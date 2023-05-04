/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function saveUseEstimatedDeliveryDateForChannel(event: { payload: Estimatepayload }) {
  try {
    BaseLayerLogger('Demo: SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL. Payload:', event.payload)

    const savedUseEstimatedDeliveryDateForChannelToApi = api.putUseEstimatedDeliveryDateForChannel(
      event.payload
    )

    dispatchAction({
      action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
      payload: savedUseEstimatedDeliveryDateForChannelToApi,
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
