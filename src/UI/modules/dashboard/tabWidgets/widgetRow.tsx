import { h } from 'preact'
import { FC } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import Tooltip from '@/components/controls/tooltip'
import { EyeIcon, ChevronDownIconSolid } from '@/components/layouts/icons'
import { Option, Select } from '@/components/controls/dropdown'
import Tag from '@/components/controls/tag'
import WidgetExtension from './widgetExtension'
import {
  PreviewCarousel,
  PreviewMiniStars,
  PreviewReviewList,
  PreviewTrustedStars,
} from './previewWidgets'
import { IWidgetsChildren } from '@/baseLayers/types'
import { DASHBOADR_KEYS } from '@/locales/types'
import { IWidgetApi, IWidgetLocation } from '@/store/widgets/types'
import useStore from '@/store/useStore'
import { PreviewCustomerVoice } from './previewWidgets/previewCustomerVoice'

export enum Content {
  product_star = 'Product reviews',
  product_review_list = 'Product reviews',
  trusted_stars_service = 'Service reviews',
  review_carousel_service = 'Service reviews',
  testimonial_service = 'Service reviews',
}

enum ContentTranslate {
  product_star = 'application_widgets_contentType_productReviews',
  product_review_list = 'application_widgets_contentType_productReviews',
  trusted_stars_service = 'application_widgets_contentType_serviceReviews',
  review_carousel_service = 'application_widgets_contentType_serviceReviews',
  testimonial_service = 'application_widgets_contentType_serviceReviews',
}

enum ApplicationType {
  product_star = 'application_widgets_name_MiniStars',
  product_review_list = 'application_widgets_name_FullReviewList',
  trusted_stars_service = 'application_widgets_name_TrustedStars',
  review_carousel_service = 'application_widgets_name_ReviewCarousel',
  testimonial_service = 'application_widgets_name_CustomerVoice',
}

const FULL_REVIEW_APPLICATION_TYPE = 'product_review_list'
export const PRODUCT_REVIEW_APPLICATION_TYPES = ['product_star', 'product_review_list']

const PREVIEW_BY_APPLICATION_TYPE = {
  product_star: <PreviewMiniStars />,
  product_review_list: <PreviewReviewList />,
  review_carousel_service: <PreviewCarousel />,
  trusted_stars_service: <PreviewTrustedStars />,
  testimonial_service: <PreviewCustomerVoice />,
}

interface Props {
  widget: IWidgetsChildren & { isDeleted?: boolean }
  phrasesByKey: DASHBOADR_KEYS
  availableProducts: { id: string; name: string }[]
  widgetsFromAPI: IWidgetApi[]
  widgetsWithoutProductId: IWidgetsChildren[]
}

const WidgetRow: FC<Props> = ({
  widget,
  phrasesByKey,
  widgetsFromAPI,
  widgetsWithoutProductId,
  availableProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultAttributeName, setDefaultAttributeName] = useState('')
  const [statusIntegrated, setStatusIntegrated] = useState<boolean>(false)
  const [locationForThisWidget, setLocationForThisWidget] = useState<IWidgetLocation[]>([])

  const { updateWidgetLocation, updateWidgetAttribute } = useStore()
  const { widgetLocation } = useStore(state => state.widgetState)

  const isFullReviewWidget = FULL_REVIEW_APPLICATION_TYPE === widget.applicationType
  const isProductReviewsWidget = PRODUCT_REVIEW_APPLICATION_TYPES.includes(widget.applicationType)

  useEffect(() => {
    const defaultAttributeName = availableProducts.find(
      option => option.id === widget.attributes?.productIdentifier?.attributeName
    )?.name

    if (availableProducts.length === 1 && !defaultAttributeName && !!widget.widgetLocation?.id) {
      updateWidgetAttribute(widget.widgetId, availableProducts[0].id)
      isProductReviewsWidget && setIsOpen(true)

      return
    }
    setDefaultAttributeName(defaultAttributeName || '')
  }, [availableProducts, widget])

  useEffect(() => {
    if (!widget || !widgetsWithoutProductId.length) return

    if (
      widgetsWithoutProductId.findIndex(widgetWPID => widgetWPID.widgetId === widget.widgetId) >= 0
    ) {
      setIsOpen(true)
    }
  }, [widgetsWithoutProductId])

  useEffect(() => {
    if (!widget || !widgetLocation) return

    const location = widgetLocation.filter(
      loc =>
        !loc.availableForType || loc.availableForType?.includes(Content[widget.applicationType])
    )

    setLocationForThisWidget(location)
  }, [widgetLocation, widget])

  useEffect(() => {
    if (!widget || !widgetsFromAPI) return
    const isDeleted = widgetsFromAPI.some(item => item.id === widget.widgetId)

    setStatusIntegrated(
      !!(
        widget.widgetLocation &&
        widget.widgetLocation.id &&
        isDeleted &&
        (isProductReviewsWidget ? !!defaultAttributeName : true)
      )
    )
  }, [widget, widgetsFromAPI, defaultAttributeName])

  const handleLocation = (location: IWidgetLocation) => {
    if (availableProducts.length === 1) {
      updateWidgetAttribute(widget.widgetId, availableProducts[0].id)
    }

    isProductReviewsWidget && setIsOpen(true)
    updateWidgetLocation(widget.widgetId, { id: location.id, name: location.name })
  }

  return (
    <div
      data-testid="widget_row"
      className={`ts-border-b last:ts-border-b-0 ts-border-gray-500 ${
        isOpen && 'ts-bg-backgroundCard'
      }`}
    >
      <div className="ts-flex ts-items-center ts-px-6 ts-py-2">
        <div className="ts-flex ts-items-center ts-text-left ts-w-th1">
          <Tooltip content={PREVIEW_BY_APPLICATION_TYPE[widget.applicationType]}>
            <EyeIcon customClass="hover:ts-text-blue-700" />
          </Tooltip>

          <div>
            <p id={`widget_type_${widget.widgetId}`} className="ts-text-sm ts-text-default">
              {phrasesByKey[ApplicationType[widget.applicationType]]}
            </p>
            <p
              id={`widget_id_${widget.widgetId}`}
              data-testid="widget_id"
              className="ts-text-xs ts-text-secondary"
            >
              {widget.widgetId}
            </p>
          </div>
        </div>

        <div id={`widget_status_${widget.widgetId}`} className="ts-text-left ts-w-th2">
          {statusIntegrated ? (
            <Tag label={phrasesByKey.application_widgets_status_integrated} />
          ) : (
            <Tag isWarning={true} label={phrasesByKey.application_widgets_status_notIntegrated} />
          )}
        </div>

        <div
          id={`widget_content_${widget.widgetId}`}
          className="ts-text-left ts-text-sm ts-text-default ts-w-th3"
        >
          {phrasesByKey[ContentTranslate[widget.applicationType]]}
        </div>

        <div className="ts-text-left ts-w-th4 ">
          <Select
            id={`widgetLocation_${widget.widgetId}`}
            isError={
              !widget.widgetLocation ||
              !widget.widgetLocation.id ||
              !widgetLocation.some(prod => prod.id === widget.widgetLocation?.id)
            }
            placeholder={phrasesByKey.global_placeholder_location}
            defaultValue={
              phrasesByKey[
                widgetLocation.find(loc => loc.id === widget.widgetLocation?.id)?.key as string
              ] || widget.widgetLocation?.name
            }
          >
            <Option
              id={`widgetLocation_deselect`}
              value={'deselect'}
              changeSelectedOption={() => {
                isProductReviewsWidget && setIsOpen(true)
                updateWidgetLocation(widget.widgetId, { id: '', name: '' })
              }}
            >
              <p className="ts-m-2 ts-text-error ts-text-sm">
                {phrasesByKey.global_placeholder_location}
              </p>
            </Option>
            {locationForThisWidget.map(option => (
              <Option
                id={`widgetLocation_${option.id}`}
                key={option.id}
                value={option.id}
                selected={option.id === widget.widgetLocation?.id}
                changeSelectedOption={() => {
                  handleLocation(option)
                }}
              >
                <p className="ts-m-2 ts-text-sm ts-text-default">
                  {phrasesByKey[option.key as string] || option.name}
                </p>
              </Option>
            ))}
          </Select>
        </div>

        {isProductReviewsWidget && (
          <div className="ts-flex ts-text-left ts-w-th5 ts-justify-end">
            <button
              id={`widget_expand_${widget.widgetId}`}
              onClick={() => setIsOpen(!isOpen)}
              className="ts-flex ts-items-center ts-justify-center ts-w-6 ts-h-6 ts-border ts-rounded-full ts-border-gray-500 ts-cursor-pointer hover:ts-bg-gray-light-400"
            >
              <ChevronDownIconSolid
                customClass={`"ts-fill-current ts-h-5 ts-w-5 ts-transform ${
                  isOpen && 'ts--rotate-180'
                } ts-transition ts-duration-150 ts-ease-in-out"`}
              />
            </button>
          </div>
        )}
      </div>

      {isOpen && isProductReviewsWidget && (
        <div className="ts-flex ts-justify-between ts-p-6">
          <div className="ts-w-60">
            <p className="ts-text-sm ts-font-bold ts-mb-3">
              {phrasesByKey.application_widgets_configuration}
            </p>

            <label className="ts-text-sm">{phrasesByKey.application_widgets_productID}</label>

            <Select
              id={`productID_${widget.widgetId}`}
              placeholder={phrasesByKey.global_placeholder_productid}
              defaultValue={defaultAttributeName}
              disabled={!availableProducts.length}
              isError={!defaultAttributeName}
            >
              {availableProducts.map(option => (
                <Option
                  id={`productID_${option.id}`}
                  key={option.id}
                  value={option.id}
                  selected={option.name === defaultAttributeName}
                  changeSelectedOption={() => updateWidgetAttribute(widget.widgetId, option.id)}
                >
                  <p className="ts-m-2 ts-text-sm ts-text-default">{option.name}</p>
                </Option>
              ))}
            </Select>
          </div>

          {isFullReviewWidget && <WidgetExtension widget={widget} phrasesByKey={phrasesByKey} />}
        </div>
      )}
    </div>
  )
}

export default WidgetRow
