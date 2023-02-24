import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export function getInformationOfSystem() {
  const infoSystem = {
    nameOfSystem: '',
    versionNumberOfSystem: '',
    versionNumberOfPlugin: '',
    allowsEstimatedDeliveryDate: true,
    allowsEventsByOrderStatus: true,
    allowsSendReviewInvitesForPreviousOrders: true,
  }

  console.log('Demo: GET_INFORMATION_OF_SYSTEM. Answer:', infoSystem)

  dispatchAction({
    action: EVENTS.SET_INFORMATION_OF_SYSTEM,
    payload: infoSystem,
  })
}
