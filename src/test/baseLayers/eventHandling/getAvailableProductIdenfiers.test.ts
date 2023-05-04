import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { getAvailableProductIdenfiers } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { getProductIdentifiers } from '@/example-of-system-integration/baseLayers/testData/getProductIdentifiers'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
type ProductIdentifier = {id: string; name: string}
beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
  db.data?.productIdentifiers.push(...getProductIdentifiers(TEST))
})
describe('Available product identifiers', ()=>{
  test('get product identifiers from event', ()=>{
    let returnedProductIdentifier = [] as Array<ProductIdentifier>
    const unsubscribe = registerEvents({
      // register the SET_AVAILABLE_PRODUCT_IDENTIFIERS event. This is the event that dispatches the exportPreviousOrder function
      [EVENTS.SET_AVAILABLE_PRODUCT_IDENTIFIERS]: function (event: { payload: Array<ProductIdentifier> }) {
        returnedProductIdentifier = event.payload // write payload to returnedExportPayload
      },
    })
    getAvailableProductIdenfiers()
    expect(returnedProductIdentifier.length).toBe(3)
    expect(returnedProductIdentifier[0]).toHaveProperty('id')
    expect(returnedProductIdentifier[0]).toHaveProperty('name')
    unsubscribe()
  })
})