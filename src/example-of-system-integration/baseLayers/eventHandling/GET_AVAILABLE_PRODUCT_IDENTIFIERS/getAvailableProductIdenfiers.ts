import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getAvailableProductIdenfiers() {
  console.log('Demo: GET_AVAILABLE_PRODUCT_IDENTIFIERS')
  const availableProductIdenfiers = api.getAvailableProductIdenfiers()

  dispatchAction({
    action: EVENTS.SET_AVAILABLE_PRODUCT_IDENTIFIERS,
    payload: availableProductIdenfiers,
  })
}
