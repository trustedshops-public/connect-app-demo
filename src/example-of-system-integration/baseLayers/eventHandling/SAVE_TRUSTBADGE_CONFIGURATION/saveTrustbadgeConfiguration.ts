import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { ITrustbadge } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function saveTrustbadgeConfiguration(event: { payload: ITrustbadge }) {
  console.log('Demo: SAVE_TRUSTBADGE_CONFIGURATION', event.payload)

  try {
    const savedToApiTB = api.postTrustbadge(event.payload)

    dispatchAction({
      action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
      payload: savedToApiTB,
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
