/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// import { dispatchAction, EVENTS, registerEvents } from '@/eventsLib'
import { getInformationOfSystem } from './testData/getInformationOfSystem'
import { getLocale } from './testData/getLocale'
import { getMappedChannels } from './testData/getMappedChannels'
import { getProductIdentifiers } from './testData/getProductIdentifiers'
import { getSalesChannels } from './testData/getSalesChannels'
import { getTrustbadge } from './testData/getTrustbadgeMock'
import { getValueReviewChannel } from './testData/getValueReviewChannel'
import { getWidgetLocation } from './testData/getWidgetLocation'
import { getWidgets } from './testData/getWidgets'
import { IMappedChannel, IWidgets } from './types'

const EVENTS = window.eventsLib.EVENTS
const dispatchAction = window.eventsLib.dispatchAction
const registerEvents = window.eventsLib.registerEvents

export const DEV = 'development'
export const TEST = 'test'

const credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_CLIENT_SECRET || '',
}

const sendingNotification = (
  event: string,
  message: string,
  status: 'error' | 'success',
  type: string
): void => {
  console.log('EVENTS.NOTIFICATION')
  dispatchAction({
    action: EVENTS.NOTIFICATION,
    payload: {
      event,
      message,
      status,
      type,
    },
  })
}
export const baseLayerDev = (): any => {
  const DEFAULT_ENV = process.env.VITE_NODE_ENV === TEST ? TEST : DEV
  console.log('Base Layer Dev started')

  return registerEvents({
    [EVENTS.GET_INFORMATION_OF_SYSTEM]: () => {
      console.log('GET_INFORMATION_OF_SYSTEM')
      dispatchAction({
        action: EVENTS.SET_INFORMATION_OF_SYSTEM,
        payload: getInformationOfSystem(DEFAULT_ENV),
      })
    },
    [EVENTS.GET_LOCALE]: () => {
      console.log('GET_LOCALE')
      dispatchAction({
        action: EVENTS.SET_LOCALE,
        payload: getLocale(DEFAULT_ENV),
      })
    },

    [EVENTS.SAVE_CREDENTIALS]: (event: { payload: { clientId: string; clientSecret: string } }) => {
      try {
        console.log('SAVE_CREDENTIALS_BaseLayer')
        sessionStorage.setItem('credentials', JSON.stringify(event.payload))
        setTimeout(() => {
          sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS SAVED', 'success', 'save')
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(EVENTS.SAVE_CREDENTIALS, 'CREDENTIALS NOT SAVED', 'error', 'save')
        }, 400)
      }
    },
    [EVENTS.GET_CREDENTIALS_PROVIDED]: () => {
      console.log('GET_CREDENTIALS_PROVIDED')
      const savedCreds = sessionStorage.getItem('credentials')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_CREDENTIALS_PROVIDED,
          payload: savedCreds ? JSON.parse(savedCreds) : credentials,
        })
      }, 400)
    },

    [EVENTS.GET_SALES_CHANNELS_PROVIDED]: () => {
      console.log('GET_SALES_CHANNELS_PROVIDED')
      dispatchAction({
        action: EVENTS.SET_SALES_CHANNELS_PROVIDED,
        payload: getSalesChannels(DEFAULT_ENV),
      })
    },

    [EVENTS.GET_MAPPED_CHANNELS]: () => {
      console.log('GET_MAPPED_CHANNELS')

      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_MAPPED_CHANNELS,
          payload: getMappedChannels(DEFAULT_ENV),
        })
      }, 400)
    },

    [EVENTS.SAVE_MAPPED_CHANNEL]: (event: { payload: any }) => {
      try {
        console.log('SAVE_MAPPED_CHANNEL', event.payload)
        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_MAPPED_CHANNELS,
            payload: event.payload,
          })
          sendingNotification(
            EVENTS.SET_MAPPED_CHANNELS,
            'MAPPED CHANNELS SAVED',
            'success',
            'save'
          )
        }, 2000)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.SET_MAPPED_CHANNELS,
            'MAPPED CHANNELS NOT SAVED',
            'error',
            'save'
          )
        }, 400)
      }
    },

    [EVENTS.GET_TRUSTBADGE_CONFIGURATION_PROVIDED]: (event: { payload: { id: string } }) => {
      console.log('GET_TRUSTBADGE_CONFIGURATION_PROVIDED_1')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
          payload: getTrustbadge(event.payload.id, 'no_trustbadge_config'),
        })
      }, 400)
    },
    [EVENTS.SAVE_TRUSTBADGE_CONFIGURATION]: (event: { payload: any }) => {
      console.log('SAVE_TRUSTBADGE_CONFIGURATION_BaseLayer', event.payload)

      try {
        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_TRUSTBADGE_CONFIGURATION_PROVIDED,
            payload: event.payload,
          })
          sendingNotification(
            EVENTS.SAVE_TRUSTBADGE_CONFIGURATION,
            'TRUSTBADGE CONFIGURATION SAVED',
            'success',
            'save'
          )
        }, 3000)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.SAVE_TRUSTBADGE_CONFIGURATION,
            'TRUSTBADGE CONFIGURATION NOT SAVED',
            'error',
            'save'
          )
        }, 400)
      }
    },

    [EVENTS.GET_LOCATION_FOR_WIDGET]: () => {
      console.log('GET_LOCATION_FOR_WIDGET')
      dispatchAction({
        action: EVENTS.SET_LOCATION_FOR_WIDGET,
        payload: getWidgetLocation(DEFAULT_ENV),
      })
    },
    [EVENTS.GET_AVAILABLE_PRODUCT_IDENTIFIERS]: () => {
      console.log('GET_AVAILABLE_PRODUCT_IDENTIFIERS')
      dispatchAction({
        action: EVENTS.SET_AVAILABLE_PRODUCT_IDENTIFIERS,
        payload: getProductIdentifiers(DEFAULT_ENV),
      })
    },
    [EVENTS.GET_WIDGET_PROVIDED]: () => {
      console.log('GET_WIDGET_PROVIDED')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_WIDGET_PROVIDED,
          payload: getWidgets(DEFAULT_ENV),
        })
      }, 400)
    },
    [EVENTS.SAVE_WIDGET_CHANGES]: (event: { payload: IWidgets }) => {
      try {
        console.log('SAVE_WIDGET_CHANGES', event.payload)
        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_WIDGET_PROVIDED,
            payload: event.payload,
          })
          sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET SAVED', 'success', 'save')
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(EVENTS.SAVE_WIDGET_CHANGES, 'WIDGET NOT SAVED', 'error', 'save')
        }, 400)
      }
    },

    [EVENTS.GET_PRODUCT_REVIEW_FOR_CHANNEL]: () => {
      console.log('GET_PRODUCT_REVIEW_FOR_CHANNEL')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
          payload: getValueReviewChannel(DEFAULT_ENV),
        })
      }, 400)
    },

    [EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL]: (event: { payload: IMappedChannel }) => {
      try {
        console.log('ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL', event.payload)

        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
            payload: event.payload,
          })
          sendingNotification(
            EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
            'PRODUCT REVIEW FOR CHANNEL ACTIVATED',
            'success',
            'save'
          )
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
            'PRODUCT REVIEW FOR CHANNEL NOT ACTIVATED',
            'error',
            'save'
          )
        }, 400)
      }
    },
    [EVENTS.DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL]: (event: { payload: any }) => {
      try {
        console.log('DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL', event.payload)

        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_PRODUCT_REVIEW_FOR_CHANNEL,
            payload: null,
          })
          sendingNotification(
            EVENTS.DEACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
            'PRODUCT REVIEW FOR CHANNEL DEACTIVATED',
            'success',
            'save'
          )
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
            'PRODUCT REVIEW FOR CHANNEL NOT DEACTIVATED',
            'error',
            'save'
          )
        }, 400)
      }
    },

    [EVENTS.GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL]: (event: { payload: { id: any } }) => {
      console.log('GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
          payload: {
            id: event.payload.id,
            isUseDateToSendReviewInvites: false, //isUseDateToSendReviewInvites Deprecated. Use the value isEstimatedDeliveryDate instead of isUseDateToSendReviewInvites
            active: false, // isEventsByOrderStatusShipped: false,
            // isEstimatedDeliveryDate: true,
          },
        })
      }, 400)
    },
    [EVENTS.SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL]: (event: { payload: any }) => {
      try {
        console.log('SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL', event.payload)
        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
            payload: event.payload,
          })
          sendingNotification(
            EVENTS.SAVE_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
            'USE ESTIMATED DELIVERY DATE FOR CHANNEL SAVED',
            'success',
            'save'
          )
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
            'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
            'error',
            'save'
          )
        }, 400)
      }
    },

    [EVENTS.GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: (event: { payload: { id: any } }) => {
      console.log('GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL')
      setTimeout(() => {
        dispatchAction({
          action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
          payload: {
            id: event.payload.id,
            active: true,
          },
        })
      }, 400)
    },
    [EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL]: (event: { payload: any }) => {
      try {
        console.log('SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL', event.payload)
        setTimeout(() => {
          dispatchAction({
            action: EVENTS.SET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
            payload: event.payload,
          })
          sendingNotification(
            EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
            'USE ESTIMATED DELIVERY DATE FOR CHANNEL SAVED',
            'success',
            'save'
          )
        }, 400)
      } catch (error) {
        setTimeout(() => {
          sendingNotification(
            EVENTS.SAVE_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
            'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
            'error',
            'save'
          )
        }, 400)
      }
    },

    [EVENTS.EXPORT_PREVIOUS_ORDER]: (event: { payload: any }) => {
      console.log('EXPORT_PREVIOUS_ORDER', event.payload)
      setTimeout(() => {
        const link = document.createElement('a')
        link.download = `./Brand_Logo_Trusted_Shops.svg`
        const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
        sendingNotification(
          EVENTS.ACTIVATE_PRODUCT_REVIEW_FOR_CHANNEL,
          'USE ESTIMATED DELIVERY DATE FOR CHANNEL NOT SAVED',
          'error',
          'exportTimeout'
        )
        dispatchAction({
          action: EVENTS.SET_EXPORT_PREVIOUS_ORDER,
          payload: event.payload,
        })
      }, 400)
    },
    [EVENTS.DISCONNECTED]: () => {
      console.log('DISCONNECTED')
      sessionStorage.removeItem('credentials')
      setTimeout(() => {
        dispatchAction({ action: EVENTS.SET_DISCONNECTED, payload: null })
      }, 400)
    },
    [EVENTS.ERROR]: (error: any) => console.log('eventError', error),
  })
}
