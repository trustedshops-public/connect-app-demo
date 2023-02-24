import { h, Fragment } from 'preact'
import { FC } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { getPhraseWithReplacement } from '@/helpers'
import Button, { ButtonThemes } from '@/components/controls/buttun'
import CreateWidgetPopup from './createWidgetPopup'
import WidgetRow from './widgetRow'
import { dispatchAction, EVENTS } from '@/eventsLib'
import Spinner, { ScrinSpinner } from '@/components/layouts/spinner'
import { WidgetChildren } from '@/store/widgets/types'
import tabIcon from '@/assets/widgets-tab-icon.svg'
import { IWidgets } from '@/baseLayers/types'
import { DASHBOADR_KEYS } from '@/locales/types'
import _ from 'lodash'
import useStore from '@/store/useStore'
import { selectorChannels } from '@/store/selector'
import { RefreshIcon } from '@/components/layouts/icons/RefreshIcon'

const ATTRIBUTE_OPTIONS = [
  { id: 'data-sku', name: 'SKU' },
  { id: 'data-gtin', name: 'GTIN' },
  { id: 'data-mpn', name: 'MPN' },
]
interface Props {
  phrasesByKey: DASHBOADR_KEYS
}

const WidgetsTab: FC<Props> = ({ phrasesByKey }) => {
  const [modalIsOpen, setOpenModal] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [widgetsWithoutProductId, setWidgetsWithoutProductId] = useState<WidgetChildren[]>([])
  const [availableProducts, setAvailableProducts] = useState<{ id: string; name: string }[]>([])

  const { selectedShopChannels } = useStore(selectorChannels)

  const { setisWidgetLoading, addInToastList, getWidgetsFromAPI, setIsLoading } = useStore()
  const {
    isLoading,
    widgets,
    widgetsChildren,
    widgetsFromBL,
    widgetsFromAPI,
    isWidgetLoading,
    availableProductIds,
  } = useStore(state => state.widgetState)

  useEffect(() => {
    const widgetsChildrenFiltred = widgetsChildren.filter(
      (widget: WidgetChildren) => widget.widgetLocation?.id
    )
    if (!widgetsFromBL || !widgetsFromBL.children || !widgetsFromBL.children.length) {
      setIsButtonDisabled(!widgetsChildrenFiltred.length)
      return
    }
    const isEqualRB = _.isEqual(widgetsChildrenFiltred, widgetsFromBL.children[0].children)
    setIsButtonDisabled(isEqualRB)
  }, [widgetsChildren, widgetsFromBL])

  const onReloadList = async () => {
    await setIsLoading(true)
    await getWidgetsFromAPI()
    dispatchAction({
      action: EVENTS.GET_WIDGET_PROVIDED,
      payload: {
        id: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
      },
    })
  }

  useEffect(() => {
    const products = availableProductIds.length
      ? ATTRIBUTE_OPTIONS.filter(option => availableProductIds.some(prod => prod.id === option.id))
      : ATTRIBUTE_OPTIONS

    setAvailableProducts(products)
  }, [availableProductIds])

  const handleSaveChanges = () => {
    const copyWidgets = JSON.parse(JSON.stringify(widgets)) as IWidgets
    const widgetsWithoutPId: WidgetChildren[] = []
    copyWidgets.children[0].children = copyWidgets.children[0].children.filter(
      (widget: WidgetChildren) => {
        if (widget.widgetLocation?.id) {
          if (widget.attributes?.productIdentifier?.attributeName === '') {
            widgetsWithoutPId.push(widget)
          }
          return widget
        }
        return
      }
    )
    if (widgetsWithoutPId.length) {
      setWidgetsWithoutProductId(widgetsWithoutPId)
      addInToastList({
        status: 'error',
        type: 'productIdUnselected',
      })
      return
    }
    setisWidgetLoading(true)
    dispatchAction({
      action: EVENTS.SAVE_WIDGET_CHANGES,
      payload: {
        ...copyWidgets,
        id: selectedShopChannels.eTrustedChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
      },
    })
  }

  return (
    <div className="ts-w-full ts-bg-white ts-p-8 ts-shadow-md ts-rounded-b">
      {isWidgetLoading && <ScrinSpinner />}

      {isLoading ? (
        <div className="ts-flex ts-flex-col ts-items-center ts-justify-center ts-h-96">
          <Spinner />
        </div>
      ) : (
        <div className="ts-w-full ts-flex ts-gap-8">
          <div className="ts-min-w-20 ts-h-20">
            <img className="ts-w-20 ts-h-20" src={tabIcon} alt="icon" />
          </div>

          <div className="ts-w-[calc(100%-112px)]">
            <p className="ts-text-default ts-text-md ts-font-bold ts-mb-4">
              {phrasesByKey.application_widgets_title}
            </p>
            <p className="ts-text-default ts-text-sm ts-mb-4 ">
              {phrasesByKey.application_widgets_description}
            </p>

            {selectedShopChannels && Object.keys(selectedShopChannels).length > 0 && (
              <p className="ts-text-default ts-text-sm ts-font-bold ts-mb-6">
                {getPhraseWithReplacement(phrasesByKey.application_widgets_table_title, {
                  channel: selectedShopChannels.eTrustedName,
                })}
              </p>
            )}

            <div className="ts-w-full ts-mb-6 ts-border ts-rounded ts-border-gray-500">
              <div className="ts-flex ts-px-6 ts-items-center ts-w-full ts-h-10 ts-border-b ts-border-gray-500">
                <p className="ts-text-left ts-text-sm ts-font-bold ts-text-default ts-w-th1">
                  {phrasesByKey.application_widgets_table_header_1}
                </p>
                <p className="ts-text-left ts-text-sm ts-font-bold ts-text-default ts-w-th2">
                  {phrasesByKey.application_widgets_table_header_2}
                </p>
                <p className="ts-text-left ts-text-sm ts-font-bold ts-text-default ts-w-th3">
                  {phrasesByKey.application_widgets_table_header_3}
                </p>
                <p className="ts-text-left ts-text-sm ts-font-bold ts-text-default ts-w-th4">
                  {phrasesByKey.application_widgets_table_header_4}
                </p>
                <div className="ts-text-left ts-text-sm ts-font-bold ts-text-default ts-w-th5" />
              </div>

              <>
                {Array.isArray(widgetsChildren) && widgetsChildren.length === 0 && (
                  <div className="ts-flex ts-items-center ts-pl-6 ts-h-12 ts-w-full ts-border-b">
                    <p id="no_widgets_text" className="ts-italic ts-w-full ts-text-sm">
                      {phrasesByKey.application_widgets_noWidgets}.
                    </p>
                  </div>
                )}

                {Array.isArray(widgetsChildren) &&
                  widgetsChildren.length > 0 &&
                  widgetsChildren.map(widget => (
                    <WidgetRow
                      key={widget.widgetId}
                      widget={widget}
                      widgetsFromAPI={widgetsFromAPI}
                      phrasesByKey={phrasesByKey}
                      availableProducts={availableProducts}
                      widgetsWithoutProductId={widgetsWithoutProductId}
                    />
                  ))}

                <div className="ts-flex ts-items-center ts-h-12 ts-px-6 ts-text-sm ts-justify-between">
                  <Button
                    id={'openPopupCreateWidget'}
                    label={phrasesByKey.application_widgets_create}
                    theme={ButtonThemes.Link}
                    type="link"
                    disabled={!selectedShopChannels.eTrustedChannelRef}
                    onClick={() => setOpenModal(true)}
                  />

                  <Button
                    id={'reloadListWidget'}
                    label={
                      <div className=" ts-flex ts-gap-1">
                        <RefreshIcon color={'ts-text-blue-700'} />
                        {phrasesByKey.application_widgets_reload}
                      </div>
                    }
                    theme={ButtonThemes.Link}
                    type="link"
                    disabled={!selectedShopChannels.eTrustedChannelRef}
                    onClick={onReloadList}
                  />
                </div>
              </>
            </div>

            <div className="ts-w-full ts-flex ts-justify-end">
              <Button
                id={'saveWidgetsChanges'}
                label={phrasesByKey.global_button_submit}
                theme={ButtonThemes.Primary}
                onClick={handleSaveChanges}
                disabled={!selectedShopChannels.eTrustedChannelRef || isButtonDisabled}
              />
            </div>
          </div>
        </div>
      )}
      <CreateWidgetPopup
        phrasesByKey={phrasesByKey}
        channelRef={selectedShopChannels.eTrustedChannelRef}
        modalIsOpen={modalIsOpen}
        setOpenModal={setOpenModal}
      />
    </div>
  )
}

export default WidgetsTab
