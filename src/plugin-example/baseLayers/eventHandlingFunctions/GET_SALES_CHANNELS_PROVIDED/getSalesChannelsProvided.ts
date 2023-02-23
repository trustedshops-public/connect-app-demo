import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'
import { getSalesChannels } from '../../testData/getSalesChannels'

export function getSalesChannelsProvided() {
  console.log('Demo: GET_SALES_CHANNELS_PROVIDED')

  dispatchAction({
    action: EVENTS.SET_SALES_CHANNELS_PROVIDED,
    payload: getSalesChannels('development'),
  })
}
