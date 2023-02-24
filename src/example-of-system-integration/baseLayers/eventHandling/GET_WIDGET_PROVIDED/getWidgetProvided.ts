import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getWidgetProvided() {
  console.log('Demo: GET_WIDGET_PROVIDED')
  dispatchAction({
    action: EVENTS.SET_WIDGET_PROVIDED,
    payload: null,
  })
}
