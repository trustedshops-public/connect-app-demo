import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getMappedChannels() {
  console.log('Demo: GET_MAPPED_CHANNELS')

  dispatchAction({
    action: EVENTS.SET_MAPPED_CHANNELS,
    payload: [],
  })
}
