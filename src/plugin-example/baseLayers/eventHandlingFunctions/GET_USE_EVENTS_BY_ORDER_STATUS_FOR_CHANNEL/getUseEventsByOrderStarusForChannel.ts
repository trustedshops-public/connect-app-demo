import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getUseEventsByOrderStarusForChannel(event: { payload: { id: string } }) {
  console.log('Demo: GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL')
  setTimeout(() => {
    dispatchAction({
      action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
      payload: {
        id: event.payload.id,
        active: true,
      },
    })
  }, 400)
}
