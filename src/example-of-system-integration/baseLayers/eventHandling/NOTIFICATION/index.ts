import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export const sendingNotification = (
  event: string,
  message: string,
  status: 'error' | 'success',
  type: string
): void => {
  console.log('Demo: EVENTS.NOTIFICATION')
  dispatchAction({
    action: EVENTS.NOTIFICATION,
    payload: {
      event,
      message,
      status,
      type,
    },
  })
}
