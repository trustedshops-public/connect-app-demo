import { FC } from 'preact/compat'
import { h } from 'preact'
import { Option, Select } from '@/components/controls/dropdown'
import { DASHBOADR_KEYS } from '@/locales/types'
import { ITrustbadgeChildren } from '@/baseLayers/types'
import NumberInput from '@/components/controls/numberInput'
import { PlacementDesktop, PlacementMobile } from './parseTrustbadgeData'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
  isDisabled: boolean
  trustbadgeDataChild: ITrustbadgeChildren
  placementPhrase: { [key: string]: string }
  updateTrustbadgeData: (obj: {
    [key: string]: {
      value?: string | number | boolean | undefined
      attributeName?: string | undefined
    }
  }) => void
}

const StandartEditor: FC<Props> = ({
  phrasesByKey,
  isDisabled,
  trustbadgeDataChild,
  updateTrustbadgeData,
  placementPhrase,
}) => {
  return (
    <div>
      <div className="ts-flex ts-items-center">
        <p className={`ts-w-52 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_desktop}
        </p>
        <div className="ts-w-placementSelect ts-ml-7 ts-mr-5">
          <Select
            id={'desktopPositionl'}
            placeholder={phrasesByKey.global_placeholder_channel}
            defaultValue={
              trustbadgeDataChild.attributes &&
              trustbadgeDataChild.attributes['data-desktop-position'] &&
              trustbadgeDataChild.attributes['data-desktop-position'].value
                ? placementPhrase[
                    trustbadgeDataChild.attributes['data-desktop-position'].value?.toString()
                  ]
                : null
            }
            disabled={isDisabled}
          >
            {Object.keys(PlacementDesktop).map(item => (
              <Option
                id={`desktopPositionl_${PlacementDesktop[item]}`}
                key={PlacementDesktop[item]}
                value={PlacementDesktop[item]}
                selected={Boolean(
                  trustbadgeDataChild.attributes &&
                    trustbadgeDataChild.attributes['data-desktop-position'] &&
                    PlacementDesktop[item] ===
                      trustbadgeDataChild.attributes['data-desktop-position'].value
                )}
                changeSelectedOption={value => {
                  updateTrustbadgeData({
                    'data-desktop-position': {
                      value,
                      attributeName: 'data-desktop-position',
                    },
                  })
                }}
              >
                <p className="ts-m-2 ts-text-default ts-font-normal ts-text-sm">
                  {placementPhrase[PlacementDesktop[item]]}
                </p>
              </Option>
            ))}
          </Select>
        </div>
        <p className={`ts-mr-7 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_inputDescription}
        </p>
        <div className="ts-w-16">
          <NumberInput
            id={'desktop-y-offset'}
            min={-54}
            max={999}
            value={
              trustbadgeDataChild.attributes &&
              trustbadgeDataChild.attributes['data-desktop-y-offset']
                ? trustbadgeDataChild.attributes['data-desktop-y-offset'].value?.toString()
                : ''
            }
            disabled={isDisabled}
            onChange={value => {
              updateTrustbadgeData({
                'data-desktop-y-offset': {
                  value: +value,
                  attributeName: 'data-desktop-y-offset',
                },
              })
            }}
          />
        </div>
        <p className={`ts-ml-3 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_pixels}
        </p>
      </div>

      <div className="ts-flex ts-items-center ts-mt-4">
        <p className={`ts-w-52 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_mobile}
        </p>
        <div className="ts-w-placementSelect ts-ml-7 ts-mr-5">
          <Select
            id={'mobilePositionl'}
            placeholder={phrasesByKey.global_placeholder_channel}
            defaultValue={
              trustbadgeDataChild.attributes &&
              trustbadgeDataChild.attributes['data-mobile-position'] &&
              trustbadgeDataChild.attributes['data-mobile-position'].value
                ? placementPhrase[
                    trustbadgeDataChild.attributes['data-mobile-position'].value?.toString()
                  ]
                : null
            }
            disabled={isDisabled}
          >
            {Object.keys(PlacementMobile).map(item => (
              <Option
                id={`mobilePositionl_${PlacementDesktop[item]}`}
                key={PlacementMobile[item]}
                value={PlacementMobile[item]}
                selected={Boolean(
                  trustbadgeDataChild.attributes &&
                    trustbadgeDataChild.attributes['data-mobile-position'] &&
                    PlacementMobile[item] ===
                      trustbadgeDataChild.attributes['data-mobile-position'].value
                )}
                changeSelectedOption={value => {
                  updateTrustbadgeData({
                    'data-mobile-position': {
                      value,
                      attributeName: 'data-mobile-position',
                    },
                  })
                }}
              >
                <p className="ts-m-2 ts-text-default ts-font-normal ts-text-sm">
                  {placementPhrase[PlacementMobile[item]]}
                </p>
              </Option>
            ))}
          </Select>
        </div>
        <p className={`ts-mr-7 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_inputDescription}
        </p>
        <div className="ts-w-16">
          <NumberInput
            id={'mobile-y-offset'}
            min={-10}
            max={999}
            value={
              trustbadgeDataChild.attributes &&
              trustbadgeDataChild.attributes['data-mobile-y-offset']
                ? trustbadgeDataChild.attributes['data-mobile-y-offset'].value?.toString()
                : ''
            }
            disabled={isDisabled}
            onChange={value => {
              updateTrustbadgeData({
                'data-mobile-y-offset': {
                  value: +value,
                  attributeName: 'data-mobile-y-offset',
                },
              })
            }}
          />
        </div>
        <p className={`ts-ml-3 ts-text-sm ts-text-default ${isDisabled && 'ts-opacity-25'}`}>
          {phrasesByKey?.application_trustbadge_placement_pixels}
        </p>
      </div>
    </div>
  )
}

export default StandartEditor
