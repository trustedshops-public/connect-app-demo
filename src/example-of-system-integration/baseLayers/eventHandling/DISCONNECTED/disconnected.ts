import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function disconnected() {
  console.log('Demo: DISCONNECTED')
  api.disconnect()
  dispatchAction({ action: EVENTS.SET_DISCONNECTED, payload: null })
}
