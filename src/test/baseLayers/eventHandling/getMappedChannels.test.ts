import { describe, test } from 'vitest'
import { renderHook } from '@testing-library/preact'
import { db, useMockDataBaseForBaseLayer } from '@/database-container/useMockDataBaseForBaseLayer'
import { getMappedChannels } from '@/example-of-system-integration/baseLayers/eventHandling'
import { getMappedChannelsData } from '@/example-of-system-integration/baseLayers/testData/getMappedChannelsData'
import { EVENTS, registerEvents } from '@/example-of-system-integration/eventsLib'
import { IMappedChannel } from '@/example-of-system-integration/baseLayers/types'
import { expect } from 'vitest'
import { TEST } from '@/example-of-system-integration/baseLayers/baseLayer'

describe('Get Mapped channels',() =>{
  test('Get Mapped channels', ()=>{
    let mappedChannels : Array<IMappedChannel> = [] as Array<IMappedChannel>
    renderHook(useMockDataBaseForBaseLayer)
    db.data?.mappedChannels.push(... getMappedChannelsData(TEST))
    const unsubscribe = registerEvents({
      [EVENTS.SET_MAPPED_CHANNELS]: function(event: { payload: Array<IMappedChannel> }) {
        mappedChannels = event.payload
      }
    })
    getMappedChannels()
    expect(mappedChannels.length).toBeGreaterThan(0)
    expect(mappedChannels[0]).toHaveProperty('eTrustedChannelRef')
    expect(mappedChannels[0]).toHaveProperty('eTrustedLocale')
    expect(mappedChannels[0]).toHaveProperty('eTrustedUrl')
    expect(mappedChannels[0]).toHaveProperty('eTrustedAccountRef')
    expect(mappedChannels[0]).toHaveProperty('salesChannelRef')
    expect(mappedChannels[0]).toHaveProperty('salesChannelLocale')
    expect(mappedChannels[0]).toHaveProperty('salesChannelName')
    expect(mappedChannels[0]).toHaveProperty('salesChannelUrl')
    unsubscribe()
  })
})