import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { IWidgets } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function saveWidgetChanges(event: { payload: IWidgets }) {
  try {
    const savedWidgetsToApi = api.postWidgets(event.payload)
    BaseLayerLogger('Demo: SAVE_WIDGET_CHANGES. Payload:', savedWidgetsToApi)

    dispatchAction({
      action: EVENTS.SET_WIDGET_PROVIDED,
      payload: savedWidgetsToApi,
    })
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET SAVED', 'success', 'save')
  } catch (error) {
    sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET NOT SAVED', 'error', 'save')
  }
}
