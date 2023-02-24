import { baseLayerData } from '@/example-of-system-integration/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getLocale() {
  const locale = baseLayerData.locale
  dispatchAction({
    action: EVENTS.SET_LOCALE,
    payload: locale,
  })
}
