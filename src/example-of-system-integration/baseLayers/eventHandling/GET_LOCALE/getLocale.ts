import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getLocale() {
  const locale = api.getLocale()
  dispatchAction({
    action: EVENTS.SET_LOCALE,
    payload: locale,
  })
}
