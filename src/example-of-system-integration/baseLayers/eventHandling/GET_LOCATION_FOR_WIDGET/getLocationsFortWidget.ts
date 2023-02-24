import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getLocationsFortWidget() {
  console.log('Demo: GET_LOCATION_FOR_WIDGET')
  dispatchAction({
    action: EVENTS.SET_LOCATION_FOR_WIDGET,
    payload: [],
  })
}
