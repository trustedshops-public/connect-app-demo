import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { IMappedChannel } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function deactivateProductReviewForChannel(event: { payload: IMappedChannel }) {
  try {
    BaseLayerLogger('Demo: DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL. Payload:', event.payload)

    api.deactivateProductReviewForChannel(event.payload)
    dispatchAction({
      action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
      payload: null,
    })
    sendingNotification(
      EVENTS.DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
      'PRODUCT REVIEW FOR CHANNEL DEACTIVATED',
      'success',
      'save'
    )
  } catch (error) {
    sendingNotification(
      EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
      'PRODUCT REVIEW FOR CHANNEL NOT DEACTIVATED',
      'error',
      'save'
    )
  }
}
