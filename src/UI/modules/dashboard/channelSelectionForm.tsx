import { FC } from 'preact/compat'
import { h } from 'preact'
import { IChannelTS } from '@/store/channel/types'
import { Option, Select } from '@/components/controls/dropdown'
import { getSelectedAndMappedChannels } from '@/store/channel/mapperForChannels'
import { selectorChannels, selectorInfoOfSystem } from '@/store/selector'
import { DASHBOADR_KEYS } from '@/locales/types'
import useStore from '@/store/useStore'

const ChannelSelectionForm: FC<{ phrasesByKey: Nullable<DASHBOADR_KEYS> }> = ({ phrasesByKey }) => {
  const { setSelectedChannels } = useStore()
  const { selectedChannels, shopChannels, channelsFromTSC } = useStore(selectorChannels)
  const { infoOfSystem } = useStore(selectorInfoOfSystem)

  const onChangeChannel = (shopChannel: IChannelTS, channelFromTSC: Nullable<IChannelTS>) => {
    setSelectedChannels(getSelectedAndMappedChannels(shopChannel, channelFromTSC, selectedChannels))
  }

  return (
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
                {phrasesByKey?.channelSelect_title_shopsystem.replace(
                  '[%]shopsystem[%]',
                  infoOfSystem.nameOfSystem
                )}
              </p>
            </th>
            <th className="ts-px-6 ts-py-4 ts-w-[220px]">
              <p className="ts-text-default ts-font-bold ts-text-sm ts-text-left">
                {phrasesByKey?.channelSelect_title_etrusted}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {shopChannels.map(elem => (
            <tr
              id={`mapping_row_${elem.id}`}
              key={elem.id}
              className={
                selectedChannels.some(item => item.salesChannelRef === elem.id)
                  ? 'ts-bg-backgroundCard ts-border ts-border-blue-700 last:ts-rounded-b'
                  : 'ts-border-t ts-border-gray-500 last:ts-border-b-0'
              }
            >
              <td className="ts-border-r ts-border-gray-500 ts-px-6 ts-py-4 ts-w-[220px]">
                <p
                  id={`shopsystem_name_${elem.id}`}
                  className="ts-text-default ts-font-normal ts-text-sm ts-text-left"
                >
                  {elem.name}
                </p>
              </td>
              <td className="ts-px-6 ts-py-2 ts-w-[220px]">
                <Select
                  id={`channelSelectionForm_${elem.id}`}
                  placeholder={phrasesByKey?.global_placeholder_channel}
                  defaultValue={
                    selectedChannels
                      ? selectedChannels.find(item => item.salesChannelRef === elem.id)
                          ?.eTrustedName
                      : null
                  }
                >
                  <Option
                    id={`widgetLocation_deselect`}
                    value={'deselect'}
                    changeSelectedOption={() => onChangeChannel(elem, null)}
                  >
                    <p className="ts-m-2 ts-text-error ts-text-sm">
                      {phrasesByKey?.global_placeholder_channel}
                    </p>
                  </Option>
                  {channelsFromTSC.map(item => (
                    <Option
                      id={`channel_${item.id}`}
                      key={item.id}
                      value={item.id}
                      selected={selectedChannels.some(
                        chn => chn.eTrustedChannelRef === item.id && chn.salesChannelRef === elem.id
                      )}
                      changeSelectedOption={() => onChangeChannel(elem, item)}
                    >
                      <p
                        id={`channel_name_${item.id}`}
                        className="ts-m-2 ts-text-durkLabel ts-font-normal ts-text-sm ts-text-ellipsis ts-overflow-hidden"
                      >
                        {item.name}
                      </p>
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ChannelSelectionForm
