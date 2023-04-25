import { BaseLayerDataType } from '@/database-container/data-config'

export const DBLogger = (dbData: BaseLayerDataType): void => {
  console.groupCollapsed('Local Database ▼')

  Object.entries(dbData).forEach(item => {
    const [key, value] = item

    console.groupCollapsed(`${key} ▼`)
    Array.isArray(value) && value.length
      ? value.map(item => {
          console.table(item)
        })
      : console.table(value || [])
    console.groupEnd()
  })

  console.groupCollapsed('All database')
  console.log(dbData)
  console.groupEnd()

  console.groupEnd()
}
