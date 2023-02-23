import { ComponentChildren, h } from 'preact'
import { FC } from 'preact/compat'

interface Props {
  children: ComponentChildren
  disabled?: boolean
  onChange: (id: string) => void
  formClassNames?: string
}

const RadioGroup: FC<Props> = ({ children, onChange, disabled, formClassNames = '' }) => {
  return (
    <form
      className={formClassNames}
      onClick={(e): void => {
        if (disabled) return
        onChange((e.target as HTMLInputElement).id.toString())
      }}
    >
      {children}
    </form>
  )
}

export default RadioGroup
