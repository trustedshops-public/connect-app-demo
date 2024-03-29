import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export function getInformationOfSystem() {
  const infoSystem = api.getSystemInfo() //fetch api

  BaseLayerLogger('Demo: GET_INFORMATION_OF_SYSTEM. Answer:', infoSystem)

  dispatchAction({
    action: EVENTS.SET_INFORMATION_OF_SYSTEM,
    payload: infoSystem,
  })
}
