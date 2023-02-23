import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getWidgetProvided() {
  console.log('Demo: GET_WIDGET_PROVIDED')
  dispatchAction({
    action: EVENTS.SET_WIDGET_PROVIDED,
    payload: null,
  })
}
