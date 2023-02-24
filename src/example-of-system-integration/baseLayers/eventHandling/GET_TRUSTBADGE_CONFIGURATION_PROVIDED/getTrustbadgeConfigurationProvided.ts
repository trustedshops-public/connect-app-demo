import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { getTrustbadge } from '../../testData/getTrustbadgeMock'

export function getTrustbadgeConfigurationProvided(event: { payload: { id: string } }) {
  console.log('Demo: GET_TRUSTBADGE_CONFIGURATION_PROVIDED by ID', event.payload)
  setTimeout(() => {
    dispatchAction({
      action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
      payload: getTrustbadge(event.payload.id, 'no_trustbadge_config'),
    })
  }, 400)
}
