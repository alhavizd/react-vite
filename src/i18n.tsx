import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'

i18n
  .use(HttpApi) // Untuk memuat file JSON secara dinamis
  .use(LanguageDetector) // Untuk mendeteksi bahasa secara otomatis
  .use(initReactI18next) // Integrasi dengan React
  .init({
    fallbackLng: 'en', // Bahasa default
    supportedLngs: ['en', 'id'], // Bahasa yang didukung
    debug: true, // Untuk debugging (matikan di produksi)
    interpolation: {
      escapeValue: false // React sudah aman terhadap XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Path file JSON lokal
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie']
    }
  })

export default i18n
