/* eslint-disable @typescript-eslint/no-explicit-any */
export const BaseLayerLogger = (logTitle: string, logData?: any): void => {
  console.groupCollapsed(`${logTitle} ▼`)
  Array.isArray(logData) && logData.length
    ? logData.map(item => {
        console.table(item)
      })
    : console.table(logData || [])
  console.groupEnd()
}
