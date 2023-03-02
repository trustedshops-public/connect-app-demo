import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getProductReviewForChannel(event: {
  payload: {
    id: string
    eTrustedChannelRef: string
    salesChannelRef: string
  }
}) {
  console.log('Demo: GET_PRODUCT_REVIEW_FOR_CHANNEL', event.payload)

  const productReviewByChannel = api.getProductReviewForChannel(event.payload)
  dispatchAction({
    action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
    payload: productReviewByChannel,
  })
}
