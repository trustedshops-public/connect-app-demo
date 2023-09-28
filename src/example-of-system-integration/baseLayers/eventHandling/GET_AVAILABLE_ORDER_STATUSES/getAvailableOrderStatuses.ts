import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getAvailableOrderStatuses() {
  const availableOrderStatuses = api.getOrderStatuses()

  BaseLayerLogger('Demo: GET_AVAILABLE_ORDER_STATUSES. Answer:', availableOrderStatuses)

  dispatchAction({
    action: EVENTS.SET_AVAILABLE_ORDER_STATUSES,
    payload: availableOrderStatuses,
  })
}
