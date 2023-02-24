import { FC } from 'preact/compat'
import { h, Fragment } from 'preact'
import { getParsedTrustbadgeDataStrToObj } from './parseTrustbadgeData'
import _ from 'lodash'
import { TabInfoBox } from '@/components/layouts/infoBox'
import TextWithLink from '@/components/layouts/textWithLink'
import { DASHBOADR_KEYS } from '@/locales/types'
import { ITrustbadgeChildren } from '@/baseLayers/types'

interface Props {
  phrasesByKey: DASHBOADR_KEYS
  isDisabled: boolean
  textStr: string
  initialTrustbadgeDataChild: ITrustbadgeChildren
  onChangeScript: (v: string) => void
  setTextStr: (v: string) => void
  setIsButtonDisabled: (v: boolean) => void
}

const EditIntegrationCodeProps: FC<Props> = ({
  phrasesByKey,
  isDisabled,
  textStr,
  onChangeScript,
  setTextStr,
  setIsButtonDisabled,
  initialTrustbadgeDataChild,
}) => {
  return (
    <>
      <div className="ts-h-full ts-mb-6">
        <textarea
          disabled={isDisabled}
          value={textStr}
          className="ts-bg-gray-300 ts-w-full ts-h-[360px] ts-p-[18px] ts-text-sm ts-text-code ts-font-code"
          onBlur={e => {
            onChangeScript((e.target as HTMLInputElement).value)
          }}
          onChange={e => {
            setTextStr((e.target as HTMLInputElement).value)
            setIsButtonDisabled(
              _.isEqual(
                getParsedTrustbadgeDataStrToObj((e.target as HTMLInputElement).value),
                initialTrustbadgeDataChild
              )
            )
          }}
        />
      </div>
      <TabInfoBox>
        <TextWithLink
          id={'trustbadge_expert_help'}
          url={phrasesByKey.application_trustbadge_expert_help_url_1}
          text={phrasesByKey.application_trustbadge_expert_help_text}
          textStyle="ts-text-default ts-text-sm"
        />
      </TabInfoBox>
    </>
  )
}

export default EditIntegrationCodeProps
