import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { IWidgets } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function saveWidgetChanges(event: { payload: IWidgets }) {
  try {
    console.log('Demo: SAVE_WIDGET_CHANGES', event.payload)

    const savedWidgetsToApi = api.postWidgets(event.payload)

    dispatchAction({
      action: EVENTS.SET_WIDGET_PROVIDED,
      payload: savedWidgetsToApi,
    })
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET SAVED', 'success', 'save')
  } catch (error) {
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET NOT SAVED', 'error', 'save')
  }
}
