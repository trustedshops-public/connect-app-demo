import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { sendingNotification } from '../../baseLayer'
import { ITrustbadge } from '../../types'

export function saveTrustbadgeConfiguration(event: { payload: ITrustbadge }) {
  console.log('Demo: SAVE_TRUSTBADGE_CONFIGURATION', event.payload)

  try {
    dispatchAction({
      action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
      payload: event.payload,
    })
    sendingNotification(
      EVENTS.SAVE_TRUSTBADGE_CONFIGURATION,
      'TRUSTBADGE CONFIGURATION SAVED',
      'success',
      'save'
    )
  } catch (error) {
    sendingNotification(
      EVENTS.SAVE_TRUSTBADGE_CONFIGURATION,
      'TRUSTBADGE CONFIGURATION NOT SAVED',
      'error',
      'save'
    )
  }
}
