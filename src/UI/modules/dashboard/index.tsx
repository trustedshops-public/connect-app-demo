import { Fragment, h } from 'preact'
import { FC, useEffect, useState } from 'preact/compat'
import BackgroundCard from '@/components/layouts/backgroundCard'
import Tabs, { ITabsConfig } from '@/components/layouts/tabs'
import Logo from '@/components/controls/logo'
import InfoBox from '@/components/layouts/infoBox'
import { DASHBOADR_KEYS } from '@/locales/types'
import { Option, Select } from '@/components/controls/dropdown'
import ChannelSelectModal from './channelSelectModal'
import TextWithLink from '@/components/layouts/textWithLink'
import { dispatchAction, EVENTS } from '@/eventsLib'
import TrustBadgeTab from './tabTrustBadge'
import WidgetsTab from './tabWidgets'
import SettingsTab from './tabSettings'
import Spinner from '@/components/layouts/spinner'
import { getMappedChannels } from '@/store/channel/mapperForChannels'
import ReviewInvitesTab from './tabReviewInvites'
import ToastList from '@/components/layouts/toast'
import withLocalisation from '@/locales/withLocalisation'
import { PHRASES_DASHBOARD_KEYS } from '@/locales/keys'
import useStore from '@/store/useStore'
import {
  selectorChannels,
  selectorInfoOfSystem,
  selectorNotificationStore,
  selectorTrustbadgeState,
} from '@/store/selector'

const DashboardPageModule: FC<{
  setPhrasesByKey: (keys: DASHBOADR_KEYS) => void
  phrasesByKey: DASHBOADR_KEYS
}> = ({ setPhrasesByKey, phrasesByKey }) => {
  const [openTab, setOpenTab] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [tabConfig, setTabConfig] = useState<Nullable<ITabsConfig[]>>(null)

  const { infoOfSystem } = useStore(selectorInfoOfSystem)
  const {
    isChannelsLoading,
    mappedChannels,
    selectedShopChannels,
    selectedeTrustedChannelRef,
    channelsFromTSC,
    shopChannels,
    showChannelModal,
  } = useStore(selectorChannels)
  const { errorNotification } = useStore(selectorTrustbadgeState)

  const {
    getTrustbadge,
    clearTrustbadgeData,
    setIsLoading,
    setETrustedChannelRef,
    getWidgetsFromAPI,
    clearWidgetData,
    setSelectedShopChennel,
    setIsChannelsLoading,
    setSelectedChannels,
    addInToastList,
    setIsLoadingInvitesForProducts,
    getEventTypesFromApi,
  } = useStore()

  const { toastList } = useStore(selectorNotificationStore)

  useEffect(() => {
    setPhrasesByKey(PHRASES_DASHBOARD_KEYS)
    setIsChannelsLoading(true)
    dispatchAction({ action: EVENTS.GET_MAPPED_CHANNELS, payload: null })
  }, [])

  useEffect(() => {
    if (!selectedeTrustedChannelRef) {
      clearTrustbadgeData()
      clearWidgetData()
      return
    }
    getTrustbadge(selectedShopChannels)
    clearWidgetData()

    setIsLoading(true)
    setETrustedChannelRef({
      channelRef: selectedShopChannels.eTrustedChannelRef,
      accountRef: selectedShopChannels.eTrustedAccountRef,
    })
    getWidgetsFromAPI()
    setIsLoadingInvitesForProducts(true)
    dispatchAction({
      action: EVENTS.GET_WIDGET_PROVIDED,
      payload: {
        id: selectedShopChannels.eTrustedChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
      },
    })
    dispatchAction({
      action: EVENTS.GET_LOCATION_FOR_WIDGET,
      payload: {
        id: selectedShopChannels.eTrustedChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
      },
    })
    dispatchAction({
      action: EVENTS.GET_AVAILABLE_PRODUCT_IDENTIFIERS,
      payload: {
        id: selectedShopChannels.eTrustedChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
      },
    })

    dispatchAction({
      action: EVENTS.GET_PRODUCT_REVIEW_FOR_CHANNEL,
      payload: {
        id: selectedeTrustedChannelRef,
        eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
        salesChannelRef: selectedShopChannels.salesChannelRef,
      },
    })

    if (
      Object.prototype.hasOwnProperty.call(infoOfSystem, 'allowsEstimatedDeliveryDate') &&
      infoOfSystem.allowsEstimatedDeliveryDate
    ) {
      dispatchAction({
        action: EVENTS.GET_USE_ESTIMATED_DELIVERY_DATE_FOR_CHANNEL,
        payload: {
          id: selectedeTrustedChannelRef,
          eTrustedChannelRef: selectedShopChannels?.eTrustedChannelRef,
          salesChannelRef: selectedShopChannels.salesChannelRef,
        },
      })
    }

    if (
      Object.prototype.hasOwnProperty.call(infoOfSystem, 'allowsEventsByOrderStatus') &&
      infoOfSystem.allowsEventsByOrderStatus
    ) {
      dispatchAction({
        action: EVENTS.GET_USE_EVENTS_BY_ORDER_STATUS_FOR_CHANNEL,
        payload: {
          id: selectedeTrustedChannelRef,
          eTrustedChannelRef: selectedShopChannels.eTrustedChannelRef,
          salesChannelRef: selectedShopChannels.salesChannelRef,
        },
      })
    }

    if (infoOfSystem.allowsEstimatedDeliveryDate || infoOfSystem.allowsEventsByOrderStatus) {
      getEventTypesFromApi()
    }
  }, [selectedShopChannels])

  useEffect(() => {
    if (mappedChannels.length) return

    if (!showChannelModal) {
      setIsChannelsLoading(false)
      return
    }

    if (shopChannels.length && channelsFromTSC.length) {
      const mappedChannels = getMappedChannels(shopChannels, channelsFromTSC)

      if (mappedChannels.length === shopChannels.length) {
        dispatchAction({
          action: EVENTS.SAVE_MAPPED_CHANNEL,
          payload: mappedChannels,
        })
      } else {
        setSelectedChannels(mappedChannels)
        setIsChannelsLoading(false)
        setShowModal(true)
      }
    }
  }, [channelsFromTSC, shopChannels])

  useEffect(() => {
    if (!phrasesByKey) return

    setTabConfig([
      { id: 0, name: phrasesByKey.application_routes_trustbadge },
      { id: 1, name: phrasesByKey.application_routes_widgets },
      { id: 2, name: phrasesByKey.application_routes_invites },
      { id: 3, name: phrasesByKey.application_routes_settings },
    ])
  }, [phrasesByKey])

  useEffect(() => {
    if (!errorNotification.errorText) return

    addInToastList({
      event: '',
      text: '',
      errorText: errorNotification.errorText,
      status: errorNotification.status,
    })
  }, [errorNotification])

  return (
    tabConfig && (
      <>
        <div
          id={'dashboard_wrapper'}
          className="ts-flex ts-flex-col ts-font-sans ts-items-center ts-justify-center"
        >
          <BackgroundCard customClass="ts-p-8">
            {isChannelsLoading ? (
              <div className="ts-flex ts-flex-col ts-items-center ts-justify-center ts-h-96">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="ts-relative ts-flex ts-items-center ts-justify-center ts-mb-8">
                  {openTab !== 3 && (
                    <div className="ts-absolute ts-left-0 ts-w-chanelSelected">
                      <label
                        className={`${
                          !mappedChannels.length ? 'ts-text-secondary' : 'ts-text-durkLabel'
                        }  ts-font-normal ts-text-sm`}
                      >
                        {phrasesByKey.application_routes_channelSelector}
                      </label>
                      <Select
                        id={'channelSelection'}
                        placeholder="Choose an option"
                        defaultValue={
                          selectedShopChannels && selectedShopChannels?.salesChannelName
                        }
                        disabled={!mappedChannels.length}
                      >
                        {mappedChannels.map(item => (
                          <Option
                            id={`channel_${item.eTrustedChannelRef}`}
                            key={item.salesChannelRef}
                            value={item.salesChannelRef}
                            changeSelectedOption={setSelectedShopChennel}
                          >
                            <p className="ts-m-2 ts-text-default ts-font-normal ts-text-sm">
                              {item.salesChannelName}
                            </p>
                          </Option>
                        ))}
                      </Select>
                    </div>
                  )}
                  <Logo />
                </div>

                <div className="ts-rounded ts-w-full ts-h-auto ts-relative">
                  <Tabs tabs={tabConfig} openTab={openTab} setOpenTab={setOpenTab}>
                    <TrustBadgeTab phrasesByKey={phrasesByKey} />
                    <WidgetsTab phrasesByKey={phrasesByKey} />
                    <ReviewInvitesTab phrasesByKey={phrasesByKey} />
                    <SettingsTab phrasesByKey={phrasesByKey} />
                  </Tabs>
                  {!!toastList.length && <ToastList phrasesByKey={phrasesByKey} />}
                </div>

                <div className="ts-flex ts-items-center ts-justify-center ts-mt-8">
                  {phrasesByKey && (
                    <TextWithLink
                      id={'copyright'}
                      text={phrasesByKey.global_copyright_text}
                      url={phrasesByKey.global_copyright_url_1}
                      textStyle="ts-text-secondary ts-font-normal ts-text-xxs ts-text-center"
                    />
                  )}
                </div>
              </>
            )}
          </BackgroundCard>
          <InfoBox phrasesByKey={phrasesByKey} />
        </div>
        <ChannelSelectModal
          phrasesByKey={phrasesByKey}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </>
    )
  )
}

export default {
  routeProps: {
    path: '/ts/dashboard',
    component: withLocalisation(DashboardPageModule),
  },
  name: 'DashboardPageModule',
}
