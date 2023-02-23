import { ComponentChildren, h } from 'preact'
import { FC } from 'preact/compat'

interface Props {
  children: ComponentChildren
  value: string | number
  selected?: boolean
  changeSelectedOption: (value: string | number) => void
  id?: string
}

const Option: FC<Props> = ({ children, value, changeSelectedOption, selected, id }) => {
  return (
    <li
      id={`select_${id}`}
      data-testid={`select_${id}`}
      key={value}
      className={`ts-flex hover:ts-bg-gray-100 ts-cursor-pointer ${
        selected && 'ts-bg-gray-light-200'
      }`}
      onClick={() => changeSelectedOption(value)}
    >
      {children}
    </li>
  )
}

export default Option
