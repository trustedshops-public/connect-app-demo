import { DEV, TEST } from '../baseLayerDev'
export const getWidgetLocation = (defaultEnv?: string): { [key: string]: string }[] => {
  switch (process.env.widgetLocation || defaultEnv) {
    case DEV: // value for develoment
      return [
        { id: '21d3d933eb91', name: 'Home Page' },
        {
          id: '21d3d933eb93',
          name: 'Footer',
        },
      ]
    case TEST: //value for 'test'
      return [
        { id: 'home', name: 'Home Page' },
        {
          id: 'footer',
          name: 'Footer',
        },
      ]
    case 'no_value':
      return []

    default:
      return []
  }
}
