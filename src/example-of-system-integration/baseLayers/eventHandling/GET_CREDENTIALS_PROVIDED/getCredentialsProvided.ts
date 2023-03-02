import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getCredentialsProvided() {
  const credentialsFromApi = api.getCredentials()

  dispatchAction({
    action: EVENTS.SET_CREDENTIALS_PROVIDED,
    payload: credentialsFromApi,
  })
}
