import { h } from 'preact'
import { FC } from 'preact/compat'
import { CheckIcon, CloseIcon, ExlamationIcon } from '../icons'
import { DASHBOADR_KEYS } from '@/locales/types'
import { IToastList } from '@/store/notification/types'
import useStore from '@/store/useStore'
import { selectorNotificationStore } from '@/store/selector'

export enum Statuses {
  error = 'error',
  success = 'success',
}

interface IProps<T> {
  list: Array<T>
  item: T
  deleteToast: (id: number) => void
  phrasesByKey: DASHBOADR_KEYS
}

const Toast: FC<IProps<IToastList>> = ({ item, deleteToast, phrasesByKey }) => {
  return (
    <div
      key={item.id}
      className={`ts-flex ts-w-[524px] ts-min-w-80 ts-px-3 ts-py-3 ts-border ts-rounded ts-items-center ts-justify-between ts-mt-4 ts-gap-3
                ${
                  item.status === Statuses.success
                    ? 'ts-border-green-600 ts-bg-green-300'
                    : 'ts-bg-red-300 ts-border-red-500'
                }`}
    >
      <div className="ts-flex ts-items-center ts-gap-3">
        {item.status === Statuses.error ? (
          <ExlamationIcon color={'ts-text-red-500'} />
        ) : (
          <CheckIcon color={'ts-text-green-600'} />
        )}
        {item.errorText ? (
          <p className="ts-text-default ts-text-sm ts-font-bold">{item.errorText}</p>
        ) : (
          <p id="status_popup" className="ts-text-default ts-text-sm ts-font-bold">
            {phrasesByKey[`global_notification_${item.status}_${item.type}`]}
          </p>
        )}
      </div>
      <button
        onClick={() => {
          item.id && deleteToast(item.id)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

const ToastList: FC<{
  phrasesByKey: DASHBOADR_KEYS
}> = ({ phrasesByKey }) => {
  const { deleteToastItem } = useStore()
  const { toastList } = useStore(selectorNotificationStore)

  return (
    <div className="ts-fixed ts-z-[1202] ts-top-4 ts-right-8">
      {toastList.map(item => (
        <Toast
          list={toastList}
          key={item}
          item={item}
          deleteToast={deleteToastItem}
          phrasesByKey={phrasesByKey}
        />
      ))}
    </div>
  )
}

export default ToastList
