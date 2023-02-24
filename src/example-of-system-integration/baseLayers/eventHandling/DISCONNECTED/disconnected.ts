import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function disconnected() {
  console.log('Demo: DISCONNECTED')
  dispatchAction({ action: EVENTS.SET_DISCONNECTED, payload: null })
}
