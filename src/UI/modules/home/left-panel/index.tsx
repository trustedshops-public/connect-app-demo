import { baseLayerData } from '@/database-container/data-config'
import { db } from '@/database-container/DatabaseContainer'
import { h } from 'preact'
import { FC } from 'preact/compat'

export const LeftPanel: FC = () => {
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
        <p className="ts-text-default ts-text-md ts-font-bold">Information of System:</p>
        <div className="ts-text-default ts-text-sm">
          {Object.entries(baseLayerData.infoSystem).map(([key, value]) => (
            <p key={key}>
              {key.toString()}: {`'${value.toString()}'`}
            </p>
          ))}
        </div>
      </div>
      <div className={''}>
        <p className="ts-text-default ts-text-md ts-font-bold">Active locale:</p>
        <div className="ts-text-default ts-text-sm">
          {baseLayerData.locale.toString().length ? baseLayerData.locale.toString() : 'en-GB'}
        </div>
      </div>
    </div>
  )
}
