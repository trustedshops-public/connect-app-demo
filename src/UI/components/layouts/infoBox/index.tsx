import { FC } from 'preact/compat'
import { h, ComponentChildren } from 'preact'
import TrustmarkImg from '@/assets/Trusted_Shops_Products_Trustmark.svg'
import helpIcon from '@/assets/invites-tab-help-icon.svg'

const InfoBox: FC<{
  phrasesByKey: Nullable<{ [key: string]: string }>
}> = ({ phrasesByKey }) => {
  return (
    <div className="ts-flex ts-h-infobox ts-w-infobox ts-p-2 ts-bg-backgroundCard ts-m-8 ts-border ts-border-gray-100 ts-border-dashed ts-rounded">
      <img src={TrustmarkImg} className="ts-h-full" />
      <div className="ts-p-2 ts-flex ts-flex-col ts-justify-between">
        <div>
          <p className="ts-text-default ts-font-bold ts-text-sm">
            {phrasesByKey?.global_help_title}
          </p>
          <p className="ts-text-secondary ts-font-normal ts-text-sm">
            {phrasesByKey?.global_help_text}
          </p>
        </div>
        {phrasesByKey && (
          <a
            href={phrasesByKey.global_help_link_url_1}
            className="ts-text-blue-700 ts-cursor-pointer ts-font-normal ts-text-sm"
            target="_blank"
            rel="noreferrer"
          >
            {phrasesByKey?.global_help_link_text}
          </a>
        )}
      </div>
    </div>
  )
}

interface Props {
  children: ComponentChildren
}

export const TabInfoBox: FC<Props> = ({ children }) => {
  return (
    <div className="ts-px-4 ts-py-3.5 ts-flex ts-items-start ts-bg-backgroundCard ts-border ts-border-dashed ts-border-gray-100 ts-rounded">
      <img className="ts-mr-4" src={helpIcon} alt="help-icon" />
      <div>{children}</div>
    </div>
  )
}

export default InfoBox
