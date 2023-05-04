import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'
import { IMappedChannel } from '../../types'
import { sendingNotification } from '../NOTIFICATION'

export function saveMappedChannels(event: { payload: IMappedChannel[] }) {
  try {
    BaseLayerLogger('Demo: SAVE_MAPPED_CHANNEL. Payload:', event.payload)

    const savedMappedChannelsToAPI = api.postMappedChannels(event.payload)

    dispatchAction({
      action: EVENTS.SET_MAPPED_CHANNELS,
      payload: savedMappedChannelsToAPI,
    })
    sendingNotification(EVENTS.SET_MAPPED_CHANNELS, 'MAPPED CHANNELS SAVED', 'success', 'save')
  } catch (error) {
    sendingNotification(EVENTS.SET_MAPPED_CHANNELS, 'MAPPED CHANNELS NOT SAVED', 'error', 'save')
  }
}
