import { api } from '@/database-container/api/api'
import { InfoSystemType, LocalesTypes } from '@/database-container/data-config'
import { db } from '@/database-container/useMockDataBaseForBaseLayer'
import { dispatchAction, EVENTS } from '@/example-of-system-integration/eventsLib'
import { Option, Select } from '@/UI/components/controls/dropdown'
import { EditIcon } from '@/UI/components/layouts/icons/EditIcon'
import { h } from 'preact'
import { FC, useEffect, useState } from 'preact/compat'
import EditInfoModal from './infoOfSystem/EditModal'

export const LeftPanel: FC = () => {
  const [modalIsOpen, setOpenModal] = useState(false)
  const [infoOfSystem, setInfoOfSystem] = useState<InfoSystemType>()
  const [locale, setLocale] = useState<string>()

  useEffect(() => {
    db.read()
    setInfoOfSystem(db.data?.infoSystem)
    setLocale(db.data?.locale)
  }, [modalIsOpen])

  const setSelectedLocale = (lng: LocalesTypes) => {
    api.putLocale(lng)
    dispatchAction({
      action: EVENTS.SET_LOCALE,
      payload: lng,
    })
    setLocale(lng)
  }
  return (
    <div className=" ts-flex ts-flex-col ts-w-1/4 ts-bg-slate-200 ts-p-2 ts-gap-2">
      <p className="ts-text-default ts-text-sm ts-gap-2">
        You can edit the initial data for the database in the config:
        <p className="ts-text-default ts-text-sm ts-font-bold">
          src/database-container/data-config.ts
        </p>
        Then delete the Database file from the Local Storage and reboot the page.
        <p className=" ts-text-red-400 ts-text-sm ts-font-bold">
          Attention! This will lead to the discharge of previously saved data into a demo-database.
        </p>
      </p>
      {!db.data?.salesChannels.length && (
        <div className={''}>
          <p className="ts-text-default ts-text-md ts-font-bold">Sales Channels:</p>
          <div className="ts-text-default ts-text-sm">
            <p className=" ts-text-red-400 ts-text-sm">
              salesChannels is an empty array. The connector will not be able to compare the
              channels and will not receive data for further display
            </p>
            Please edit the initial data for the database in the file Then delete the Database file
            from the Local Storage and reboot the page
          </div>
        </div>
      )}
      <div className={''}>
        <div className={'ts-flex ts-gap-4 ts-items-center'}>
          <p className="ts-text-default ts-text-md ts-font-bold">Information of System:</p>
          <button onClick={() => setOpenModal(true)}>
            <EditIcon />
          </button>
        </div>
        <div className="ts-text-default ts-text-sm">
          {infoOfSystem &&
            Object.entries(infoOfSystem).map(([key, value]) => (
              <p key={key}>
                {key.toString()}: {`'${value.toString()}'`}
              </p>
            ))}
        </div>
      </div>
      <div className={''}>
        <p className="ts-text-default ts-text-md ts-font-bold">Active locale:</p>
        <div className="ts-text-default ts-text-sm">
          <Select placeholder="Languege" defaultValue={locale || 'en-GB'}>
            {['en-GB', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'nl-NL', 'pl-PL', 'pt-PT'].map(item => (
              <Option
                key={item}
                value={item}
                changeSelectedOption={val => setSelectedLocale(val as LocalesTypes)}
              >
                <p className="ts-m-2 ts-text-default ts-font-normal ts-text-sm">{item}</p>
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <EditInfoModal
        modalIsOpen={modalIsOpen}
        setOpenModal={setOpenModal}
        infoOfSystem={infoOfSystem as InfoSystemType}
      />
    </div>
  )
}
