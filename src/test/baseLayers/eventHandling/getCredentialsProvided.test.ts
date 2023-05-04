import { describe, expect, test } from 'vitest'
import { getCredentialsProvided } from '@/example-of-system-integration/baseLayers/eventHandling'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'

type Credentials = {
  clientId: string;
  clientSecret: string,
}
describe('Credentials provided', ()=>{
  test('Get credentials', ()=>{
    let credentialsFound = {} as Credentials
    renderHook(useMockDataBaseForBaseLayer)
    const credentials = db.data?.credentials
    const unsubscribe = registerEvents({
      [EVENTS.SET_CREDENTIALS_PROVIDED]: function (event: { payload: Credentials }) {
        credentialsFound = event.payload // write payload to returnedExportPayload
      },
    })
    getCredentialsProvided()
    unsubscribe()
    expect(credentials?.clientId).toBe(credentialsFound.clientId)
  })
})