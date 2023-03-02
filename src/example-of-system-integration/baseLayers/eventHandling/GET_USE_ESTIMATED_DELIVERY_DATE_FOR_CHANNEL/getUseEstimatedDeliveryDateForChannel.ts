import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getUseEstimatedDeliveryDateForChannel(event: { payload: Estimatepayload }) {
  console.log('Demo: GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL', event.payload)

  const estimatedDeliveryDateByChannelFromApi = api.getUseEstimatedDeliveryDateForChannel(
    event.payload
  )
  dispatchAction({
    action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
    payload: estimatedDeliveryDateByChannelFromApi,
  })
}
