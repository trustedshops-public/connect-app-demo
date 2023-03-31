
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { describe, expect, test } from 'vitest'
import { NotificationType } from '../../types'
import { exportPreviousOrder } from './exportPreviousOrder'

type ExportPayload = { id: string; numberOfDays: number; salesChannelRef: string }

describe('Export Previous Order', () => {
  test('returned payload should match the one sent', () => {
    // returnedExportPayload is a variable to store the return value from the function.
    // After processing, it must match the payload being sent.
    let returnedExportPayload = {} as ExportPayload

    // the initial paylog to send to the function being checked
    const initialExportPayload: ExportPayload = {
      id: 'eTrustedChannelId',
      numberOfDays: 5,
      salesChannelRef: 'salesChannelRef',
    }

    // registerEvents is a function from the connector event library
    // that creates a subscription to keep track of the event being called.
    // Accepts an object with methods ({EventName: callback handler}).
    // And returns a function to unsubscribe.

    const unsubscribe = registerEvents({
      // register the SET_EXPORT_PREVIOUS_ORDER event. This is the event that dispatches the exportPreviousOrder function
      [EVENTS.SET_EXPORT_PREVIOUS_ORDER]: function (event: { payload: ExportPayload }) {
        returnedExportPayload = event.payload // write payload to returnedExportPayload
      },
    })

    // after registering the event, call the function under test
    exportPreviousOrder({
      payload: initialExportPayload,
    })

    // compare the initial value of the pailod with the accepted answer.
    // I chose the numberOfDays option. I think it can be improved somehow
    expect(initialExportPayload.numberOfDays).toBe(returnedExportPayload.numberOfDays)
    unsubscribe() //unsubscribing from registered events in the library
  })
  test('export - notification should be success', () => {
    const initialExportPayload: ExportPayload = {
      id: 'eTrustedChannelId',
      numberOfDays: 5,
      salesChannelRef: 'salesChannelRef',
    }
    let notification = {} as NotificationType

    //everything is the same as in the previous test,
    // only we check the sending of the natification event with a successful status
    const unsubscribe = registerEvents({
      [EVENTS.NOTIFICATION]: function (event: { payload: NotificationType }) {
        notification = event.payload
      },
    })

    exportPreviousOrder({
      payload: initialExportPayload,
    })

    expect(notification.status).toBe('success')
    unsubscribe()
  })
})
