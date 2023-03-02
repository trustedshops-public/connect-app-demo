import { api } from '@/database-container/api/api'
import { EVENTS } from '@/example-of-system-integration/eventsLib'
import { sendingNotification } from '../NOTIFICATION'

export function saveCredentials(event: { payload: { clientId: string; clientSecret: string } }) {
  console.log('Demo: SAVE_CREDENTIALS', event.payload)

  try {
    api.postCredentials(event.payload)
    setTimeout(() => {
      sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS SAVED', 'success', 'save')
    }, 400)
  } catch (error) {
    setTimeout(() => {
      sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS NOT SAVED', 'error', 'save')
    }, 400)
  }
}
