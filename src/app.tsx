import { h } from 'preact'
import { FC } from 'preact/compat'
import { ConnectingTratsedShop } from './plugin-example/connectingTratsedShop'

export const App: FC = () => {
  return (
    <div className="ts-flex-1">
      <ConnectingTratsedShop />
    </div>
  )
}
