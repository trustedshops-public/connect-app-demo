/* eslint-disable @typescript-eslint/no-explicit-any */
import { VNode, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createPortal, FC } from 'preact/compat'
import 'tailwindcss/tailwind.css'

const ShadowWrapper: FC<{ mode: 'closed' | 'open'; children: VNode }> = props => {
  const { children, mode = 'open', ...rest } = props

  const ref = useRef<HTMLDivElement>(null)
  const [shadowRoot, setShadowRoot] = useState<Nullable<any>>(null)

  useEffect(() => {
    if (!ref.current) return
    setShadowRoot(ref.current?.attachShadow({ mode }))
  }, [])

  return (
    <div {...rest} ref={ref} id="shadowRoot" data-testid="shadowRoot">
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  )
}

export default ShadowWrapper
