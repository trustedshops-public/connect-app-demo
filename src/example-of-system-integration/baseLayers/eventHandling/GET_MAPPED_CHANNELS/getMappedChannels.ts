import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getMappedChannels() {
  const mappedChannelsFromApi = api.getMappedChannels()

  BaseLayerLogger('Demo: GET_SALES_CHANNELS_PROVIDED. Answer:', mappedChannelsFromApi)

  dispatchAction({
    action: EVENTS.SET_MAPPED_CHANNELS,
    payload: mappedChannelsFromApi,
  })
}
