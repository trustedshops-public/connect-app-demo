import { describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { InfoSystemType } from '@/example-of-system-integration/baseLayers/types'
import { getInformationOfSystem } from '@/example-of-system-integration/baseLayers/eventHandling'

describe('Get information of system', ()=>{
  test('Information of system exist', ()=>{
    renderHook(useMockDataBaseForBaseLayer)
    let infoSystem : InfoSystemType = {} as InfoSystemType
    const unsubscribe = registerEvents({
      [EVENTS.SET_INFORMATION_OF_SYSTEM]: function(event: { payload: InfoSystemType }) {
        infoSystem = event.payload
      }
    })
    getInformationOfSystem()
    expect(infoSystem).toHaveProperty('nameOfSystem')
    expect(infoSystem).toHaveProperty('versionNumberOfSystem')
    expect(infoSystem).toHaveProperty('versionNumberOfPlugin')
    expect(infoSystem).toHaveProperty('allowsEstimatedDeliveryDate')
    expect(infoSystem).toHaveProperty('allowsEventsByOrderStatus')
    expect(infoSystem).toHaveProperty('allowsSendReviewInvitesForPreviousOrders')
    expect(infoSystem).toHaveProperty('allowsSendReviewInvitesForProduct')
    expect(infoSystem).toHaveProperty('allowsEditIntegrationCode')
    expect(infoSystem).toHaveProperty('allowsSupportWidgets')
    unsubscribe()
  })
})