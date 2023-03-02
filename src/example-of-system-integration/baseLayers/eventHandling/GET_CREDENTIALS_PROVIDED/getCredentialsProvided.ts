import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

const credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
}

export function getCredentialsProvided() {
  console.log('Demo: GET_CREDENTIALS_PROVIDED. Answer:', credentials)

  const credentialsFromApi = api.getCredentials()
  dispatchAction({
    action: EVENTS.SET_CREDENTIALS_PROVIDED,
    payload: credentialsFromApi,
  })
}
