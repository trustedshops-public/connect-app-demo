import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getUseEstimatedDeliveryDateForChannel(event: { payload: Estimatepayload }) {
  const estimatedDeliveryDateByChannelFromApi = api.getUseEstimatedDeliveryDateForChannel(
    event.payload
  )
  BaseLayerLogger(
    'Demo: GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL. Answer:',
    estimatedDeliveryDateByChannelFromApi
  )

  dispatchAction({
    action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
    payload: estimatedDeliveryDateByChannelFromApi,
  })
}
