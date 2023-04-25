import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getLocale() {
  const locale = api.getLocale()
  BaseLayerLogger('Demo: GET_LOCALE. Answer:', locale)

  dispatchAction({
    action: EVENTS.SET_LOCALE,
    payload: locale,
  })
}
