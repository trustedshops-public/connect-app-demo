import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getUsedOrderStatuses(event: { payload: Estimatepayload }) {
  const usedOrderStaruses = api.getUsedOrderStatuses(event.payload)

  BaseLayerLogger('Demo: GET_USED_ORDER_STATUSES. Answer:', usedOrderStaruses)

  dispatchAction({
    action: EVENTS.SET_USED_ORDER_STATUSES,
    payload: usedOrderStaruses,
  })
}
