import { DEV, TEST } from '../baseLayer'

export const getInformationOfSystem = (
  defaultEnv?: string
): { [key: string]: string | boolean } => {
  switch (process.env.infoSystem || defaultEnv) {
    case DEV: // value for 'development'
      return {
        nameOfSystem: 'shopware5',
        versionNumberOfSystem: 'mockBLDev-0.0.1',
        versionNumberOfPlugin: 'mockBLPlugin-0.0.1',
        allowsEstimatedDeliveryDate: true,
        allowsEventsByOrderStatus: true,
        allowsSendReviewInvitesForPreviousOrders: true,
      }
    case TEST: //value for 'test'
      return {
        nameOfSystem: 'shopify',
        versionNumberOfSystem: 'mockBLSystemTest-0.0.1',
        versionNumberOfPlugin: 'mockBLPlugin-0.0.1',
        allowsEstimatedDeliveryDate: true,
        allowsEventsByOrderStatus: true,
        allowsSendReviewInvitesForPreviousOrders: true,
      }
    case 'no_value':
      return {}

    default:
      return {}
  }
}
