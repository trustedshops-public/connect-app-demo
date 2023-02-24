import { baseLayerData } from '@/plugin-example/data-config'
import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getInformationOfSystem() {
  const infoSystem = baseLayerData.infoSystem

  console.log('Demo: GET_INFORMATION_OF_SYSTEM. Answer:', infoSystem)

  dispatchAction({
    action: EVENTS.SET_INFORMATION_OF_SYSTEM,
    payload: infoSystem,
  })
}
