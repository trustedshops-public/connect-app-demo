import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getWidgetProvided(event: {
  payload: { id: string; salesChannelRef: string; eTrustedChannelRef: string }
}) {
  console.log('Demo: GET_WIDGET_PROVIDED', event.payload)
  dispatchAction({
    action: EVENTS.SET_WIDGET_PROVIDED,
    payload: api.getWidgets(event.payload),
  })
}
