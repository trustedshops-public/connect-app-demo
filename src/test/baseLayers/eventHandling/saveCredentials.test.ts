import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { saveCredentials } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { NotificationType } from '@/example-of-system-integration/baseLayers/types'

beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
})
describe('Save credentials', () => {
  test('notification should be success', () => {
    let notification = {} as NotificationType
    const credentials = { clientId: 'clientId', clientSecret: 'clientSecret' }

    const unsubscribe = registerEvents({
      [EVENTS.NOTIFICATION]: function (event: { payload: NotificationType }) {
        notification = event.payload
      },
    })

    saveCredentials({
      payload: credentials,
    })

    expect(notification.status).toBe('success')
    expect(notification.message).toBe('CREDENTIALS SAVED')
    unsubscribe()
  })
  test('notification should be failed', () => {
    let notification = {} as NotificationType
    const credentials = { clientId: '', clientSecret: '' }

    const unsubscribe = registerEvents({
      [EVENTS.NOTIFICATION]: function (event: { payload: NotificationType }) {
        notification = event.payload
      },
    })

    saveCredentials({
      payload: credentials,
    })

    expect(notification.status).toBe('error')
    expect(notification.message).toBe('CREDENTIALS NOT SAVED')
    unsubscribe()
  })
})
