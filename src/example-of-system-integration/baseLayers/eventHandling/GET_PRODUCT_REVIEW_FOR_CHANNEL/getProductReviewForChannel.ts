import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getProductReviewForChannel(event: {
  payload: {
    id: string
    eTrustedChannelRef: string
    salesChannelRef: string
  }
}) {
  const productReviewByChannel = api.getProductReviewForChannel(event.payload)

  BaseLayerLogger('Demo: SET_PRODUCT_REVIEW_FOR_CHANNEL. Answer:', productReviewByChannel)

  dispatchAction({
    action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
    payload: productReviewByChannel,
  })
}
