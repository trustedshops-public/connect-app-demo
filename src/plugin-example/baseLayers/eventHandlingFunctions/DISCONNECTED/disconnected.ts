import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function disconnected() {
  console.log('Demo: DISCONNECTED')
  dispatchAction({ action: EVENTS.SET_DISCONNECTED, payload: null })
}
