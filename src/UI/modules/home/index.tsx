import { ConnectingTrustedShop } from '@/plugin-example/connectingTrustedShop'
import { h } from 'preact'
import { FC } from 'preact/compat'

const HomePageModule: FC = () => {
  return (
    <div className={' ts-w-full ts-h-screen ts-p-4'}>
      <ConnectingTrustedShop />
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
