import { DEV, TEST } from '../baseLayer'

export const getProductIdentifiers = (defaultEnv?: string): { id: string; name: string }[] => {
  switch (process.env.productIdentifiers || defaultEnv) {
    case DEV: // value for 'development'
      return [
        { id: 'data-sku', name: 'SKU' },
        { id: 'data-gtin', name: 'GTIN' },
        { id: 'data-mpn', name: 'MPN' },
      ]
    case TEST: // value for 'test'
      return [
        { id: 'data-sku', name: 'SKU' },
        { id: 'data-gtin', name: 'GTIN' },
        { id: 'data-mpn', name: 'MPN' },
      ]
    case 'case3':
      return [
        { id: 'data-sku', name: 'SKU' },
        { id: 'data-gtin', name: 'GTIN' },
      ]
    case 'case4':
      return [{ id: 'data-gtin', name: 'GTIN' }]

    default:
      return []
  }
}
