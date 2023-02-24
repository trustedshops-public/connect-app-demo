import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { IWidgets } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function saveWidgetChanges(event: { payload: IWidgets }) {
  try {
    console.log('Demo: SAVE_WIDGET_CHANGES', event.payload)
    dispatchAction({
      action: EVENTS.SET_WIDGET_PROVIDED,
      payload: event.payload,
    })
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET SAVED', 'success', 'save')
  } catch (error) {
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET NOT SAVED', 'error', 'save')
  }
}
