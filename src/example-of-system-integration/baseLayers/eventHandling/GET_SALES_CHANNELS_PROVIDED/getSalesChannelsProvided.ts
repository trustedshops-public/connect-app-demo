import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getSalesChannelsProvided() {
  console.log('Demo: GET_SALES_CHANNELS_PROVIDED')

  dispatchAction({
    action: EVENTS.SET_SALES_CHANNELS_PROVIDED,
    payload: null,
  })
}
