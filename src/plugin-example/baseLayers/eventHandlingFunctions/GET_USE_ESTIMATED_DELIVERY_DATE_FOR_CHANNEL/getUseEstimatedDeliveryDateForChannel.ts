import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getUseEstimatedDeliveryDateForChannel(event: { payload: { id: string } }) {
  console.log('Demo: GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL')
  dispatchAction({
    action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
    payload: {
      id: event.payload.id,
      active: false, // isEventsByOrderStatusShipped: false,
      isEstimatedDeliveryDate: false,
    },
  })
}
