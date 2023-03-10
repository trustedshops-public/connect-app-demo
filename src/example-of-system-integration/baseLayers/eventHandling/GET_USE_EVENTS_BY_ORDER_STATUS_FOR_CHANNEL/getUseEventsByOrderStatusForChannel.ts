import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getUseEventsByOrderStatusForChannel(event: { payload: Estimatepayload }) {
  const eventsByOrderStatusForChannelFromApi = api.getUseEventsByOrderStatusForChannel(
    event.payload
  )

  BaseLayerLogger(
    'Demo: GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL. Answer:',
    eventsByOrderStatusForChannelFromApi
  )

  dispatchAction({
    action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
    payload: eventsByOrderStatusForChannelFromApi,
  })
}
