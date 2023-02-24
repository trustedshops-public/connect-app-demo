import { baseLayerData } from '@/plugin-example/data-config'
import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getLocale() {
  const locale = baseLayerData.locale
  dispatchAction({
    action: EVENTS.SET_LOCALE,
    payload: locale,
  })
}
