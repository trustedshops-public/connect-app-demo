import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getSalesChannelsProvided() {
  const salesChannelsFromApi = api.getSalesChannels() || []
  BaseLayerLogger('Demo: GET_SALES_CHANNELS_PROVIDED. Answer:', salesChannelsFromApi)

  dispatchAction({
    action: EVENTS.SET_SALES_CHANNELS_PROVIDED,
    payload: salesChannelsFromApi,
  })
}
