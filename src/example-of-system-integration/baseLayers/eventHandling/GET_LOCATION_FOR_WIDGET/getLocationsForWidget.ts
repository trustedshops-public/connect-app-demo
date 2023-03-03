import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { BaseLayerLogger } from '@/utils/BaseLayerLogger'

export const WIDGET_LOCATIONS = [
  // {
  //   id: 'wdg-loc-hp',
  //   name: 'Home Page',
  // },
  // {
  //   id: 'wdg-loc-pp',
  //   name: 'Product Page',
  // },
  // {
  //   id: 'wdg-loc-pl',
  //   name: 'Product Listings',
  // },
  // {
  //   id: 'wdg-loc-lrm',
  //   name: 'Left/Right margin',
  // },
  // {
  //   id: 'wdg-loc-pd',
  //   name: 'Product Description',
  // },
  // {
  //   id: 'wdg-loc-hd',
  //   name: 'Page Header',
  // },
  // {
  //   id: 'wdg-loc-ft',
  //   name: 'Page Footer',
  // },
  // {
  //   id: 'wdg-loc-pn',
  //   name: 'Product Name',
  // },
  // {
  //   id: 'wdg-loc-cst',
  //   name: 'Custom',
  // },
]

export function getLocationsForWidget() {
  BaseLayerLogger('Demo: GET_LOCATION_FOR_WIDGET. Answer:', WIDGET_LOCATIONS)

  dispatchAction({
    action: EVENTS.SET_LOCATION_FOR_WIDGET,
    payload: WIDGET_LOCATIONS,
  })
}
