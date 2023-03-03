import { Fragment, h } from 'preact'
import { FC, useEffect } from 'preact/compat'
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'
import { baseLayerData, BaseLayerDataType } from '@/database-container/data-config'
import { DBLogger } from '@/utils/DBLogger'

const adapter = new LocalStorage<BaseLayerDataType>('database')
export const db = new LowSync<BaseLayerDataType>(adapter)

export const DatabaseContainer: FC = ({ children }) => {
  useEffect(() => {
    db.read()
    db.data ||= { ...baseLayerData }
    DBLogger(db.data)
    db.write()
  }, [])

  return <Fragment>{children}</Fragment>
}
