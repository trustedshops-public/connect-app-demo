import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, renderHook } from '@testing-library/preact'
import { api } from '@/database-container/api/api'
import { baseLayerData } from '@/database-container/data-config'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'

afterEach(() => {
  cleanup()
})

describe('API', () => {
  test('api getSystemInfo from the mock database should match the value from the date-config', () => {
    renderHook(() => useMockDataBaseForBaseLayer())

    const systemInfo = api.getSystemInfo()

    expect(systemInfo).toBe(baseLayerData.infoSystem)
  })

  test('api getLocal from the mock database should match the value from the date-config', () => {
    renderHook(() => useMockDataBaseForBaseLayer())

    const systemInfo = api.getLocale()

    expect(systemInfo).toBe(baseLayerData.locale)
  })
})
