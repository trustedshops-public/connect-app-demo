import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getMappedChannels() {
  console.log('Demo: GET_MAPPED_CHANNELS')

  dispatchAction({
    action: EVENTS.SET_MAPPED_CHANNELS,
    payload: [],
  })
}
