import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getWidgetProvided(event: {
  payload: { id: string; salesChannelRef: string; eTrustedChannelRef: string }
}) {
  const widgetsFromApi = api.getWidgets(event.payload)
  BaseLayerLogger('Demo: GET_WIDGET_PROVIDED. Answer:', widgetsFromApi)

  dispatchAction({
    action: EVENTS.SET_WIDGET_PROVIDED,
    payload: widgetsFromApi,
  })
}
