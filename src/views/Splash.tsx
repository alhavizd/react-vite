// import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'
import {useStoreDetail} from '@/contexts/StoreDetailContext'
import {useQuery} from '@tanstack/react-query'
import {getList} from '@/services/outlet'
import {Outlet} from '@/types/outlet'
import DropdownLocale from '@/components/locale'
import bgImage from '@/assets/background_banner.png'
import iconTakeaway from '@/assets/icon_takeaway.png'
import iconDelivery from '@/assets/icon_delivery.png'
import iconReservation from '@/assets/icon_reservation.png'
import iconReservationTable from '@/assets/icon_reservationv2.png'
import olseraLogo from '@/assets/olsera_logo.png'
import Icon from '@mdi/react'
import {mdiChevronDown} from '@mdi/js'
const Splash: React.FC = () => {
  const {
    data: outlets,
    isLoading,
    isError
  } = useQuery<Outlet[]>({
    queryKey: ['outlets', {origin_lat: 1.1599872, origin_lon: 104.0187392}],
    queryFn: () => getList({origin_lat: 1.1599872, origin_lon: 104.0187392})
  })

  // let navigate = useNavigate()
  // const testFunction = async () => {
  //   navigate('/menu')
  // }
  const {t, i18n} = useTranslation()

  const languageOptions = [
    {code: 'id', name: 'Indonesia'},
    {code: 'en', name: 'English'}
  ]

  const handleSelect = (option: {code: string; name: string}) => {
    i18n.changeLanguage(option.code)
  }

  const {storeDetails} = useStoreDetail()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{isError}</p>

  console.log(outlets)

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
                        <img src={storeDetails.logo} alt={storeDetails.name} className="toolbar-logo" />
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
                <img src={storeDetails.logo} alt={storeDetails.name} className="img-banner-splash" />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                  <div className="text-center">
                    <div className="title-splash">{t('welcome')}</div>
                    <div className="mt-1 subtitle-splash">{t('where_do_you_want_to_order')}</div>
                  </div>
                  <div className="mt-4 mb-8">
                    <div className="outlet-selection cursor-pointer">
                      <div className="col-flex py-2 px-4">
                        <div className="mr-2">
                          <div className="d-flex">
                            <img src={storeDetails.logo} alt={storeDetails.name} className="image-40" />
                          </div>
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text font-14 font-weight-600">asdasd</div>
                          <div className="col-flex-text font-12 font-weight-400 grey-text">asdasd</div>
                        </div>
                        <div className="ml-2">
                          <Icon path={mdiChevronDown} size={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{marginBottom: '64px'}}>
                    <div className="font-18 font-weight-700">{t('select_service')}</div>
                    <div className="list-services mt-6">
                      <div className="col-flex py-2 px-4 item-services mb-2">
                        <div className="mr-2">
                          <div className="d-flex">
                            <img src={iconTakeaway} alt={storeDetails.name} className="image-40" />
                          </div>
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text font-16 font-weight-600">{t('takeaway')}</div>
                        </div>
                        <div className="list-item-action-services">
                          <div className="list-item-action-select">
                            <div className="list-item-action-select-value" />
                          </div>
                        </div>
                      </div>
                      <div className="col-flex py-2 px-4 item-services mb-2">
                        <div className="mr-2">
                          <div className="d-flex">
                            <img src={iconDelivery} alt={storeDetails.name} className="image-40" />
                          </div>
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text font-16 font-weight-600">{t('delivery')}</div>
                        </div>
                        <div className="list-item-action-services">
                          <div className="list-item-action-select">
                            <div className="list-item-action-select-value" />
                          </div>
                        </div>
                      </div>
                      <div className="col-flex py-2 px-4 item-services mb-2">
                        <div className="mr-2">
                          <div className="d-flex">
                            <img src={iconReservation} alt={storeDetails.name} className="image-40" />
                          </div>
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text font-16 font-weight-600">{t('food_reservation')}</div>
                        </div>
                        <div className="list-item-action-services">
                          <div className="list-item-action-select">
                            <div className="list-item-action-select-value" />
                          </div>
                        </div>
                      </div>
                      <div className="col-flex py-2 px-4 item-services">
                        <div className="mr-2">
                          <div className="d-flex">
                            <img src={iconReservationTable} alt={storeDetails.name} className="image-40" />
                          </div>
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text font-16 font-weight-600">{t('table_reservation')}</div>
                        </div>
                        <div className="mr-6 tag-new">{t('new')}</div>
                        <div className="list-item-action-services">
                          <div className="list-item-action-select">
                            <div className="list-item-action-select-value" />
                          </div>
                        </div>
                      </div>
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
                    {Array.isArray(outlets) &&
                      outlets.map((outlet, index) => (
                        <div key={index} className="outlet-selection cursor-pointer">
                          <div className="col-flex py-2 px-4">
                            <div className="mr-2">
                              <div className="d-flex">
                                <img src={outlet.logo} alt={outlet.name} className="image-40" />
                              </div>
                            </div>
                            <div className="col-flex-content">
                              <div className="col-flex-text font-14 font-weight-600">{outlet.name}</div>
                              <div className="col-flex-text font-12 font-weight-400 grey-text">{outlet.address}</div>
                            </div>
                            <div className="ml-2">
                              <Icon path={mdiChevronDown} size={1} />
                            </div>
                          </div>
                        </div>
                      ))}
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
