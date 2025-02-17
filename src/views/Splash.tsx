import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'
import {useStoreDetail} from '@/contexts/StoreDetailContext'
import {useOutlet} from '@/contexts/OutletContext'
import DropdownLocale from '@/components/locale'
import OutletSelection from '@/components/OutletSelection'
import {saveCart} from '@/utils/cart'
import {saveRemark} from '@/utils/setting'
import bgImage from '@/assets/background_banner.png'
import iconTakeaway from '@/assets/icon_takeaway.png'
import iconDelivery from '@/assets/icon_delivery.png'
import iconReservation from '@/assets/icon_reservation.png'
import iconReservationTable from '@/assets/icon_reservationv2.png'
import iconWarningGps from '@/assets/icon_warning_gps.png'
import olseraLogo from '@/assets/olsera_logo.png'
const Splash: React.FC = () => {
  const {t, i18n} = useTranslation()
  const {outletDetail} = useOutlet()
  const [remark, setRemark] = useState('')
  const navigate = useNavigate()

  const [isDisabled, setIsDisabled] = useState(true)
  const [allowLocation, setAllowLocation] = useState(false)

  const languageOptions = [
    {code: 'id', name: 'Indonesia'},
    {code: 'en', name: 'English'}
  ]

  const handleSelect = (option: {code: string; name: string}) => {
    i18n.changeLanguage(option.code)
  }

  useEffect(() => {
    checkPermission()
  }, [])

  const checkPermission = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successPosition, failurePosition, {
        enableHighAccuracy: true,
        timeout: 5000
      })
    } else {
      alert(`Browser doesn't support Geolocation`)
    }
  }

  const successPosition = () => {
    setAllowLocation(true)
  }

  const failurePosition = (error: GeolocationPositionError) => {
    console.error('Geolocation error:', error.message)
  }

  const selectRemark = (type: number) => {
    if (type === 1) {
      setRemark('OL-TAKE-AWAY')
      setIsDisabled(false)
    } else if (type === 2) {
      setRemark('DELIVERY')
      if (allowLocation) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    } else if (type === 3) {
      setRemark('RESERVATION')
      setIsDisabled(false)
    } else if (type === 4) {
      setRemark('TABLE_RESERVATION')
      setIsDisabled(false)
    }
  }

  const {storeDetail} = useStoreDetail()

  const goToMenu = () => {
    const cart = {}
    saveCart(cart)
    saveRemark(remark)
    navigate('/menu')
  }

  return (
    <>
      <main className="_content">
        <div className="_content__wrap">
          <div className="_fill-height">
            <header className="_toolbar _toolbar-flat _toolbar-fixed" style={{marginTop: '0px', transform: 'translateY(0px)', left: '0px', right: '0px'}}>
              <div className="_toolbar-content px-0">
                <div className="container py-0">
                  <div className="row">
                    <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                      <div className="d-flex align-center toolbar-antarinmakan">
                        <img src={storeDetail.logo} alt={storeDetail.name} className="toolbar-logo" />
                        <div className="spacer" />
                        <DropdownLocale
                          options={languageOptions}
                          onSelect={handleSelect}
                          selectedCode={i18n.language} // Default language
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="banner-splash" style={{backgroundImage: `url(${bgImage})`, height: 'calc(25% - 72px)'}} />
            <div className="container-banner-splash">
              <div className="logo-banner-splash">
                <img src={storeDetail.logo} alt={storeDetail.name} className="img-banner-splash" />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                  <div className="text-center">
                    <div className="title-splash">{t('welcome')}</div>
                    <div className="mt-1 subtitle-splash">{t('where_do_you_want_to_order')}</div>
                  </div>
                  {!allowLocation && (
                    <div className="mt-4">
                      <div className="warning-gps">
                        <div className="wrap-warning-gps">
                          <div className="warning-gps-icon">
                            <img src={iconWarningGps} alt="Warning" />
                          </div>
                          <div className="warning-gps-content">
                            <div className="warning-gps-title">{t('distance_store')}</div>
                          </div>
                          <div className="warning-gps-action">
                            <div className="warning-gps-action-allow" onClick={() => checkPermission()}>
                              {t('allow')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <OutletSelection />
                  <div style={{marginBottom: '64px'}}>
                    <div className="font-18 font-weight-700">{t('select_service')}</div>
                    <div className="list-services mt-6">
                      {outletDetail?.setting && Object.keys(outletDetail?.setting).length > 0 && outletDetail?.setting.use_takeaway === 1 && (
                        <div className={`col-flex py-2 px-4 item-services mb-2 ${remark === 'OL-TAKE-AWAY' ? 'active' : ''}`} onClick={() => selectRemark(1)}>
                          <div className="mr-2">
                            <div className="d-flex">
                              <img src={iconTakeaway} alt={storeDetail.name} className="image-40" />
                            </div>
                          </div>
                          <div className="col-flex-content">
                            <div className="col-flex-text font-16 font-weight-600">{t('takeaway')}</div>
                          </div>
                          <div className="list-item-action-services">
                            <div className={`list-item-action-select ${remark === 'OL-TAKE-AWAY' ? 'active' : ''}`}>
                              <div className="list-item-action-select-value" />
                            </div>
                          </div>
                        </div>
                      )}
                      {outletDetail?.setting && Object.keys(outletDetail?.setting).length > 0 && outletDetail?.setting.use_delivery === 1 && (
                        <div className={`col-flex py-2 px-4 item-services mb-2 ${remark === 'DELIVERY' ? 'active' : ''}`} onClick={() => selectRemark(2)}>
                          <div className="mr-2">
                            <div className="d-flex">
                              <img src={iconDelivery} alt={storeDetail.name} className="image-40" />
                            </div>
                          </div>
                          <div className="col-flex-content">
                            <div className="col-flex-text font-16 font-weight-600">{t('delivery')}</div>
                            {!allowLocation && <div className="message-allow-gps">{t('allow_gps_for_delivery')}</div>}
                          </div>
                          <div className="list-item-action-services">
                            <div className={`list-item-action-select ${remark === 'DELIVERY' ? 'active' : ''}`}>
                              <div className="list-item-action-select-value" />
                            </div>
                          </div>
                        </div>
                      )}
                      {outletDetail?.setting && Object.keys(outletDetail?.setting).length > 0 && outletDetail?.setting.use_reservation === 1 && (
                        <div className={`col-flex py-2 px-4 item-services mb-2 ${remark === 'RESERVATION' ? 'active' : ''}`} onClick={() => selectRemark(3)}>
                          <div className="mr-2">
                            <div className="d-flex">
                              <img src={iconReservation} alt={storeDetail.name} className="image-40" />
                            </div>
                          </div>
                          <div className="col-flex-content">
                            <div className="col-flex-text font-16 font-weight-600">{t('food_reservation')}</div>
                          </div>
                          <div className="list-item-action-services">
                            <div className={`list-item-action-select ${remark === 'RESERVATION' ? 'active' : ''}`}>
                              <div className="list-item-action-select-value" />
                            </div>
                          </div>
                        </div>
                      )}
                      {outletDetail?.setting && Object.keys(outletDetail?.setting).length > 0 && outletDetail?.setting.use_place_reservation === 1 && (
                        <div className={`col-flex py-2 px-4 item-services mb-2 ${remark === 'TABLE_RESERVATION' ? 'active' : ''}`} onClick={() => selectRemark(4)}>
                          <div className="mr-2">
                            <div className="d-flex">
                              <img src={iconReservationTable} alt={storeDetail.name} className="image-40" />
                            </div>
                          </div>
                          <div className="col-flex-content">
                            <div className="col-flex-text font-16 font-weight-600">{t('table_reservation')}</div>
                          </div>
                          <div className="mr-6 tag-new">{t('new')}</div>
                          <div className="list-item-action-services">
                            <div className={`list-item-action-select ${remark === 'TABLE_RESERVATION' ? 'active' : ''}`}>
                              <div className="list-item-action-select-value" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="olsera-brand mt-4 text-center">
                      <div className="font-12 grey-text font-weight-400" style={{marginBottom: '6px'}}>
                        powered by
                      </div>
                      <div>
                        <a href="https://www.olsera.com/id/online" target="_blank" rel="noopener noreferrer">
                          <img src={olseraLogo} alt="Olsera.com" width="76" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed-bottom">
              <div className="container">
                <div className="row">
                  <div className="py-0 col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                    <button
                      className={`btn primary btn-block btn-shadow text-none white-text ${isDisabled ? 'btn-disabled' : ''}`}
                      disabled={isDisabled}
                      style={{height: '40px'}}
                      onClick={() => goToMenu()}
                    >
                      <span className="btn-content">{t('view_menu')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="">
              <button onClick={testFunction}>{t('welcome')}</button>
              <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
              <button
                onClick={toggleTheme}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Toggle Theme
              </button>
            </div> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Splash
