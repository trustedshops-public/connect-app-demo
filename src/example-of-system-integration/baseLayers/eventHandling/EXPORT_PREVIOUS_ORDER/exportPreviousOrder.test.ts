
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { describe, expect, test } from 'vitest'
import { exportPreviousOrder } from './exportPreviousOrder'

type ExportPayload = { id: string; numberOfDays: number; salesChannelRef: string }
type NotificationType = {
  event: string
  message: string
  status: 'error' | 'success'
  type: string
}

describe('Export Previous Order', () => {
  test('returned payload should match the one sent', () => {
    let returnedExportPayload = {} as ExportPayload
    const initialExportPayload: ExportPayload = {
      id: 'eTrustedChannelId',
      numberOfDays: 5,
      salesChannelRef: 'salesChannelRef',
    }

    const unsubscribe = registerEvents({
      [EVENTS.SET_EXPORT_PREVIOUS_ORDER]: ({ payload }: { payload: ExportPayload }) => {
        returnedExportPayload = payload
      },
    })

    exportPreviousOrder({
      payload: initialExportPayload,
    })

    expect(initialExportPayload.numberOfDays).toBe(returnedExportPayload.numberOfDays)
    unsubscribe()
  })
  test('export - notification should be success', () => {
    const initialExportPayload: ExportPayload = {
      id: 'eTrustedChannelId',
      numberOfDays: 5,
      salesChannelRef: 'salesChannelRef',
    }
    let notification = {} as NotificationType

    const unsubscribe = registerEvents({
      [EVENTS.NOTIFICATION]: ({ payload }: { payload: NotificationType }) => {
        notification = payload
      },
    })

    exportPreviousOrder({
      payload: initialExportPayload,
    })

    expect(notification.status).toBe('success')
    unsubscribe()
  })
})
