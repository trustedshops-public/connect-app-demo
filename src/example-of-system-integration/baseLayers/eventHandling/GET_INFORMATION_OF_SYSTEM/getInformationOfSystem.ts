import { baseLayerData } from '@/example-of-system-integration/data-config'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

export function getInformationOfSystem() {
  const infoSystem = baseLayerData.infoSystem

  console.log('Demo: GET_INFORMATION_OF_SYSTEM. Answer:', infoSystem)

  dispatchAction({
    action: EVENTS.SET_INFORMATION_OF_SYSTEM,
    payload: infoSystem,
  })
}
