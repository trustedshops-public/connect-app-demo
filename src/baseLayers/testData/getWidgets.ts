import { IWidgets } from '../types'
import { DEV, TEST } from '../baseLayerDev'

export const getWidgets = (defaultEnv?: string): IWidgets => {
  switch (process.env.widgets || defaultEnv) {
    case DEV: // value for development
      return {
        children: [
          {
            tag: 'script',
            attributes: {
              src: {
                value: 'https://integrations.etrusted.koeln/applications/widget.js/v2',
                attributeName: 'src',
              },
              async: {
                attributeName: 'async',
              },
              defer: {
                attributeName: 'defer',
              },
            },
            children: [
              {
                tag: 'etrusted-widget',
                applicationType: 'product_star',
                widgetId: 'wdg-deleted-in-api1',
                widgetLocation: {
                  id: '21d3d933eb93',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-deleted-in-api',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-sku',
                  },
                },
              },
              {
                tag: 'etrusted-widget',
                applicationType: 'product_review_list',
                widgetId: 'wdg-92de735d-6d02-4ccf-941c-9d72d3c0cc46',
                widgetLocation: {
                  id: '21d3d933eb93',
                  name: 'Footer',
                },
                extensions: {
                  product_star: {
                    tag: 'etrusted-product-review-list-widget-product-star-extension',
                  },
                },
                attributes: {
                  id: {
                    value: 'wdg-92de735d-6d02-4ccf-941c-9d72d3c0cc46',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-mpn',
                  },
                },
              },
              {
                tag: 'etrusted-widget',
                applicationType: 'product_star',
                widgetId: 'wdg-deleted-in-api-2',
                widgetLocation: {
                  id: '21d3d933eb93',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-deleted-in-api-2',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-sku',
                  },
                },
              },
              {
                tag: 'etrusted-widget',
                applicationType: 'trusted_stars_service',
                widgetId: 'wdg-52c26016-c3e7-42d5-972b-9851a28809ea',
                widgetLocation: { id: '21d3d933eb91', name: 'Home Page' },
                attributes: {
                  id: {
                    value: 'wdg-52c26016-c3e7-42d5-972b-9851a28809ea',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-gtin',
                  },
                },
              },
              {
                tag: 'etrusted-widget',
                applicationType: 'review_carousel_service',
                widgetId: 'wdg-b893f1f2-c178-4fd8-b067-a66613bc3329',
                widgetLocation: { id: '21d3d933eb91', name: 'Home Page' },
                attributes: {
                  id: {
                    value: 'wdg-b893f1f2-c178-4fd8-b067-a66613bc3329',
                    attributeName: 'data-etrusted-widget-id',
                  },
                },
              },
            ],
          },
        ],
      }
    case TEST: // value for 'test'
      return {
        children: [
          {
            tag: 'script',
            attributes: {
              src: {
                value: 'https://integrations.etrusted.site/applications/widget.js/v2',
                attributeName: 'src',
              },
              async: {
                attributeName: 'async',
              },
              defer: {
                attributeName: 'defer',
              },
            },
            children: [
              {
                tag: 'etrusted-widget',
                applicationType: 'product_star',
                widgetId: 'wdg-deleted-in-api2',
                widgetLocation: {
                  id: 'footer',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-deleted-in-api',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-sku',
                  },
                },
              },

              {
                tag: 'etrusted-widget',
                applicationType: 'review_carousel_service',
                widgetId: 'wdg-3a72c50d-dd76-48f8-8386-59897ce8273f',
                widgetLocation: {
                  id: 'footer',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-3a72c50d-dd76-48f8-8386-59897ce8273f',
                    attributeName: 'data-etrusted-widget-id',
                  },
                },
              },
            ],
          },
        ],
      }
    case 'widgets_mapped':
      //Used by automated test - do not change unless intentionally changing the test. See /tests/ folder for details.
      return {
        children: [
          {
            tag: 'script',
            attributes: {
              src: {
                value: 'https://integrations.etrusted.site/applications/widget.js/v2',
                attributeName: 'src',
              },
              async: {
                attributeName: 'async',
              },
              defer: {
                attributeName: 'defer',
              },
            },
            children: [
              {
                tag: 'etrusted-widget',
                applicationType: 'product_star',
                widgetId: 'wdg-deleted-in-api',
                widgetLocation: {
                  id: 'footer',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-deleted-in-api',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-sku',
                  },
                },
              },

              {
                tag: 'etrusted-widget',
                applicationType: 'product_star',
                widgetId: 'wdg-7432a4e5-cea3-415e-b2d2-fc0a28562751',
                widgetLocation: {
                  id: 'footer',
                  name: 'Footer',
                },
                attributes: {
                  id: {
                    value: 'wdg-7432a4e5-cea3-415e-b2d2-fc0a28562751',
                    attributeName: 'data-etrusted-widget-id',
                  },
                  productIdentifier: {
                    attributeName: 'data-mpn',
                  },
                },
              },
            ],
          },
        ],
      }
    case 'no_widgets':
      return {
        children: [
          {
            tag: 'script',
            attributes: {
              src: {
                value: 'https://integrations.etrusted.site/applications/widget.js/v2',
                attributeName: 'src',
              },
              async: {
                attributeName: 'async',
              },
              defer: {
                attributeName: 'defer',
              },
            },
            children: [],
          },
        ],
      }
    default:
      return { children: [] }
  }
}
