import { h } from 'preact'
import { FC } from 'preact/compat'
import Switch from '@/components/controls/switch'
import { StarIconSolid } from '@/components/layouts/icons'
import { IWidgetsChildren } from '@/baseLayers/types'
import { DASHBOADR_KEYS } from '@/locales/types'
import useStore from '@/store/useStore'

interface Props {
  widget: IWidgetsChildren
  phrasesByKey: DASHBOADR_KEYS
}

const WidgetExtension: FC<Props> = ({ widget, phrasesByKey }) => {
  const { updateWidgetExtensions } = useStore()
  return (
    <div className="ts-w-1/2">
      <p className="ts-text-sm ts-font-bold ts-mb-3 ts-text-default">
        {phrasesByKey.application_widgets_extension_title}
      </p>

      <div className="ts-flex ts-items-center ts-mb-3">
        <span className="ts-text-xs ts-mr-1">4.90</span>

        <StarIconSolid />
        <StarIconSolid />
        <StarIconSolid />
        <StarIconSolid />
        <StarIconSolid />

        <span className="ts-text-xs ts-text-gray-600 ts-ml-1">(136)</span>
      </div>

      <p className="ts-text-sm ts-mb-4 ts-text-default">
        {phrasesByKey.application_widgets_extension_description}
      </p>

      <Switch
        id={'widgetExtension'}
        isToggle={!!widget.extensions?.product_star.tag}
        setIsToggle={() => updateWidgetExtensions(widget.widgetId)}
        labelOn={phrasesByKey.global_slider_active}
        labelOff={phrasesByKey.global_slider_inactive}
      />
    </div>
  )
}

export default WidgetExtension
