import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getCredentialsProvided() {
  const credentialsFromApi = api.getCredentials()
  BaseLayerLogger('Demo: GET_CREDENTIALS_PROVIDED. Answer:', credentialsFromApi)

  dispatchAction({
    action: EVENTS.SET_CREDENTIALS_PROVIDED,
    payload: credentialsFromApi,
  })
}
