import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'
import {useGlobal} from '@/contexts/GlobalContext'
import Dropdown from '@/components/locale'
const Splash: React.FC = () => {
  let navigate = useNavigate()
  const testFunction = async () => {
    navigate('/menu')
  }
  const {t, i18n} = useTranslation()

  const languageOptions = [
    {code: 'id', name: 'Indonesia'},
    {code: 'en', name: 'English'}
  ]

  const handleSelect = (option: {code: string; name: string}) => {
    i18n.changeLanguage(option.code)
  }

  const {storeDetails, loading, error, isDarkMode, toggleTheme, colors} = useGlobal()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      {/* {t('welcome')} */}
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
                        <Dropdown
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
            <main>
              <button onClick={testFunction}>{t('welcome')}</button>
              <h1>{isDarkMode ? "Dark Mode" : "Light Mode"}</h1>
              <button
                onClick={toggleTheme}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: colors.primary,
                  color: colors.text,
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Toggle Theme
              </button>
            </main>
          </div>
        </div>
      </main>
    </>
  )
}

export default Splash
