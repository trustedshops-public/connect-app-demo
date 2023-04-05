import { describe, expect, test } from 'vitest'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

describe('Base Layer Logger', ()=>{
  test('Logger is working properly', ()=>{
    let succeeded: boolean
    try {
      BaseLayerLogger('Test the logger', {id: 'test-500', title: "dummy title"})
      succeeded = true
    }
    catch (e){
      succeeded = false
    }
    expect(succeeded).toBeTruthy()
  })
})