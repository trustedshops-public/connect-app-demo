import { ComponentChildren, Fragment, h } from 'preact'
import { Children, FC } from 'preact/compat'

export interface ITabsConfig {
  name: string
  id: number
}
interface Props {
  setOpenTab: (id: number) => void
  openTab: number
  tabs: Array<ITabsConfig>
  children?: ComponentChildren
}

const Tabs: FC<Props> = ({ children, openTab, tabs, setOpenTab }) => {
  return (
    <>
      <div className="ts-flex ts-w-full ts-flex-wrap">
        <div className="ts-w-full">
          <ul
            id={`tabslist`}
            className="ts-flex ts-w-full ts-h-12 ts-shadow-md ts-border-b ts-border-gray-divider ts-bg-white ts-rounded-t"
            role="tablist"
          >
            {tabs.map(({ name, id }) => (
              <li
                id={`tab_${name.replace(' ', '_')}`}
                key={id}
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(id)
                }}
                className={`ts-text-sm ts-font-bold ts-px-8 ts-min-w ts-min-w-40 ts-w-max ts-flex ts-items-center ts-justify-center ts-border-transparent ts-border-b-3 ts-cursor-pointer hover:ts-outline-none hover:ts-text-blue-600 hover:ts-border-blue-600
                ${
                  id === openTab
                    ? 'ts-bg-blue-100 ts-text-primary ts-border-blue-durk ts-border-b-3'
                    : 'ts-text-secondary'
                } `}
              >
                {name}
              </li>
            ))}
          </ul>
          <div className="ts-relative ts-flex-auto ts-flex ts-flex-col ts-min-w-0 ts-rounded-b">
            {Children.map(children, (item, index) => (openTab === index ? item : null))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Tabs
