export const baseLayerData: BaseLayerDataType = {
  infoSystem: {
    nameOfSystem: '',
    versionNumberOfSystem: '',
    versionNumberOfPlugin: '',
    allowsEstimatedDeliveryDate: false,
    allowsEventsByOrderStatus: false,
    allowsSendReviewInvitesForPreviousOrders: false,
  },
  locale: 'en-GB',
}

export type BaseLayerDataType = {
  infoSystem: {
    nameOfSystem: string
    versionNumberOfSystem: string
    versionNumberOfPlugin: string
    allowsEstimatedDeliveryDate: boolean
    allowsEventsByOrderStatus: boolean
    allowsSendReviewInvitesForPreviousOrders: boolean
  }
  locale: 'en-GB' | 'de-DE' | 'es-ES' | 'fr-FR' | 'fr-FR' | 'it-IT' | 'nl-NL' | 'pl-PL' | 'pt-PT'
}
