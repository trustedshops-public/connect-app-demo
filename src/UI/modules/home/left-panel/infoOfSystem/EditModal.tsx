import { FC, useEffect, useState } from 'preact/compat'
import { h } from 'preact'
import Modal from '@/UI/components/layouts/modal'
import Button, { ButtonThemes } from '@/UI/components/controls/buttun'
import { InfoSystemType } from '@/database-container/data-config'
import Input from '@/UI/components/controls/input'
import Switch from '@/UI/components/controls/switch'
import { api } from '@/database-container/api/api'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'

interface Props {
  modalIsOpen: boolean
  setOpenModal: (value: boolean) => void
  infoOfSystem: InfoSystemType
}

const EditInfoModal: FC<Props> = ({ setOpenModal, modalIsOpen, infoOfSystem }) => {
  const [infoOfSystemModified, setInfoOfSystemModified] = useState<InfoSystemType>(infoOfSystem)
  console.log('file: EditModal.tsx:17  infoOfSystemModified:', infoOfSystemModified)

  useEffect(() => {
    if (!infoOfSystem) return

    setInfoOfSystemModified(infoOfSystem)
  }, [infoOfSystem])

  const changeInfoValues = (key: string, value: string | boolean) => {
    setInfoOfSystemModified(prev => ({ ...prev, [key]: value }))
  }

  const saveChangesToDB = () => {
    api.putSystemInfo(infoOfSystemModified)
    dispatchAction({
      action: EVENTS.SET_INFORMATION_OF_SYSTEM,
      payload: infoOfSystemModified,
    })
    setOpenModal(false)
  }
  return (
    <Modal
      showModal={modalIsOpen}
      footerContent={
        <div className="ts-flex ts-gap-2">
          <Button
            id={'cancelCreateWidgetPopup'}
            label={'Cancel'}
            theme={ButtonThemes.Secondary}
            onClick={() => setOpenModal(false)}
          />
          <Button
            id={'submitCreateWidgetPopup'}
            label={'Save to local database'}
            theme={ButtonThemes.Primary}
            onClick={() => {
              saveChangesToDB()
            }}
          />
        </div>
      }
    >
      <div className="ts-w-full ts-flex ts-items-start">
        <div
          id="mapping_table"
          className="ts-relative ts-max-w-max ts-border ts-border-gray-500 ts-rounded"
        >
          <table className="ts-w-full ">
            <thead>
              <tr>
                <th className="ts-px-6 ts-py-4 ts-border-r ts-border-gray-500 ts-w-[220px]">
                  <p
                    id={'shopsystem_title'}
                    className="ts-text-default ts-font-bold ts-text-sm ts-text-left"
                  >
                    {'Key'}
                  </p>
                </th>
                <th className="ts-px-6 ts-py-4 ts-w-[220px]">
                  <p className="ts-text-default ts-font-bold ts-text-sm ts-text-left">{'Value'}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {infoOfSystemModified &&
                Object.entries(infoOfSystemModified).map(([key, value]) => (
                  <tr key={key} className={'ts-border-t ts-border-gray-500 last:ts-border-b-0'}>
                    <td className="ts-border-r ts-border-gray-500 ts-px-6 ts-py-4 ts-w-[220px]">
                      <p className="ts-text-default ts-font-normal ts-text-sm ts-text-left">
                        {key}
                      </p>
                    </td>
                    <td className="ts-px-6 ts-py-2 ts-w-[220px]">
                      {(key === 'versionNumberOfSystem' ||
                        key === 'nameOfSystem' ||
                        key === 'versionNumberOfPlugin') && (
                        <Input
                          type="text"
                          value={value as string}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onBlur={() => {}}
                          onChange={val => changeInfoValues(key, val)}
                        />
                      )}
                      {key !== 'versionNumberOfSystem' &&
                        key !== 'nameOfSystem' &&
                        key !== 'versionNumberOfPlugin' && (
                          <Switch
                            id={'trustBadge'}
                            isToggle={value as boolean}
                            setIsToggle={val => changeInfoValues(key, val)}
                            labelOn={'true'}
                            labelOff={'false'}
                          />
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}

export default EditInfoModal
