import { ComponentType } from 'preact'
export interface IModule {
  routeProps: {
    path: string
    component: ComponentType
  }
  name: string
}
