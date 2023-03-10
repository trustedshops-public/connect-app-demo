/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import Button, { ButtonThemes } from '@/UI/components/controls/buttun'
import { h, Fragment } from 'preact'
import { route } from 'preact-router'
import { FC, memo, useEffect, useRef, useState } from 'preact/compat'
import { baseLayer } from './baseLayers/baseLayer'
import { dispatchAction, EVENTS } from './eventsLib'

const InjectScript = memo(({ src }: { src: string }) => {
  const divRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = src
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <div ref={divRef} />
    </>
  )
})

export const ConnectingTrustedShop: FC = () => {
  const [isShowConnectorPlugin, setIsShowConnectorPlugin] = useState(false)
  const [unsub, setunsub] = useState<{ usub: any | null } | undefined>({ usub: null })

  const connectorScript = 'https://static-app.connect-qa.trustedshops.com/connector/connector.es.js'

  const toggleShowConnectorPlugin = () => {
    if (isShowConnectorPlugin) {
      unsub && unsub.usub()
      dispatchAction({ action: EVENTS.CLOSE_CONNECTOR, payload: null })
      route('/', true)
    } else {
      const usub = baseLayer()
      setunsub({ usub })
    }
    setIsShowConnectorPlugin(include => !include)
  }

  return (
    <div className="ts-flex-1 ts-gap-2">
      <Button
        label={`${isShowConnectorPlugin ? 'Close' : 'Open'} connector`}
        theme={ButtonThemes.Secondary}
        onClick={toggleShowConnectorPlugin}
      />
      {isShowConnectorPlugin && (
        <>
          <InjectScript src={connectorScript} />
          <div id="eTrusted-connector" />
        </>
      )}
    </div>
  )
}
