import { describe, test } from 'vitest'
import { exportPreviousOrder } from '@/example-of-system-integration/baseLayers/eventHandling'

describe('Export Previous Order', ()=>{
  test('Export Previous Order with proper payload', ()=>{
    exportPreviousOrder({payload: null})
  })
})