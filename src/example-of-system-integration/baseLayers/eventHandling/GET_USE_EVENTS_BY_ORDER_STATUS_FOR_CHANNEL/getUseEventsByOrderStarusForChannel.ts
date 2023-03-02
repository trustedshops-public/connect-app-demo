import { api } from '@/database-container/api/api'
import { Estimatepayload } from '@/database-container/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getUseEventsByOrderStarusForChannel(event: { payload: Estimatepayload }) {
  console.log('Demo: GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL', event.payload)

  const eventsByOrderStarusForChannelFromApi = api.getUseEventsByOrderStarusForChannel(
    event.payload
  )
  dispatchAction({
    action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
    payload: eventsByOrderStarusForChannelFromApi,
  })
}
