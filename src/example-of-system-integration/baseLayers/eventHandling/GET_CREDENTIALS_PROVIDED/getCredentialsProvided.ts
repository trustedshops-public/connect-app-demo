import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

const removeSpaces = (cred: string) => {
  return cred.replace(/\s+/g, '')
}

export function getCredentialsProvided() {
  const credentialsFromApi = api.getCredentials()
  const trimmedCredentials = {
    clientId: removeSpaces(credentialsFromApi?.clientId || ''),
    clientSecret: removeSpaces(credentialsFromApi?.clientSecret || ''),
  }
  BaseLayerLogger('Demo: GET_CREDENTIALS_PROVIDED. Answer:', trimmedCredentials)

  dispatchAction({
    action: EVENTS.SET_CREDENTIALS_PROVIDED,
    payload: trimmedCredentials,
  })
}
