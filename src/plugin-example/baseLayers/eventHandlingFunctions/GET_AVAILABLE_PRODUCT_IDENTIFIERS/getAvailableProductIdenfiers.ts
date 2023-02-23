import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getAvailableProductIdenfiers() {
  console.log('Demo: GET_AVAILABLE_PRODUCT_IDENTIFIERS')
  dispatchAction({
    action: EVENTS.SET_AVAILABLE_PRODUCT_IDENTIFIERS,
    payload: [],
  })
}
