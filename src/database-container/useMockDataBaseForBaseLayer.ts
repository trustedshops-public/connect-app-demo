import { useEffect } from 'preact/hooks'
import { LowSync } from 'lowdb'
//@ts-ignore
import { LocalStorage } from 'lowdb/browser' //right path
import { baseLayerData, BaseLayerDataType } from '@/database-container/data-config'
import { DBLogger } from '@/utils/DBLogger'

const adapter = new LocalStorage<BaseLayerDataType>('database')
export const db = new LowSync<BaseLayerDataType>(adapter)

export const useMockDataBaseForBaseLayer = () => {
  useEffect(() => {
    db.read()
    db.data ||= { ...baseLayerData }
    DBLogger(db.data)
    db.write()
  }, [])
  return { db }
}
