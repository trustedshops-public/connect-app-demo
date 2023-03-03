import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getAvailableProductIdenfiers() {
  const availableProductIdenfiers = api.getAvailableProductIdenfiers()

  BaseLayerLogger('Demo: GET_AVAILABLE_PRODUCT_IDENTIFIERS. Answer:', availableProductIdenfiers)

  dispatchAction({
    action: EVENTS.SET_AVAILABLE_PRODUCT_IDENTIFIERS,
    payload: availableProductIdenfiers,
  })
}
