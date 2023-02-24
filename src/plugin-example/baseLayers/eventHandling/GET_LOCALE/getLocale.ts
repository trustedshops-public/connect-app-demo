import { dispatchAction, EVENTS } from '@/plugin-example/eventsLib'

export const locales = (lg: string): string => {
  switch (lg) {
    case 'en-GB':
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

export function getLocale() {
  console.log('Demo: GET_LOCALE:', 'en-GB')
  dispatchAction({
    action: EVENTS.SET_LOCALE,
    payload: locales('en-GB'),
  })
}
