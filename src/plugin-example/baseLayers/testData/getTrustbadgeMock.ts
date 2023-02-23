import { ITrustbadge } from '../types'
import { DEV, TEST } from '../baseLayerDev'

export const getTrustbadge = (id: string, defaultEnv?: string | number): ITrustbadge | null => {
  switch (process.env.trustbadge || defaultEnv) {
    case DEV:
      return {
        id,
        children: [
          {
            tag: 'script',
            attributes: {
              async: {
                attributeName: 'async',
              },
              'data-desktop-y-offset': {
                value: 10,
                attributeName: 'data-desktop-y-offset',
              },
              'data-mobile-y-offset': {
                value: 10,
                attributeName: 'data-mobile-y-offset',
              },
              'data-desktop-disable-reviews': {
                value: false,
                attributeName: 'data-desktop-disable-reviews',
              },
              'data-desktop-enable-custom': {
                value: false,
                attributeName: 'data-desktop-enable-custom',
              },
              'data-desktop-position': {
                value: 'right',
                attributeName: 'data-desktop-position',
              },
              'data-desktop-custom-width': {
                value: 156,
                attributeName: 'data-desktop-custom-width',
              },
              'data-desktop-enable-fadeout': {
                value: false,
                attributeName: 'data-desktop-enable-fadeout',
              },
              'data-disable-mobile': {
                value: false,
                attributeName: 'data-disable-mobile',
              },
              'data-disable-trustbadge': {
                value: false,
                attributeName: 'data-disable-trustbadge',
              },
              'data-mobile-custom-width': {
                value: 156,
                attributeName: 'data-mobile-custom-width',
              },
              'data-mobile-disable-reviews': {
                value: false,
                attributeName: 'data-mobile-disable-reviews',
              },
              'data-mobile-enable-custom': {
                value: false,
                attributeName: 'data-mobile-enable-custom',
              },
              'data-mobile-position': {
                value: 'right',
                attributeName: 'data-mobile-position',
              },
              charset: {
                value: 'UTF-8',
                attributeName: 'charset',
              },
              src: {
                value: `//widgets-qa.trustedshops.com/js/${id}.js`,
                attributeName: 'src',
              },
            },
          },
        ],
      }
    case TEST: //value for 'test'
      return {
        id,
        children: [
          {
            tag: 'script',
            attributes: {
              async: {
                attributeName: 'async',
              },
              'data-desktop-y-offset': {
                value: 15,
                attributeName: 'data-desktop-y-offset',
              },
              'data-mobile-y-offset': {
                value: 15,
                attributeName: 'data-mobile-y-offset',
              },
              'data-desktop-disable-reviews': {
                value: false,
                attributeName: 'data-desktop-disable-reviews',
              },
              'data-desktop-enable-custom': {
                value: false,
                attributeName: 'data-desktop-enable-custom',
              },
              'data-desktop-position': {
                value: 'right',
                attributeName: 'data-desktop-position',
              },
              'data-desktop-custom-width': {
                value: 156,
                attributeName: 'data-desktop-custom-width',
              },
              'data-desktop-enable-fadeout': {
                value: false,
                attributeName: 'data-desktop-enable-fadeout',
              },
              'data-disable-mobile': {
                value: false,
                attributeName: 'data-disable-mobile',
              },
              'data-disable-trustbadge': {
                value: false,
                attributeName: 'data-disable-trustbadge',
              },
              'data-mobile-custom-width': {
                value: 156,
                attributeName: 'data-mobile-custom-width',
              },
              'data-mobile-disable-reviews': {
                value: false,
                attributeName: 'data-mobile-disable-reviews',
              },
              'data-mobile-enable-custom': {
                value: false,
                attributeName: 'data-mobile-enable-custom',
              },
              'data-mobile-position': {
                value: 'right',
                attributeName: 'data-mobile-position',
              },
              charset: {
                value: 'UTF-8',
                attributeName: 'charset',
              },
              src: {
                value: `//widgets.trustedshops.com/js/${id}.js`,
                attributeName: 'src',
              },
            },
          },
        ],
      }
    case 'no_trustbadge_config':
      return { id, children: [] }
    default:
      return null
  }
}
