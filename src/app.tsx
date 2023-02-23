import { h } from 'preact'
import { FC } from 'preact/compat'
import { ConnectingTrustedShop } from './plugin-example/connectingTrustedShop'

export const App: FC = () => {
  return (
    <div className="ts-flex-1">
      <ConnectingTrustedShop />
    </div>
  )
}
