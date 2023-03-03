import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export const sendingNotification = (
  event: string,
  message: string,
  status: 'error' | 'success',
  type: string
): void => {
  BaseLayerLogger('Demo: NOTIFICATION. payload:', {
    event,
    message,
    status,
    type,
  })

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
