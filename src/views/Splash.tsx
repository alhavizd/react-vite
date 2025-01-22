import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'
import logo from '@/assets/react.svg'
const Splash: React.FC = () => {
  let navigate = useNavigate()
  const testFunction = async () => {
    navigate('/menu')
  }
  const {t, i18n} = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <main className="_content">
        <div className="_content__wrap">
          <div className="_fill-height">
            <header className="_toolbar _toolbar-flat _toolbar-fixed" style={{marginTop: '0px', transform: 'translateY(0px)', left: '0px', right: '0px'}}>
              <div className="_toolbar-content px-0">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4 col-12">
                      <div className="d-flex align-center toolbar-antarinmakan">
                        <img src={logo} alt="Logo" />
                        <div className="spacer" />
                        <button onClick={testFunction}>Logout</button>
                      </div>
                      <h1>{t('welcome')}</h1>
                      <button onClick={() => changeLanguage('en')}>English</button>
                      <button onClick={() => changeLanguage('id')}>Bahasa Indonesia</button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
      </main>
    </>
  )
}

export default Splash
