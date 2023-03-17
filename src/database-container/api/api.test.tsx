import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, renderHook } from '@testing-library/preact'
import { useMockDataBaseForBaseLayer } from '../useMockDataBaseForBaseLayer'
import { baseLayerData } from '../data-config'
import { api } from './api'

afterEach(() => {
  cleanup()
})

describe('API', () => {
  test('api getSystemInfo from the mock database should match the value from the date-config', () => {
    renderHook(() => useMockDataBaseForBaseLayer())

    const systemInfo = api.getSystemInfo()

    expect(systemInfo).toBe(baseLayerData.infoSystem)
  })
})
