import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

const credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
}

export function getCredentialsProvided() {
  console.log('Demo: GET_CREDENTIALS_PROVIDED. Answer:', credentials)

  dispatchAction({
    action: EVENTS.SET_CREDENTIALS_PROVIDED,
    payload: credentials,
  })
}
