import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getTrustbadgeConfigurationProvided(event: { payload: { id: string } }) {
  const trustBadgeFromApi = api.getTrustbadge(event.payload.id)

  BaseLayerLogger('Demo: GET_TRUSTBADGE_CONFIGURATION_PROVIDED. Answer:', trustBadgeFromApi)

  dispatchAction({
    action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
    payload: trustBadgeFromApi,
  })
}
