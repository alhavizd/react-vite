import React, {useState, useMemo, useEffect} from 'react'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {useOutlet} from '@/contexts/OutletContext'
import {getList} from '@/services/outlet'
import {OutletsResponse} from '@/types/outlet'
import Icon from '@mdi/react'
import {mdiChevronDown} from '@mdi/js'

const OutletSelection: React.FC = () => {
  const queryClient = useQueryClient()
  const {selectOutletId, outletDetail} = useOutlet()
  const {t} = useTranslation()

  const [open, setOpen] = useState(false)
  const [allowLocation, setAllowLocation] = useState(false)
  const [paramsOutlet, setParamsOutlet] = useState<{origin_lat: number | null; origin_lon: number | null}>({
    origin_lat: null,
    origin_lon: null
  })

  const {
    data: outlets,
    isLoading,
    isError
  } = useQuery<OutletsResponse>({
    queryKey: allowLocation ? ['outlets', paramsOutlet] : ['outlets'],
    queryFn: () => (allowLocation ? getList(paramsOutlet) : getList()),
    staleTime: 1000 * 60 * 5 // Cache selama 5 menit
  })

  const closeSheet = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('overlay')) {
      setOpen(false)
    }
  }

  const selectOutlet = (id: number) => {
    selectOutletId(id)
    setOpen(false)
  }

  const distanceText = useMemo(() => {
    let textLocation = '-'

    if (outletDetail && outletDetail.id) {
      const selectedOutlet = outlets?.data.find((e) => e.id === outletDetail.id)
      if (selectedOutlet && selectedOutlet.location_distance) {
        textLocation = selectedOutlet.location_distance.text
      }
    }

    return textLocation
  }, [outletDetail, outlets])

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

  const successPosition = (position: GeolocationPosition) => {
    setAllowLocation(true)
    setParamsOutlet({
      origin_lat: position.coords.latitude,
      origin_lon: position.coords.longitude
    })
    queryClient.invalidateQueries({queryKey: ['outlets']})
  }

  const failurePosition = (error: GeolocationPositionError) => {
    console.error('Geolocation error:', error.message)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{isError}</p>

  return (
    <div>
      <div className="mt-4 mb-8">
        <div className="outlet-selection cursor-pointer" onClick={() => setOpen(true)}>
          <div className="col-flex py-2 px-4">
            <div className="mr-2">
              <div className="d-flex">
                <img src={outletDetail.logo} alt={outletDetail.name} className="image-40" />
              </div>
            </div>
            <div className="col-flex-content">
              <div className="col-flex-text font-14 font-weight-600">{outletDetail.name}</div>
              <div className="col-flex-text font-12 font-weight-400 grey-text">{distanceText}</div>
            </div>
            <div className="ml-2">
              <Icon path={mdiChevronDown} size={1} />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <button onClick={() => selectOutletId(96340)}>Pilih Outlet</button>
        <button onClick={() => selectOutletId(95725)}>Pilih Outlet</button>
      </div> */}
      <div className={`overlay ${open ? 'show' : ''}`} onClick={closeSheet}>
        <div className={`bottom-sheet ${open ? 'slide-up' : ''}`}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                <div className="mt-2 font-18 font-weight-700 mb-4">{t('choose_outlet')}</div>
                <div className="list-outlet">
                  {outlets?.data.map((outlet, i) => (
                    <div key={outlet.id}>
                      <div className={`col-flex py-2 px-4 prevent-select ${outletDetail.url_id !== outlet.url_id ? 'cursor-pointer' : ''}`} onClick={() => selectOutlet(outlet.id)}>
                        <div className="mr-2 align-self-center d-flex">
                          <img src={outlet.logo} alt={outlet.name} className="image-40 br-8" />
                        </div>
                        <div className="col-flex-content">
                          <div className="col-flex-text ol-black font-14 font-weight-600">{outlet.name}</div>
                          {typeof outlet.location_distance !== 'undefined' ? <div className="col-flex-text grey-text font-12 font-weight-400">{outlet.location_distance.text}</div> : <div>-</div>}
                        </div>
                      </div>
                      {i !== outlets?.data.length - 1 && <div key={`${outlet.id}-line`} className="div-line with-padding-16" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutletSelection
