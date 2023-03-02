import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getLocationsForWidget() {
  console.log('Demo: GET_LOCATION_FOR_WIDGET')
  const widgetLocationFromApi = api.getWidgetLocation()

  dispatchAction({
    action: EVENTS.SET_LOCATION_FOR_WIDGET,
    payload: widgetLocationFromApi,
  })
}
