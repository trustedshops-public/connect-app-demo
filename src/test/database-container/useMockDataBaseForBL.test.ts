import { baseLayerData } from '@/database-container/data-config'
import { useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { renderHook } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'

describe('hook useMockDataBaseForBaseLayer check', () => {
  it('should write to local storage initial data with key "database"', () => {
    renderHook(() => useMockDataBaseForBaseLayer())

    const dataFromLocalStorage = window.localStorage.getItem('database')

    expect(dataFromLocalStorage).toBe(JSON.stringify(baseLayerData))
  })
})
