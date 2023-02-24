import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getProductReviewForChannel() {
  console.log('Demo: GET_PRODUCT_REVIEW_FOR_CHANNEL')
  dispatchAction({
    action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
    payload: null,
  })
}
