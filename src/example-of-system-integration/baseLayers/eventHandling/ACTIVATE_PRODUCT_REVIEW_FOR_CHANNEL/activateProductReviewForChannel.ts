import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { IMappedChannel } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function activateProductReviewForChannel(event: { payload: IMappedChannel | null }) {
  try {
    BaseLayerLogger('Demo: ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL. Payload:', event.payload)

    const activatedProductReviewForChannel =
      event.payload && api.activateProductReviewForChannel(event.payload)

    dispatchAction({
      action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
      payload: activatedProductReviewForChannel,
    })
    sendingNotification(
      EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
      'PRODUCT REVIEW FOR CHANNEL ACTIVATED',
      'success',
      'save'
    )
    return Boolean(activatedProductReviewForChannel) // return only for tests
  } catch (error) {
    setTimeout(() => {
      sendingNotification(
        EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
        'PRODUCT REVIEW FOR CHANNEL NOT ACTIVATED',
        'error',
        'save'
      )
    }, 400)
    return false // return only for tests
  }
}
