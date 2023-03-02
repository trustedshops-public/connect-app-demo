import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getTrustbadgeConfigurationProvided(event: { payload: { id: string } }) {
  console.log(
    'Demo: GET_TRUSTBADGE_CONFIGURATION_PROVIDED by ID',
    event.payload,
    api.getTrustbadge(event.payload.id)
  )

  dispatchAction({
    action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
    payload: api.getTrustbadge(event.payload.id),
  })
}
