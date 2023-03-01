import { ConnectingTrustedShop } from '@/example-of-system-integration/connectingTrustedShop'
import { baseLayerData } from '@/database-container/data-config'
import { h } from 'preact'
import { FC } from 'preact/compat'

const HomePageModule: FC = () => {
  return (
    <div className={'ts-flex ts-justify-center ts-w-full ts-h-full'}>
      <div className={'ts-flex ts-max-w-screen-2xl ts-w-full ts-h-full ts-min-h-screen ts-p-4 '}>
        <div className=" ts-flex ts-flex-col ts-w-1/4 ts-bg-slate-200 ts-p-2 ts-gap-2">
          <div className={''}>
            <p className="ts-text-default ts-text-md ts-font-bold">Information of System:</p>
            <div className="ts-text-default ts-text-sm">
              {Object.entries(baseLayerData.infoSystem).map(([key, value]) => (
                <p key={key}>
                  {key.toString()}: {`'${value.toString()}'`}
                </p>
              ))}
            </div>
          </div>
          <div className={''}>
            <p className="ts-text-default ts-text-md ts-font-bold">Active locale:</p>
            <div className="ts-text-default ts-text-sm">{baseLayerData.locale.toString()}</div>
          </div>
          <p className="ts-text-default ts-text-sm">
            Change config: src/example-of-system-integration/data-config.ts
          </p>
        </div>
        <div className=" ts-max-w-backgroundCard ts-p-2">
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
