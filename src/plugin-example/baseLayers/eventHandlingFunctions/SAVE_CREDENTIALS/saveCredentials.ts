import { EVENTS } from '@/plugin-example/eventsLib'
import { sendingNotification } from '../../baseLayer'

export function saveCredentials(event: { payload: { clientId: string; clientSecret: string } }) {
  console.log('Demo: SAVE_CREDENTIALS', event.payload)

  try {
    // save credentials to db

    setTimeout(() => {
      sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS SAVED', 'success', 'save')
    }, 400)
  } catch (error) {
    setTimeout(() => {
      sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS NOT SAVED', 'error', 'save')
    }, 400)
  }
}
