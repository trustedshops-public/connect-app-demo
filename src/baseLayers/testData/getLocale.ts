import { DEV, TEST } from '../baseLayerDev'

export const getLocale = (defaultEnv?: string): string => {
  switch (process.env.locale || defaultEnv) {
    case DEV: // value for 'development'
      return 'en-GB'
    case TEST: //value for 'test'
      return 'en-GB'
    case 'de-DE':
      return 'de-DE'
    case 'es-ES':
      return 'es-ES'
    case 'fr-FR':
      return 'fr-FR'
    case 'it-IT':
      return 'it-IT'
    case 'nl-NL':
      return 'nl-NL'
    case 'pl-PL':
      return 'pl-PL'
    case 'pt-PT':
      return 'pt-PT'

    default:
      return 'en-GB'
  }
}
