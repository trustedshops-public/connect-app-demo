import { ConnectingTrustedShop } from '@/example-of-system-integration/connectingTrustedShop'
import { h } from 'preact'
import { FC } from 'preact/compat'
import { LeftPanel } from './left-panel'

const HomePageModule: FC = () => {
  return (
    <div className={'ts-flex ts-justify-center ts-w-full ts-h-full'}>
      <div className={'ts-flex ts-max-w-screen-2xl ts-w-full ts-h-full ts-min-h-screen ts-p-4 '}>
        <LeftPanel />
        <div className=" ts-w-full ts-max-w-backgroundCard ts-p-2">
          <ConnectingTrustedShop />
        </div>
      </div>
    </div>
  )
}

export default {
  routeProps: {
    path: '/',
    component: HomePageModule,
  },
  name: 'HomePageModule',
}
