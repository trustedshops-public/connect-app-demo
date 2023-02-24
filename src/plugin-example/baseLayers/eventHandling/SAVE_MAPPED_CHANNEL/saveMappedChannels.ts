import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { sendingNotification } from '../../baseLayer'
import { IMappedChannel } from '../../types'

export function saveMappedChannels(event: { payload: IMappedChannel[] }) {
  try {
    console.log('Demo: SAVE_MAPPED_CHANNEL', event.payload)
    dispatchAction({
      action: EVENTS.SET_MAPPED_CHANNELS,
      payload: event.payload,
    })
    sendingNotification(EVENTS.SET_MAPPED_CHANNELS, 'MAPPED CHANNELS SAVED', 'success', 'save')
  } catch (error) {
    sendingNotification(EVENTS.SET_MAPPED_CHANNELS, 'MAPPED CHANNELS NOT SAVED', 'error', 'save')
  }
}
