import { beforeEach, describe, expect, test } from 'vitest'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { saveMappedChannels } from '@/example-of-system-integration/baseLayers/eventHandling'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'
import { IMappedChannel } from '../../types'
import { getMappedChannelsData } from '../../testData/getMappedChannelsData'

beforeEach(() => {
  renderHook(useMockDataBaseForBaseLayer)
})
describe('Save mapped channels', () => {
  test('SET_MAPPED_CHANNELS payload should match with testMappedChannels', () => {
    let returnedMappedChannels = [] as IMappedChannel[]

    const testMappedChannels = getMappedChannelsData(TEST)
    const unsubscribe = registerEvents({
      [EVENTS.SET_MAPPED_CHANNELS]: function (event: { payload: IMappedChannel[] }) {
        returnedMappedChannels.push(...event.payload)
      },
    })

    saveMappedChannels({ payload: testMappedChannels })

    expect(returnedMappedChannels[0].eTrustedChannelRef).toBe(
      testMappedChannels[0].eTrustedChannelRef
    )
    expect(db.data?.mappedChannels.length).toBe(1)
    expect(db.data?.mappedChannels[0].eTrustedChannelRef).toBe(
      testMappedChannels[0].eTrustedChannelRef
    )
    unsubscribe()
  })
})
