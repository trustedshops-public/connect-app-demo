import { api } from '@/database-container/api/api'
import { EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { sendingNotification } from '../NOTIFICATION'

export function saveCredentials(event: { payload: { clientId: string; clientSecret: string } }) {
  BaseLayerLogger('Demo: SAVE_CREDENTIALS. Payload:', event.payload)

  try {
    if (!event.payload.clientId.length || !event.payload.clientSecret.length) {
      throw new Error('CREDENTIALS NOT SAVED')
    }
    api.postCredentials(event.payload)
    sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS SAVED', 'success', 'save')
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    sendingNotification(EVENTS.SAVE_CREDENTIALS, message, 'error', 'save')
  }
}
