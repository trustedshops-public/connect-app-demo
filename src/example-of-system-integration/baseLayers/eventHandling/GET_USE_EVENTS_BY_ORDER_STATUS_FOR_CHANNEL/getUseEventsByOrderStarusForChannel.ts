import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getUseEventsByOrderStarusForChannel(event: { payload: Estimatepayload }) {
  const eventsByOrderStarusForChannelFromApi = api.getUseEventsByOrderStarusForChannel(
    event.payload
  )

  BaseLayerLogger(
    'Demo: GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL. Answer:',
    eventsByOrderStarusForChannelFromApi
  )

  dispatchAction({
    action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
    payload: eventsByOrderStarusForChannelFromApi,
  })
}
