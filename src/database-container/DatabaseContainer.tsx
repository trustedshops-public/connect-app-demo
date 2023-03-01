import { Fragment, h } from 'preact'
import { FC, useEffect } from 'preact/compat'
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'
import { baseLayerData, BaseLayerDataType } from '@/database-container/data-config'

const adapter = new LocalStorage<BaseLayerDataType>('database')
export const db = new LowSync<BaseLayerDataType>(adapter)

export const DatabaseContainer: FC = ({ children }) => {
  useEffect(() => {
    db.read()
    console.log('file: DatabaseContainer.tsx:19  useEffect  db:', db)
    db.data ||= { ...baseLayerData }
    db.write()
  }, [])

  return <Fragment>{children}</Fragment>
}
